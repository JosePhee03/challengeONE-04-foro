package com.alura.foro.api.infrastructure.rest.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.alura.foro.api.application.service.PostService;
import com.alura.foro.api.application.service.UserService;
import com.alura.foro.api.domain.dto.CreatePostDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Category;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.infrastructure.util.Pagination;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/post")
@CrossOrigin("*")
public class PostController {
    
    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<ResponsePostDTO>> getPost(@PageableDefault(size = 30) Pageable pageable) {
        List<ResponsePostDTO> responsePostDTOs = new ArrayList<>();


        postService.getAllPosts()
                .forEach((post) -> responsePostDTOs.add(new ResponsePostDTO(post)));
        
        Page<ResponsePostDTO> page = Pagination.convert(responsePostDTOs, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsePostDTO> getPost(@PathVariable Long id) {
        Post post = this.postService.getPost(id);
        return ResponseEntity.ok(new ResponsePostDTO(post));
    }
    
    @PostMapping
    public ResponseEntity<ResponsePostDTO> createPost(@RequestBody CreatePostDTO createPostDTO,
            UriComponentsBuilder uriComponentsBuilder) {

        User user = userService.getUser(1L);

        Post post = new Post();
        post.setContent(createPostDTO.content());
        post.setTitle(createPostDTO.title());
        Category category = new Category();

        category.setId(2L);
        category.setName("CSS");

        post.getCategories().add(category);
        post.setUser(user);

        Post newPost = this.postService.createPost(post);

        ResponsePostDTO responsePostDTO = new ResponsePostDTO(newPost);

        System.out.println("post_id: " + newPost.getId());

        URI url = uriComponentsBuilder.path("/api/post/{id}").buildAndExpand(newPost.getId()).toUri();
        return ResponseEntity.created(url).body(responsePostDTO);
    }

}
