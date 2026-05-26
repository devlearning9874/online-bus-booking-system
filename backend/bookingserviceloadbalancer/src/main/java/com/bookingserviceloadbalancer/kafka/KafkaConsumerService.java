package com.bookingserviceloadbalancer.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bookings", groupId = "${spring.kafka.consumer.group-id:bookingserviceloadbalancer-consumer}")
    public void consume(String message) {
        System.out.println("[bookingserviceloadbalancer] Received message from bookings topic: " + message);
    }
}
