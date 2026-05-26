package com.routeservice.controller;

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

import com.routeservice.entity.Route;
import com.routeservice.service.RouteService;

@RestController
@RequestMapping("/api/v1")
public class RouteController {

	
	@Autowired
	RouteService routeService;
	
	//post mapping will take post request matchin with /employee
		@PostMapping("/route")
		public Route createRoute(@RequestBody Route route) {
			return routeService.createRoute(route);
		}
		
		@GetMapping("/route")
		public List<Route> getAllRoute() {
			return routeService.getAllRoute();
		}
		
		@GetMapping("/route/{id}")
		public Route getRouteById(@PathVariable("id") String id) {
			return routeService.getRouteById(id);
		}
		
		@GetMapping("/route/getRoute/{id}")
		public Route getAvailableSeatsFromInventoryByBusId(@PathVariable("id") String id) {
			List<Route> routeList = routeService.getAllRoute();
			Route res = null;
			for(Route in : routeList) {
				
				if(in.getRouteId().equals(id)) {
					res  = in;
					break;
				}
				
				
			}
			
			return res;
		    
		}
		
		@PutMapping("/route")
		public Route updateRoute(@RequestBody Route route) {
			
			 return routeService.updateRoute(route);
		}

		@DeleteMapping("route/{id}")
		public void deleteRoute(@PathVariable("id") String id) {
			
			Route route = routeService.getRouteById(id);
			
			routeService.deleteRoute(route);
			
			
		}
	
	
}
