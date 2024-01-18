package com.alura.foro.api.domain.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Comment {

    private Long id;
    private String content;
    private LocalDateTime dateCreated;
    private Long postId;
    private Long userId;

    public Comment () {
        this.dateCreated = LocalDateTime.now();
    }

}
