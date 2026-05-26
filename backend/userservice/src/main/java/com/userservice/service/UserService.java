package com.userservice.service;

import java.util.List;

import com.userservice.entity.User;



public interface UserService {

	User createUser(User user);

	List<User> getAllUser();

	User getUserById(int id);

	User updateUser(User user);

	void deleteUser(User user);

}
