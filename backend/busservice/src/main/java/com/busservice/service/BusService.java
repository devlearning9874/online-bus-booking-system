package com.busservice.service;

import java.util.List;

import com.busservice.entity.Bus;

public interface BusService {
	
	Bus createBus(Bus bus);
	
	List<Bus> getAllBus();
	
	Bus getBusById(int id);
	
	Bus updateBus(Bus bus);
	
	void deleteBus(Bus bus);

}
