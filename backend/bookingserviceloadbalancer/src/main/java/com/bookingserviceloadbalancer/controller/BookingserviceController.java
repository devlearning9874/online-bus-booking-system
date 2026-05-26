package com.bookingserviceloadbalancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.loadbalancer.core.RoundRobinLoadBalancer;
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bookingservice.entity.Booking;


@RestController
public class BookingserviceController {
	//this bean is created automatically by spring bean auto configuration
	
	
    //this factory is used to create instance of load balancer
	@Autowired
	LoadBalancerClientFactory clientFactory;
	
    @Autowired
	RestTemplate restTemplate;
	
	@GetMapping("/bookings")
	public String getBookings() {
		
		//logic of implementing load balancing to distribute the requests to
				//orderservice

				//1. connect to Eureka server and asks the address details of ORDERSERVICE instance
				//2. Loadbalancer will get the address details of ORDERSERVICE instance dynamically
				//3. Uses RoundRobin algorithm to distribute traffic to ORDERSERVICE instances
				//4. Incase if only one ORDERSERVICE instance is running, it will send 100% of
				//traffic to ORDERSERVICE instance

				//create RoundRobinLoadbalancer object

				//this line of code will connect to Eureka server and get the address details of
				//ORDERSERVICE
		
				RoundRobinLoadBalancer lb = clientFactory
						.getInstance("BOOKINGSERVICE",RoundRobinLoadBalancer.class);

				//if Eurekaserver returns more than one instance of ORDERSERVICE instance details
				//the loadbalancer has to choose one instance from the list returned by Eureka
				//server to send the request
				//if there is only one instance of ORDERSERVICE returned,then loadbalancer
				//will chose that instance only to send the request
				
				ServiceInstance instance = lb.choose().block().getServer();
		
				String host = instance.getHost();
				int port = instance.getPort();

				String url = "http://"+host+":"+port+"/bookings";
				System.out.println(url);
				String response = restTemplate.getForObject(url, String.class);
				return response;
	}
	
	@PostMapping("/bookings")
	public String createOrder(@RequestBody Booking booking) {
		RoundRobinLoadBalancer lb = clientFactory
				.getInstance("BOOKINGSERVICE",RoundRobinLoadBalancer.class);

		ServiceInstance instance = lb.choose().block().getServer();
		String host = instance.getHost();
		int port = instance.getPort();
		String url = "http://"+host+":"+port+"/bookings";
		System.out.println(url);
		ResponseEntity<String> response = restTemplate.postForEntity(url,booking, String.class);
		return response.getBody();
	}

}
