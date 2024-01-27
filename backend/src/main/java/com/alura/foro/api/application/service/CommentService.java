package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.infrastructure.util.Pagination;

public interface CommentService {
    
	// GET
	List<ResponseCommentDTO> getAllComments();

	PageDTO<ResponseCommentDTO> searchComments(Long postId, Pagination pagination);

	
	ResponseCommentDTO getComment(Long id);

    // POST
	ResponseCommentDTO createComment(Comment comment);

	// PATCH
	ResponseCommentDTO updateComment(Long id, Long userId, String content);

	// DELETE
	void deleteComment(Long id, Long userId);

}
