package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.domain.port.UserRepository;

public class DomainUserService implements UserService {

    private final UserRepository userRepository;

    public DomainUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseUserDTO getUser(Long id) {
        return userRepository.getUser(id);
    }

    @Override
    public ResponseUserDTO createUser(User user) {
        return userRepository.createUser(user);
    }

    @Override
    public ResponseUserDTO updateUser(Long id, String username, String image) {
        return userRepository.updateUser(id, username, image);
    }
    
}
