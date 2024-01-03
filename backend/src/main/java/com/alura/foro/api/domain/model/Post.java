package com.alura.foro.api.domain.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Post {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime date_created;
    private Boolean status;
    private User user;
    private List<Category> categories;
    private List<Comment> comments;

    public Post () {
        this.date_created = LocalDateTime.now();
        this.status = false;
        this.categories = new ArrayList<>();
        this.comments = new ArrayList<>();
    }

}
