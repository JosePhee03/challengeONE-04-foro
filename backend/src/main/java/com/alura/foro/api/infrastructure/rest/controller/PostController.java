package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.alura.foro.api.application.service.PostService;
import com.alura.foro.api.domain.dto.CreatePostDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.infrastructure.util.Pagination;

@RestController
@RequestMapping("/api/post")
@CrossOrigin("*")
public class PostController {
    
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<ResponsePostDTO>> getAllPosts(@PageableDefault(size = 30) Pageable pageable) {
        List<ResponsePostDTO> responseUserDTOs = this.postService.getAllPosts();
        
        Page<ResponsePostDTO> page = Pagination.convert(responseUserDTOs, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsePostDTO> getPost(@PathVariable Long id) {
        ResponsePostDTO postDTO = this.postService.getPost(id);
        return ResponseEntity.ok(postDTO);
    }
    
    @PostMapping
    public ResponseEntity<ResponsePostDTO> createPost(@RequestBody CreatePostDTO createPostDTO,
            UriComponentsBuilder uriComponentsBuilder) {

        Post post = new Post();
        post.setContent(createPostDTO.content());
        post.setTitle(createPostDTO.title());

        ResponsePostDTO responsePostDTO = this.postService.createPost(post);

        URI url = uriComponentsBuilder.path("/api/post/{id}").buildAndExpand(responsePostDTO.getId()).toUri();
        return ResponseEntity.created(url).body(responsePostDTO);
    }

}
