package com.routeservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.routeservice.entity.Route;
import com.routeservice.repository.RouteRepository;


@Service
public class RouteServiceImpl implements RouteService {
	
	@Autowired
	RouteRepository routeRepo;

	@Override
	public Route createRoute(Route route) {
		return routeRepo.save(route);
	}

	@Override
	public List<Route> getAllRoute() {
		return routeRepo.findAll();
	}

	@Override
	public Route getRouteById(String id) {
		return routeRepo.findById(id).get();
	}

	@Override
	public Route updateRoute(Route route) {
		return routeRepo.save(route);
	}

	@Override
	public void deleteRoute(Route route) {
		
		routeRepo.delete(route);

	}

}
