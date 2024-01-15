package com.alura.foro.api.domain.dto;

import com.alura.foro.api.domain.model.User;

import lombok.Getter;

@Getter
public class ResponseUserDTO {

    Long id;
    String username;
    String image;


    public ResponseUserDTO (User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.image = user.getImage();
    }
}
