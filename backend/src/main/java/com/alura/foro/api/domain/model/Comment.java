package com.alura.foro.api.domain.model;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class Comment {

    private Long id;
    private String content;
    private ZonedDateTime dateCreated;
    private Long postId;
    private Long userId;

    public Comment () {
        this.dateCreated = ZonedDateTime.now(ZoneOffset.UTC);
    }

}
