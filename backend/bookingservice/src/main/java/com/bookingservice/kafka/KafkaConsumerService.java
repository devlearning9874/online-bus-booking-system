package com.bookingservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bookings", groupId = "${spring.kafka.consumer.group-id:onlinebus-consumer}")
    public void consume(String message) {
        System.out.println("Received message from bookings topic: " + message);
        // Add processing logic here
    }
}
