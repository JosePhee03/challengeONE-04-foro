package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.domain.model.User;

public interface UserService {
    
    //GET
	ResponseUserDTO getUser(Long id);

	// POST
	ResponseUserDTO createUser(User user);

	// UPDATE
	ResponseUserDTO updateUser(Long id, String username, String image);

}
