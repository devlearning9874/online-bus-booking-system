package com.registrationservice;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
//this annotation will make this microservice as service discovery and registration
@EnableEurekaServer
public class RegistrationserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RegistrationserviceApplication.class, args);
	}

}
