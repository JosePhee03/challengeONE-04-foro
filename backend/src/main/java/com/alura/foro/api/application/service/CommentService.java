package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;

public interface CommentService {
    
	// GET
	List<ResponseCommentDTO> getAllComments();

	List<ResponseCommentDTO> searchComments(Long postId);

	
	ResponseCommentDTO getComment(Long id);

    // POST
	ResponseCommentDTO createComment(Comment comment);

	// PATCH
	ResponseCommentDTO updateComment(Long id, String content);

	// DELETE
	void deleteComment(Long id);

}
