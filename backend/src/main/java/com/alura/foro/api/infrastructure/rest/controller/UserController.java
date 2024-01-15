package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import com.alura.foro.api.infrastructure.util.Pagination;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<ResponseUserDTO>> getUsers(@PageableDefault(size = 30) Pageable pageable) {
        List<ResponseUserDTO> userResponse = new ArrayList<>();
        userService.getAllUsers()
                .forEach((user) -> userResponse.add(new ResponseUserDTO(user)));
        
                Page<ResponseUserDTO> page = Pagination.convert(userResponse, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseUserDTO> getUser(@PathVariable Long id) {
        User user = this.userService.getUser(id);
        return ResponseEntity.ok(new ResponseUserDTO(user));
    }
    
    @PostMapping
    public ResponseEntity<ResponseUserDTO> createUser(@RequestBody @Valid CreateUserDTO createUserDTO,
            UriComponentsBuilder uriComponentsBuilder) {

        User user = new User();
        user.setUsername(createUserDTO.username());
        user.setPassword(createUserDTO.password());

        User newUser = this.userService.createUser(user);

        ResponseUserDTO responseUserDTO = new ResponseUserDTO(newUser);

        URI url = uriComponentsBuilder.path("/api/user/{id}").buildAndExpand(newUser.getId()).toUri();
        return ResponseEntity.created(url).body(responseUserDTO);
    }

}
