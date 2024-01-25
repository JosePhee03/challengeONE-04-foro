package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;
import java.util.Set;

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
import com.alura.foro.api.application.service.PostService;
import com.alura.foro.api.domain.dto.CreatePostDTO;
import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.dto.UpdatePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.infrastructure.util.Direction;
import com.alura.foro.api.infrastructure.util.Pagination;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/post")
@CrossOrigin("*")
public class PostController {
    
    private final PostService postService;
    private final CommentService commentService;

    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<PageDTO<ResponsePostDTO>> searchPosts(
            @RequestParam(name = "q", defaultValue = "", required = false) String query,
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) Set<Long> categories,
            @RequestParam(required = false, defaultValue = "30") int size,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "ASC") Direction direction
        ) {

        PageDTO<ResponsePostDTO> responseUserDTOs = this.postService.searchPosts(
            query,
            categories,
            status,
            null,
            new Pagination(page, size, direction)
            );
        
        return ResponseEntity.ok(responseUserDTOs);
    }

    @GetMapping("/{id}/comment")
    public ResponseEntity<PageDTO<ResponseCommentDTO>> searchCommentsOfPost(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "30") int size,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "ASC") Direction direction
        ) {
        PageDTO<ResponseCommentDTO> responseCommentDTOs = this.commentService.searchComments(
            id,
            new Pagination(page, size, direction)
        );
        
        return ResponseEntity.ok(responseCommentDTOs);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<PageDTO<ResponsePostDTO>> searchPostsByUser(
            @PathVariable Long id,
            @RequestParam(name = "q", defaultValue = "", required = false) String query,
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) Set<Long> categories,
            @RequestParam(required = false, defaultValue = "30") int size,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "ASC") Direction direction
        ) {

        PageDTO<ResponsePostDTO> responsePostDTO = this.postService.searchPosts(
            query,
            categories,
            status,
            id,
            new Pagination(page, size, direction)
            );
        
        return ResponseEntity.ok(responsePostDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsePostDTO> getPost(@PathVariable Long id) {
        ResponsePostDTO postDTO = this.postService.getPost(id);
        return ResponseEntity.ok(postDTO);
    }
    
    @PostMapping
    public ResponseEntity<ResponsePostDTO> createPost(@RequestBody @Valid CreatePostDTO createPostDTO,
            UriComponentsBuilder uriComponentsBuilder) {

        Post post = new Post();
        post.setContent(createPostDTO.content());
        post.setTitle(createPostDTO.title());
        post.setUserId(2L);
        post.setCategories(createPostDTO.categories());

        ResponsePostDTO responsePostDTO = this.postService.createPost(post);

        URI url = uriComponentsBuilder.path("/api/post/{id}").buildAndExpand(responsePostDTO.getId()).toUri();
        return ResponseEntity.created(url).body(responsePostDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        this.postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponsePostDTO> updatePost (@PathVariable Long id, @RequestBody @Valid UpdatePostDTO updatePostDTO) {
        ResponsePostDTO responseUserDTO = this.postService.updatePost(
            id,
            updatePostDTO.title(),
            updatePostDTO.content(),
            updatePostDTO.categories(),
            updatePostDTO.status()
        );

        return ResponseEntity.ok(responseUserDTO);
    }

}
