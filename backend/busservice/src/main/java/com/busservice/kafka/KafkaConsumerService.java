package com.busservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bookings", groupId = "${spring.kafka.consumer.group-id:busservice-consumer}")
    public void consume(String message) {
        System.out.println("[busservice] Received message from bookings topic: " + message);
    }
}
