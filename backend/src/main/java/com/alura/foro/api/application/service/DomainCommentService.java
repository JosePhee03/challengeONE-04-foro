package com.alura.foro.api.application.service;

import com.alura.foro.api.domain.model.Comment;

public class DomainCommentService implements CommentService {

    private CommentService commentService;

    public DomainCommentService (CommentService commentService) {
        this.commentService = commentService;
    }

    @Override
    public Comment createComment(Comment comment) {
        return commentService.createComment(comment);
    }

    @Override
    public Comment updateComment(Long id, String content) {
        return commentService.updateComment(id, content);
    }

    @Override
    public void deleteComment(Long id) {
        commentService.deleteComment(id);
    }
    
}
