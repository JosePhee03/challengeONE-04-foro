package com.alura.foro.api.infrastructure.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.infrastructure.util.Pagination;

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
                .forEach((user) -> userResponse.add(new ResponseUserDTO(user.getId(), user.getUsername(), user.getImage())));
        
                System.out.println(userResponse);
                Page<ResponseUserDTO> page = Pagination.convert(userResponse, pageable);
        return ResponseEntity.ok(page);
    }

}
