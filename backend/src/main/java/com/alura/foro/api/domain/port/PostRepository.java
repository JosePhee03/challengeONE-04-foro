package com.alura.foro.api.domain.port;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;

public interface PostRepository {
    
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
