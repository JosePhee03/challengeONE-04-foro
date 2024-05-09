package com.alura.foro.api.domain.model;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;

@Data
public class Post {

    private Long id;
    private String title;
    private String content;
    private ZonedDateTime dateCreated;
    private Boolean status;
    private Set<Long> categories;
    private Long userId;

    public Post () {
        this.dateCreated = ZonedDateTime.now(ZoneOffset.UTC);
        this.status = false;
        this.categories = new HashSet<>();
    }

}
