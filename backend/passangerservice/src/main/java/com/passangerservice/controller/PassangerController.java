package com.passangerservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.passangerservice.entity.Passanger;
import com.passangerservice.repository.PassangerRepository;

@RestController
@RequestMapping("/api/v1")
public class PassangerController {

	@Autowired
	PassangerRepository passangerRepository;
	
	@PostMapping("/passanger/{id}")
	public void createPassangerAfterPayment(@PathVariable("id") String id) {
		
		Passanger passanger = new Passanger();
		passanger.setPassangerId("pa"+(int)System.currentTimeMillis());
		passanger.setBookingId(id);
		
		passangerRepository.save(passanger);
		
		
	}
}
