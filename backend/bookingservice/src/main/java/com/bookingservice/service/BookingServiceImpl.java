package com.bookingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookingservice.entity.Booking;
import com.bookingservice.kafka.KafkaProducerService;
import com.bookingservice.repository.BookingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventoryservice.entity.Inventory;
import com.routeservice.entity.Route;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String createBooking(Booking booking) {
        // Fetch background route data synchronously to populate transaction details
        Inventory inventory = restTemplate.getForObject(
                "http://localhost:9500/api/v1/inventory/getInventory/" + booking.getBusId(), Inventory.class);
        Route route = restTemplate.getForObject(
                "http://localhost:9800/api/v1/route/getRoute/" + booking.getBusId(), Route.class);

        if (inventory != null && route != null && inventory.getAvailableSeats() >= booking.getNoOfSeats()) {
            
            // Generate clean alphanumeric keys matching your VARCHAR database column constraints
            booking.setBookingId("BKG-" + System.currentTimeMillis());
            booking.setSource(route.getSource());
            booking.setDestination(route.getDestination());
            booking.setStatus("pending"); // State transition locks down resource pending Saga stream verification
            
            // Save initial local transaction snapshot to MySQL
            bookingRepo.save(booking);

            // Emit the transaction event across your Apache Kafka broker cluster
            try {
                kafkaProducerService.send("booking_created_event", objectMapper.writeValueAsString(booking));
            } catch (Exception ex) {
                throw new RuntimeException("Failed to publish booking_created_event", ex);
            }

        } else {
            return "Seats are not available for Bus Id: " + booking.getBusId();
        }

        return "Booking created with ID: " + booking.getBookingId();
    }

    @KafkaListener(topics = "inventory_updated_event", groupId = "bookingservice-consumer")
    public void confirmOrder(String bookingPayload) {
        try {
            Booking kafkaBooking = objectMapper.readValue(bookingPayload, Booking.class);
            
            // Pull the persistent entity from your DB and transition status to confirmed
            bookingRepo.findById(kafkaBooking.getBookingId()).ifPresent(booking -> {
                booking.setStatus("confirmed");
                bookingRepo.save(booking);
                
                // Propagate upstream notification to your downstream passenger assignment handler
                restTemplate.postForObject("http://localhost:5500/api/v1/passanger/" + booking.getBookingId(), null, String.class);
            });
        } catch (Exception ex) {
            throw new RuntimeException("Failed to parse confirm booking payload", ex);
        }
    }

    @KafkaListener(topics = "payment_failed_event", groupId = "bookingservice-consumer")
    public void receivePaymentFailure(String bookingPayload) {
        try {
            Booking kafkaBooking = objectMapper.readValue(bookingPayload, Booking.class);
            
            // Compensating transaction fallback: write rollback state straight to DB
            bookingRepo.findById(kafkaBooking.getBookingId()).ifPresent(booking -> {
                booking.setStatus("cancelled"); 
                bookingRepo.save(booking);
            });
        } catch (Exception ex) {
            throw new RuntimeException("Failed to parse rollback booking payload", ex);
        }
    }
}