package com.paymentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.bookingservice.entity.Booking;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paymentservice.entity.Payment;
import com.paymentservice.kafka.KafkaProducerService;
import com.paymentservice.repository.PaymentRepository;


@Component
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	PaymentRepository paymentRepository;
	
	@Autowired
	KafkaProducerService kafkaProducerService;

	@Autowired
	ObjectMapper objectMapper;
	
	@Override
	@KafkaListener(topics="booking_created_event", groupId = "${spring.kafka.consumer.group-id:paymentservice-consumer}")
	public void receiveBookingData(String bookingPayload) {
		Booking booking;
		try {
			booking = objectMapper.readValue(bookingPayload, Booking.class);
		} catch (Exception ex) {
			throw new RuntimeException("Failed to parse booking payload", ex);
		}
		   
		try {
			Thread.sleep(200);
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
		//processs payment, invoke 3rd party payment gateway
		//paymentgateway response is success or failure
		boolean paymentGatewaySuccessResponse = true;
		if(paymentGatewaySuccessResponse) {
			Payment payment = new Payment();
			payment.setPayId(System.currentTimeMillis()+"");
			payment.setBookingId(booking.getBookingId());
			payment.setPaymentDate(booking.getDateOfBooking());
			paymentRepository.save(payment);
			try {
				kafkaProducerService.send("payment_created_event", objectMapper.writeValueAsString(booking));
			} catch (Exception ex) {
				throw new RuntimeException("Failed to publish payment_created_event", ex);
			}
		}
	}
	
	@KafkaListener(topics="inventory_failed_event", groupId = "${spring.kafka.consumer.group-id:paymentservice-consumer}")
	public void receiveInventortFailedEvent(String bookingPayload) {
		Booking booking;
		try {
			booking = objectMapper.readValue(bookingPayload, Booking.class);
		} catch (Exception ex) {
			throw new RuntimeException("Failed to parse booking payload", ex);
		}
		
		try {
			Thread.sleep(200);
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		Payment payment = paymentRepository.findPaymentByBookingId(booking.getBookingId()).get(0);
		//cancel the payment, send payment cancellation to paymengateway
		paymentRepository.delete(payment);
		try {
			kafkaProducerService.send("payment_failed_event", objectMapper.writeValueAsString(booking));
		} catch (Exception ex) {
			throw new RuntimeException("Failed to publish payment_failed_event", ex);
		}
	}

}
