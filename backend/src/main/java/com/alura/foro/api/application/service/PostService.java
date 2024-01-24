package com.alura.foro.api.application.service;

import java.util.Set;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.infrastructure.util.Pagination;

public interface PostService {
	
    //GET
	ResponsePostDTO getPost(Long id);

	PageDTO<ResponsePostDTO> searchPosts(String query, Set<Long> categories, Boolean status, Long userId, Pagination pagination);

	// POST
	ResponsePostDTO createPost(Post post);

	// PATCH
	ResponsePostDTO updatePost(Long id, String title, String content, Boolean status);

	// DELETE
	void deletePost(Long id);
}
