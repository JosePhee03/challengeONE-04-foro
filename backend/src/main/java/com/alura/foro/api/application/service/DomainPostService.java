package com.alura.foro.api.application.service;

import java.util.Set;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;
import com.alura.foro.api.infrastructure.util.Pagination;

public class DomainPostService implements PostService {

    private final PostRepository postRepository;

    public DomainPostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public ResponsePostDTO getPost(Long id) {
        return postRepository.getPost(id);
    }

    @Override
    public ResponsePostDTO createPost(Post post) {
        return postRepository.createPost(post);
    }

    @Override
    public ResponsePostDTO updatePost(Long id, String title, String content, Set<Long> categories, Boolean status) {
        return postRepository.updatePost(id, title, content, categories, status);
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deletePost(id);
    }

    @Override
    public PageDTO<ResponsePostDTO> searchPosts(String query, Set<Long> categories, Boolean status, Long userId, Pagination pagination) {
        return postRepository.searchPosts(query, categories, status, userId, pagination);
    }
    
}
