package com.alura.foro.api.domain.port;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.domain.model.User;

public interface UserRepository {

	// GET
	List<ResponseUserDTO> getAllUsers();

	ResponseUserDTO getUser(Long id);

	// POST
	ResponseUserDTO createUser(User user);

	// UPDATE
	ResponseUserDTO updateUser(Long id, String username, String image);

}