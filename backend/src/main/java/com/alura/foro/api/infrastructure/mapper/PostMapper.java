package com.alura.foro.api.infrastructure.mapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.alura.foro.api.domain.model.Category;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;

public class PostMapper {
    
    
    private PostMapper() {
    }

    public static PostEntity mapToEntity(Post post) {
        PostEntity postEntity = new PostEntity();
        postEntity.setId(post.getId());
        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setDate_created(post.getDate_created());
        postEntity.setStatus(post.getStatus());

        // Mapear User
        if (post.getUser() != null) {
            postEntity.setUserEntity(UserMapper.mapToEntity(post.getUser())); // Necesitarás implementar UserMapper
        }

        // Mapear Category
        Set<CategoryEntity> categoryEntities = new HashSet<>();
        if (post.getCategories() != null) {
            for (Category category : post.getCategories()) {
                CategoryEntity categoryEntity = CategoryMapper.mapToEntity(category); // Necesitarás implementar CategoryMapper
                categoryEntities.add(categoryEntity);
            }
        }
        postEntity.setCategoryEntities(categoryEntities);

        // Mapear Comment
        List<CommentEntity> commentEntities = new ArrayList<>();
        if (post.getComments() != null) {
            for (Comment comment : post.getComments()) {
                CommentEntity commentEntity = CommentMapper.mapToEntity(comment); // Necesitarás implementar CommentMapper
                commentEntities.add(commentEntity);
            }
        }
        postEntity.setCommentEntities(commentEntities);

        return postEntity;
    }

    public static Post mapToModel(PostEntity postEntity) {
        Post post = new Post();
        post.setId(postEntity.getId());
        post.setTitle(postEntity.getTitle());
        post.setContent(postEntity.getContent());
        post.setDate_created(postEntity.getDate_created());
        post.setStatus(postEntity.getStatus());

        // Mapear UserEntity
        if (postEntity.getUserEntity() != null) {
            post.setUser(UserMapper.mapToModel(postEntity.getUserEntity())); // Necesitarás implementar UserMapper
        }

        // Mapear CategoryEntity
        Set<Category> categories = new HashSet<>();
        if (postEntity.getCategoryEntities() != null) {
            for (CategoryEntity categoryEntity : postEntity.getCategoryEntities()) {
                Category category = CategoryMapper.mapToModel(categoryEntity); // Necesitarás implementar CategoryMapper
                categories.add(category);
            }
        }
        post.setCategories(categories);

        // Mapear CommentEntity
        List<Comment> comments = new ArrayList<>();
        if (postEntity.getCommentEntities() != null) {
            for (CommentEntity commentEntity : postEntity.getCommentEntities()) {
                Comment comment = CommentMapper.mapToModel(commentEntity); // Necesitarás implementar CommentMapper
                comments.add(comment);
            }
        }
        post.setComments(comments);

        return post;
    }
}
