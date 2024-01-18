package com.alura.foro.api.domain.port;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;

public interface CommentRepository {
    
    // POST
	ResponseCommentDTO createComment(Comment comment);

	// UPDATE
	ResponseCommentDTO updateComment(Long id, String content);

	// DELETE
	void deleteComment(Long id);

}
