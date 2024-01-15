package com.alura.foro.api.domain.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Post {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime dateCreated;
    private Boolean status;

    public Post () {
        this.dateCreated = LocalDateTime.now();
        this.status = false;
    }

}
