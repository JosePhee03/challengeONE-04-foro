package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.alura.foro.api.application.service.CommentService;
import com.alura.foro.api.domain.dto.CreateCommentDTO;
import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.dto.UpdateCommentDTO;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.infrastructure.util.Direction;
import com.alura.foro.api.infrastructure.util.Pagination;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("*")
public class CommentController {
    
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<PageDTO<ResponseCommentDTO>> searchComments(
            @RequestParam(name = "post", required = false) Long postId,
            @RequestParam(required = false, defaultValue = "30") int size,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "ASC") Direction direction
        ) {
        PageDTO<ResponseCommentDTO> responseCommentDTOs = this.commentService.searchComments(
            postId,
            new Pagination(page, size, direction)
        );
        
        return ResponseEntity.ok(responseCommentDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseCommentDTO> getComment(@PathVariable Long id) {
        ResponseCommentDTO commentDTO = this.commentService.getComment(id);
        return ResponseEntity.ok(commentDTO);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        this.commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseCommentDTO> updateComment (@PathVariable Long id, @RequestBody @Valid UpdateCommentDTO updateCommentDTO) {
        ResponseCommentDTO responseCommentDTO = this.commentService.updateComment(
            id,
            updateCommentDTO.content()
        );

        return ResponseEntity.ok(responseCommentDTO);
    }

}
