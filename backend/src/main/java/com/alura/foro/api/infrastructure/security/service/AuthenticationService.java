package com.alura.foro.api.infrastructure.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.alura.foro.api.domain.dto.AuthRequest;
import com.alura.foro.api.domain.dto.ResponseAuth;
import com.alura.foro.api.infrastructure.adapter.UserJpaRepositoryMySQL;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;

@Service
public class AuthenticationService {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserJpaRepositoryMySQL userRepository;

    public ResponseAuth login(AuthRequest authRequest) {

        var authToken = new UsernamePasswordAuthenticationToken(
                authRequest.username(), authRequest.password());

        authenticationManager.authenticate(authToken);

        UserEntity user = userRepository.findByUsername(authRequest.username())
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String jwtToken = jwtService.generateToken(user);

        return new ResponseAuth(jwtToken);

    }

}
