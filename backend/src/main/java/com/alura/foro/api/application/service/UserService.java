package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.User;

public interface UserService {
    
    //GET
	List<User> getAllUsers();
	User getUser(Long id);

	// POST
	User createUser(User user);

	// UPDATE
	User updateUser(Long id, String username, String image);

}
