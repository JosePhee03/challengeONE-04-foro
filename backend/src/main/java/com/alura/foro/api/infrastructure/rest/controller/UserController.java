package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.dto.CreateUserDTO;
import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.domain.model.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseUserDTO> getUser(@PathVariable Long id) {
        ResponseUserDTO responseUserDTO = this.userService.getUser(id);
        return ResponseEntity.ok(responseUserDTO);
    }
    
    @PostMapping
    public ResponseEntity<ResponseUserDTO> createUser(@RequestBody @Valid CreateUserDTO createUserDTO,
            UriComponentsBuilder uriComponentsBuilder) {
       

        User user = new User();
        user.setUsername(createUserDTO.username());
        user.setPassword(createUserDTO.password());

        ResponseUserDTO responseUserDTO = this.userService.createUser(user);

        URI url = uriComponentsBuilder.path("/api/user/{id}").buildAndExpand(responseUserDTO.getId()).toUri();
        return ResponseEntity.created(url).body(responseUserDTO);
    }

}
