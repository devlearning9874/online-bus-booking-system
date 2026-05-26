package com.passangerservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "bookings", groupId = "${spring.kafka.consumer.group-id:passangerservice-consumer}")
    public void consume(String message) {
        System.out.println("[passangerservice] Received message from bookings topic: " + message);
    }
}
