package com.routeservice.service;

import java.util.List;

import com.routeservice.entity.Route;



public interface RouteService {
	
    Route createRoute(Route route);
	
	List<Route> getAllRoute();
	
	Route getRouteById(String id);
	
	Route updateRoute(Route route);
	
	void deleteRoute(Route route);

}
