package com.alura.foro.api.domain.port;

import com.alura.foro.api.domain.model.Comment;

public interface CommentRepository {
    
    // POST
	Comment createComment(Comment comment);

	// UPDATE
	Comment updateComment(Long id, String content);

	// DELETE
	void deleteComment(Long id);

}
