package com.alura.foro.api.domain.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class User {

    private Long id;
    private String username;
    private String password;
    private Role role;
    private String image;
    private List<Post> posts;
    private List<Comment> comments;

    public User () {
        this.image = null;
        this.role = Role.USER;
        this.posts = new ArrayList<>();
        this.comments = new ArrayList<>();
    }

}