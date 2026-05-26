package com.routeservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bookings", groupId = "${spring.kafka.consumer.group-id:routeservice-consumer}")
    public void consume(String message) {
        System.out.println("[routeservice] Received message from bookings topic: " + message);
    }
}
