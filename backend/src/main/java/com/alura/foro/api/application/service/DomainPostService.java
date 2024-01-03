package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.port.PostRepository;

public class DomainPostService implements PostService {

    private final PostRepository postRepository;

    public DomainPostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.getAllPosts();
    }

    @Override
    public Post getPost(Long id) {
        return postRepository.getPost(id);
    }

    @Override
    public List<Post> searchForPosts(String query, Long Category, Boolean status) {
        return postRepository.searchForPosts(query, Category, status);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.createPost(post);
    }

    @Override
    public Post updatePost(Long id, String title, String content, Boolean status) {
        return postRepository.updatePost(id, title, content, status);
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deletePost(id);
    }
    
}
