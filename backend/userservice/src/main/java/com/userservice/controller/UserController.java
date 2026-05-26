package com.userservice.controller;

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

import com.userservice.entity.User;
import com.userservice.service.UserService;



@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	
	@Autowired
	UserService userService;
	
	//post mapping will take post request matchin with /employee
		@PostMapping("/user")
		public User createUser(@RequestBody User user) {
			return userService.createUser(user);
		}
		
		@GetMapping("/user")
		public List<User> getAllUser() {
			return userService.getAllUser();
		}
		
		@GetMapping("/user/{id}")
		public User getUserById(@PathVariable("id") int id) {
			return userService.getUserById(id);
		}
		
		@PutMapping("/user")
		public User updateUser(@RequestBody User user) {
			
			 return userService.updateUser(user);
		}

		@DeleteMapping("user/{id}")
		public void deleteUser(@PathVariable("id") int id) {
			
			User user = userService.getUserById(id);
			
			userService.deleteUser(user);
			
			
		}

}
