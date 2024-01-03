package com.alura.foro.api.domain.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
public class Post {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime date_created;
    private Boolean status;
    private User user;
    private Set<Category> categories;
    private List<Comment> comments;

    public Post () {
        this.date_created = LocalDateTime.now();
        this.status = false;
        this.categories = new HashSet<>();
        this.comments = new ArrayList<>();
    }

}
