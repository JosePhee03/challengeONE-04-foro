package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;

public interface PostService {
	
    //GET
	List<ResponsePostDTO> getAllPosts();
	ResponsePostDTO getPost(Long id);

	List<ResponsePostDTO> searchPosts(String query, Long Category, Boolean status, Long userId);

	// POST
	ResponsePostDTO createPost(Post post);

	// PATCH
	ResponsePostDTO updatePost(Long id, String title, String content, Boolean status);

	// DELETE
	void deletePost(Long id);
}
