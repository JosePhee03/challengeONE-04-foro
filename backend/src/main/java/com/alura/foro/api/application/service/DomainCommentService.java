package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.port.CommentRepository;

public class DomainCommentService implements CommentService {

    private CommentRepository commentRepository;

    public DomainCommentService (CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public ResponseCommentDTO createComment(Comment comment) {
        return commentRepository.createComment(comment);
    }

    @Override
    public ResponseCommentDTO updateComment(Long id, String content) {
        return commentRepository.updateComment(id, content);
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteComment(id);
    }
    
}
