package com.alura.foro.api.domain.model;

import lombok.Data;

@Data
public class User {

    private Long id;
    private String username;
    private String password;
    private Role role;
    private String image;

    public User () {
        this.image = null;
        this.role = Role.USER;
    }

}