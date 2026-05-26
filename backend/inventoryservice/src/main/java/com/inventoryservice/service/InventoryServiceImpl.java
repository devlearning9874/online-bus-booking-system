package com.inventoryservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.bookingservice.entity.Booking;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventoryservice.entity.Inventory;
import com.inventoryservice.kafka.KafkaProducerService;
import com.inventoryservice.repository.InventoryRepository;

@Component
public class InventoryServiceImpl implements InventoryService {
	
	@Autowired
	InventoryRepository inventoryRepo;

	@Override
	public Inventory createInventory(Inventory inventory) {
		return inventoryRepo.save(inventory);
	}

	@Override
	public List<Inventory> getAllInventory() {
		return inventoryRepo.findAll();
	}

	@Override
	public Inventory getInventoryById(String id) {
		return inventoryRepo.findById(id).get();
	}

	@Override
	public Inventory updateInventory(Inventory inventory) {
		return inventoryRepo.save(inventory);
	}

	@Override
	public void deleteInventory(Inventory inventory) {
		inventoryRepo.delete(inventory);
	}
	
	@Autowired
	InventoryRepository inventoryRepository;
	
	@Autowired
	KafkaProducerService kafkaProducerService;

	@Autowired
	ObjectMapper objectMapper;

	@KafkaListener(topics = "payment_created_event", groupId = "${spring.kafka.consumer.group-id:inventoryservice-consumer}")
	public void receiveOrderData(String bookingPayload) {
		Booking booking;
		try {
			booking = objectMapper.readValue(bookingPayload, Booking.class);
		} catch (Exception ex) {
			throw new RuntimeException("Failed to parse booking payload", ex);
		}

		try {
			Thread.sleep(200);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		try {
			Inventory inventory = new Inventory();
			List<Inventory> inventoryList = inventoryRepository.findInventoryByBusId(booking.getBusId());
			int quantity = inventoryList.get(0).getAvailableSeats();
			if (quantity <= 0) {
				throw new Exception("Inventory not found");
			}
			quantity = quantity - booking.getNoOfSeats();
			inventory.setAvailableSeats(quantity);
			inventory.setBusId(inventoryList.get(0).getBusId());
			inventory.setInventoryId(inventoryList.get(0).getInventoryId());
			inventory.setLastUpdatedDate(booking.getDateOfBooking());
			inventoryRepository.save(inventory);
			try {
				kafkaProducerService.send("inventory_updated_event", objectMapper.writeValueAsString(booking));
			} catch (Exception ex) {
				throw new RuntimeException("Failed to publish inventory_updated_event", ex);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			
			//send failed event to exception queue
			booking.setStatus(ex.getMessage());
			try {
				kafkaProducerService.send("inventory_failed_event", objectMapper.writeValueAsString(booking));
			} catch (Exception sendEx) {
				throw new RuntimeException("Failed to publish inventory_failed_event", sendEx);
			}
		}

	}


}
