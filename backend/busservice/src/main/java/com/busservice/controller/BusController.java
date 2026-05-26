package com.busservice.controller;

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

import com.busservice.entity.Bus;
import com.busservice.service.BusService;

@RestController
@RequestMapping("/api/v1")
public class BusController {
	
	@Autowired
	BusService busService;
	
	//post mapping will take post request matchin with /employee
		@PostMapping("/bus")
		public Bus createBus(@RequestBody Bus bus) {
			return busService.createBus(bus);
		}
		
		@GetMapping("/bus")
		public List<Bus> getAllBus() {
			return busService.getAllBus();
		}
		
		@GetMapping("/bus/{id}")
		public Bus getBusById(@PathVariable("id") int id) {
			return busService.getBusById(id);
		}
		
		@PutMapping("/bus")
		public Bus updateBus(@RequestBody Bus bus) {
			
			 return busService.updateBus(bus);
		}

		@DeleteMapping("bus/{id}")
		public void deleteBus(@PathVariable("id") int id) {
			
			Bus bus = busService.getBusById(id);
			
			busService.deleteBus(bus);
			
			
		}
	
	

}
