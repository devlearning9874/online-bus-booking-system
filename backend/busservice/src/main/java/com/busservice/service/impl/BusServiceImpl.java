package com.busservice.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.busservice.entity.Bus;
import com.busservice.repository.BusRepository;
import com.busservice.service.BusService;

@Service
public class BusServiceImpl implements BusService {
	
	@Autowired
	BusRepository busRepo;

	@Override
	public Bus createBus(Bus bus) {
		
		return busRepo.save(bus);
	}

	@Override
	public List<Bus> getAllBus() {
		return busRepo.findAll();
	}

	@Override
	public Bus getBusById(int id) {
		return busRepo.findById(id).get();
	}

	@Override
	public Bus updateBus(Bus bus) {
		return busRepo.save(bus);
	}

	@Override
	public void deleteBus(Bus bus) {
          
		busRepo.delete(bus);;
	}

	

	

}
