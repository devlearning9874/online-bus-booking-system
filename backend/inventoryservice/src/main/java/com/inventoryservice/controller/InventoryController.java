package com.inventoryservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventoryservice.entity.Inventory;
import com.inventoryservice.service.InventoryService;



@RestController
@RequestMapping("/api/v1")
public class InventoryController {
	
	
	@Autowired
	InventoryService inventoryService;
	
	//post mapping will take post request matchin with /employee
		@PostMapping("/inventory")
		public Inventory createInventory(@RequestBody Inventory inventory) {
			return inventoryService.createInventory(inventory);
		}
		
		@GetMapping("/inventory")
		public List<Inventory> getAllinventory() {
			return inventoryService.getAllInventory();
		}
		
		@GetMapping("/inventory/{id}")
		public Inventory getInventoryById(@PathVariable("id") String id) {
			return inventoryService.getInventoryById(id);
		}
		
		@GetMapping("/inventory/getInventory/{id}")
		public Inventory getAvailableSeatsFromInventoryByBusId(@PathVariable("id") String id) {
			List<Inventory> invList = inventoryService.getAllInventory();
			Inventory res = null;
			for(Inventory in : invList) {
				
				if(in.getBusId().equals(id)) {
					res  = in;
					break;
				}
				
				
			}
			
			return res;
		    
		}
		
		@PutMapping("/inventory")
		public Inventory updateInventory(@RequestBody Inventory inventory) {
			
			 return inventoryService.updateInventory(inventory);
		}

		@DeleteMapping("inventory/{id}")
		public void deleteInventory(@PathVariable("id") String id) {
			
			Inventory inventory = inventoryService.getInventoryById(id);
			
			inventoryService.deleteInventory(inventory);
			
			
		}

}
