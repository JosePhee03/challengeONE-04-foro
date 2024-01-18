package com.alura.foro.api.domain.port;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.domain.model.Post;

public interface PostRepository {
    
    //GET
	List<ResponsePostDTO> getAllPosts();
	ResponsePostDTO getPost(Long id);

	List<ResponsePostDTO> searchForPosts(String query, Long Category, Boolean status);

	// POST
	ResponsePostDTO createPost(Post post);

	// UPDATE
	ResponsePostDTO updatePost(Long id, String title, String content, Boolean status);

	// DELETE
	void deletePost(Long id);

}
