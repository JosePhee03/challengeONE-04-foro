package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.alura.foro.api.domain.model.Comment;

public record ResponsePostDTO (

    Long id,
    String title,
    String content,
    LocalDateTime date_created,
    Boolean status,
    ResponseUserDTO user,
    List<Comment> comments,
    Integer total_comments

) {}
