package com.alura.foro.api.infrastructure.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.alura.foro.api.infrastructure.adapter.UserJpaRepositoryMySQL;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;

@Service
public class UserDetailsConfig implements UserDetailsService {

    @Autowired
    private UserJpaRepositoryMySQL userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        UserEntity user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return user;
    }
    
}
