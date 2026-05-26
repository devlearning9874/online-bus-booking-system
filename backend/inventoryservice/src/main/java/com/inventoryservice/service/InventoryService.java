package com.inventoryservice.service;

import java.util.List;

import com.inventoryservice.entity.Inventory;



public interface InventoryService {
	
	Inventory createInventory(Inventory inventory);

	List<Inventory> getAllInventory();

	Inventory getInventoryById(String id);

	Inventory updateInventory(Inventory inventory);

	void deleteInventory(Inventory inventory);

}
