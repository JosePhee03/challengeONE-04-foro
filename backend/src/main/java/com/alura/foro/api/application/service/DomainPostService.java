package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;

public class DomainPostService implements PostService {

    private final PostRepository postRepository;

    public DomainPostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<ResponsePostDTO> getAllPosts() {
        return postRepository.getAllPosts();
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
    public ResponsePostDTO updatePost(Long id, String title, String content, Boolean status) {
        return postRepository.updatePost(id, title, content, status);
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deletePost(id);
    }

    @Override
    public List<ResponsePostDTO> searchPosts(String query, Long Category, Boolean status, Long userId) {
        throw new UnsupportedOperationException("Unimplemented method 'searchPosts'");
    }
    
}
