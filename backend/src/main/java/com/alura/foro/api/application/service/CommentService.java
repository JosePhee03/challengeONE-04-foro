package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.model.Comment;

public interface CommentService {
    
    // POST
	Comment createComment(Comment comment);

	// UPDATE
	Comment updateComment(Long id, String content);

	// DELETE
	void deleteComment(Long id);

}
