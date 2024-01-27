package com.alura.foro.api.infrastructure.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alura.foro.api.domain.dto.AuthRequest;
import com.alura.foro.api.domain.dto.ResponseAuth;
import com.alura.foro.api.infrastructure.security.service.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<ResponseAuth> login(@RequestBody @Valid AuthRequest authRequest) {
        ResponseAuth jwtDto = authenticationService.login(authRequest);

        return ResponseEntity.ok(jwtDto);
    }

}
