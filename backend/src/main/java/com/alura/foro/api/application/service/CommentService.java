package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;

public interface CommentService {
    
    // POST
	ResponseCommentDTO createComment(Comment comment);

	// UPDATE
	ResponseCommentDTO updateComment(Long id, String content);

	// DELETE
	void deleteComment(Long id);

}
