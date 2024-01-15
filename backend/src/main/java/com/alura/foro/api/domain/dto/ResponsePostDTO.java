package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.model.Post;

import lombok.Getter;

@Getter
public class ResponsePostDTO {

    Long id;
    String title;
    String content;
    LocalDateTime dateCreated;
    Boolean status;
    ResponseUserDTO user;
    List<ResponseCommentDTO> comments;
    Integer totalComments;

    public ResponsePostDTO (Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.dateCreated = post.getDateCreated();
        this.status = post.getStatus();
        this.user = new ResponseUserDTO(post.getUser());

        List<ResponseCommentDTO> responseCommentDTOs = new ArrayList<>();
        List<Comment> comments = post.getComments();
        for (Comment comment : comments) {
            responseCommentDTOs.add(new ResponseCommentDTO(comment));
        }

        this.comments = responseCommentDTOs;
        this.totalComments = responseCommentDTOs.size();

    }
}
