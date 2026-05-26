package com.bookingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookingservice.entity.Booking;
import com.bookingservice.kafka.KafkaProducerService;
import com.bookingservice.repository.BookingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventoryservice.entity.Inventory;
import com.passangerservice.entity.Passanger;
import com.routeservice.entity.Route;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	BookingRepository bookingRepo;

	@Autowired
	KafkaProducerService kafkaProducerService;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	RestTemplate restTemplate;

	@Override
	public String createBooking(Booking booking) {
		Inventory inventory = restTemplate.getForObject(
				"http://localhost:9500/api/v1/inventory/getInventory/" + booking.getBusId(), Inventory.class);
		Route route = restTemplate.getForObject("http://localhost:9800/api/v1/route/getRoute/" + booking.getBusId(),
				Route.class);
//		System.out.println(inventory.getInventoryId());
//		System.out.println(route.getRouteId());
		
		// inventory.getAvailableSeats() >= booking.getNoOfSeats()
		
		// Checking seats availability at Booking Service so Saga pattern is not needed

		if (inventory.getAvailableSeats() >= booking.getNoOfSeats()) {
			booking.setBookingId(System.currentTimeMillis() + "");
			booking.setBusId(booking.getBusId());
			booking.setDateOfBooking(booking.getDateOfBooking());
			booking.setSource(route.getSource());
			booking.setDestination(route.getDestination());
			booking.setNoOfSeats(booking.getNoOfSeats());
			booking.setStatus("pending");
			bookingRepo.save(booking);
		try {
			kafkaProducerService.send("booking_created_event", objectMapper.writeValueAsString(booking));
		} catch (Exception ex) {
			throw new RuntimeException("Failed to publish booking_created_event", ex);
		}

		} else {
			return "Seats are not available for Bus Id:" + booking.getBusId() + "and Route Id:" + route.getRouteId();
		}

		return "Booking created with ID: " + booking.getBookingId();
	}

	@KafkaListener(topics = "inventory_updated_event", groupId = "${spring.kafka.consumer.group-id:bookingservice-consumer}")
	public void confirmOrder(String bookingPayload) {
		try {
			Thread.sleep(200);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		Booking booking;
		try {
			booking = objectMapper.readValue(bookingPayload, Booking.class);
		} catch (Exception ex) {
			throw new RuntimeException("Failed to parse booking payload", ex);
		}
		// update booking status to confirmed
		booking.setStatus("confirmed");
		bookingRepo.save(booking);
		restTemplate.postForObject("http://localhost:5500/api/v1/passanger/" + booking.getBookingId(), null, String.class);
		// invoke notification service to send confirmed booking
	}

	@KafkaListener(topics = "payment_failed_event", groupId = "${spring.kafka.consumer.group-id:bookingservice-consumer}")
	public void receivePaymentFailure(String bookingPayload) {
		try {
			Thread.sleep(200);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		try {
			Booking booking = objectMapper.readValue(bookingPayload, Booking.class);
			// preserve the existing booking status if already set
			booking.setStatus(booking.getStatus());
			bookingRepo.save(booking);
		} catch (Exception ex) {
			throw new RuntimeException("Failed to parse booking payload", ex);
		}
		// invoke notification service to send cancelled order
	}

}
