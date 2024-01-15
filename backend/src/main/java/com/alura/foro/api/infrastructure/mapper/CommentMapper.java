package com.alura.foro.api.infrastructure.mapper;

import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.infrastructure.entity.CommentEntity;

public class CommentMapper {
    
    private CommentMapper() {
    }

    public static CommentEntity mapToEntity(Comment comment) {
        if (comment == null) {
            return null;
        }

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setId(comment.getId());
        commentEntity.setContent(comment.getContent());
        commentEntity.setDateCreated(comment.getDateCreated());

        // Mapear User
        if (comment.getUser() != null) {
            commentEntity.setUserEntity(UserMapper.mapToEntity(comment.getUser())); // Necesitarás implementar UserMapper
        }

        // Mapear Post
        if (comment.getPost() != null) {
            commentEntity.setPostEntity(PostMapper.mapToEntity(comment.getPost())); // Necesitarás implementar PostMapper
        }

        return commentEntity;
    }

    public static Comment mapToModel(CommentEntity commentEntity) {
        if (commentEntity == null) {
            return null;
        }

        Comment comment = new Comment();
        comment.setId(commentEntity.getId());
        comment.setContent(commentEntity.getContent());
        comment.setDateCreated(commentEntity.getDateCreated());

        // Mapear UserEntity
        if (commentEntity.getUserEntity() != null) {
            comment.setUser(UserMapper.mapToModel(commentEntity.getUserEntity())); // Necesitarás implementar UserMapper
        }

        // Mapear PostEntity
        if (commentEntity.getPostEntity() != null) {
            comment.setPost(PostMapper.mapToModel(commentEntity.getPostEntity())); // Necesitarás implementar PostMapper
        }

        return comment;
    }

}
