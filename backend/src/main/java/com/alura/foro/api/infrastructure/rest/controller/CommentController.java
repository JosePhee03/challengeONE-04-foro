package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.alura.foro.api.application.service.CommentService;
import com.alura.foro.api.domain.dto.CreateCommentDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("*")
public class CommentController {
    
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<ResponseCommentDTO> createComment(@RequestBody @Valid CreateCommentDTO createCommentDTO,
            UriComponentsBuilder uriComponentsBuilder) {

        Comment comment = new Comment();
        comment.setContent(createCommentDTO.content());
        comment.setPostId(createCommentDTO.postId());
        comment.setUserId(3L);

        ResponseCommentDTO responseCommentDTO = this.commentService.createComment(comment);

        URI url = uriComponentsBuilder.path("/api/comment/{id}").buildAndExpand(responseCommentDTO.getId()).toUri();
        return ResponseEntity.created(url).body(responseCommentDTO);
    }
}
