package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.domain.port.UserRepository;

public class DomainUserService implements UserService {

    private final UserRepository userRepository;

    public DomainUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Override
    public User getUser(Long id) {
        return userRepository.getUser(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.createUser(user);
    }

    @Override
    public User updateUser(Long id, String username, String image) {
        return userRepository.updateUser(id, username, image);
    }
    
}
