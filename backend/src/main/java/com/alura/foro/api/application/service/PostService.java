package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.Post;

public interface PostService {
    //GET
	List<Post> getAllPosts();
	Post getPost(Long id);

	List<Post> searchForPosts(String query, Long Category, Boolean status);

	// POST
	Post createPost(Post post);

	// UPDATE
	Post updatePost(Long id, String title, String content, Boolean status);

	// DELETE
	void deletePost(Long id);
}
