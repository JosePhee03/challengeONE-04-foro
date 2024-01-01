package com.alura.foro.api.domain.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Comment {

    private Long id;
    private String content;
    private LocalDateTime date_created;
    private User user;
    private Post post;

}
