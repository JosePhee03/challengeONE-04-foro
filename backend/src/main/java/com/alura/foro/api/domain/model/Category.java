package com.alura.foro.api.domain.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;

@Data
public class Category {

    private Long id;
    private String name;
    private Set<Post> posts;

    public Category () {
        this.posts = new HashSet<>();
    }
}
