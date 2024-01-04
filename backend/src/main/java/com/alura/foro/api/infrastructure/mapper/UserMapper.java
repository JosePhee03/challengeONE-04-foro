package com.alura.foro.api.infrastructure.mapper;


import java.util.ArrayList;
import java.util.List;

import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;

public class UserMapper {
    
    private UserMapper() {
        // Clase de utilidad, no se permite instanciar.
    }

    public static UserEntity mapToEntity(User user) {
        if (user == null) {
            return null;
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(user.getPassword());
        userEntity.setRole(user.getRole());
        userEntity.setImage(user.getImage());

        // Mapear Posts
        List<PostEntity> postEntities = new ArrayList<>();
        if (user.getPosts() != null) {
            for (Post post : user.getPosts()) {
                PostEntity postEntity = PostMapper.mapToEntity(post); // Necesitarás implementar PostMapper
                postEntities.add(postEntity);
            }
        }
        userEntity.setPostEntities(postEntities);

        // Mapear Comments
        List<CommentEntity> commentEntities = new ArrayList<>();
        if (user.getComments() != null) {
            for (Comment comment : user.getComments()) {
                CommentEntity commentEntity = CommentMapper.mapToEntity(comment); // Necesitarás implementar CommentMapper
                commentEntities.add(commentEntity);
            }
        }
        userEntity.setCommentEntities(commentEntities);

        return userEntity;
    }

    public static User mapToModel(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }

        User user = new User();
        user.setId(userEntity.getId());
        user.setUsername(userEntity.getUsername());
        user.setPassword(userEntity.getPassword());
        user.setRole(userEntity.getRole());
        user.setImage(userEntity.getImage());

        // Mapear PostEntities
        List<Post> posts = new ArrayList<>();
        if (userEntity.getPostEntities() != null) {
            for (PostEntity postEntity : userEntity.getPostEntities()) {
                Post post = PostMapper.mapToModel(postEntity); // Necesitarás implementar PostMapper
                posts.add(post);
            }
        }
        user.setPosts(posts);

        // Mapear CommentEntities
        List<Comment> comments = new ArrayList<>();
        if (userEntity.getCommentEntities() != null) {
            for (CommentEntity commentEntity : userEntity.getCommentEntities()) {
                Comment comment = CommentMapper.mapToModel(commentEntity); // Necesitarás implementar CommentMapper
                comments.add(comment);
            }
        }
        user.setComments(comments);

        return user;
    }

    public static List<User> mapListToModel (List<UserEntity> userEntities) {
        List<User> users = new ArrayList<>();

        for (UserEntity userEntity : userEntities) {
            User user = UserMapper.mapToModel(userEntity);
            users.add(user);
        }

        return users;
    }

    public static List<UserEntity> mapListToEntity (List<User> users) {
        List<UserEntity> userEntities = new ArrayList<>();

        for (User user : users) {
            UserEntity userEntity = UserMapper.mapToEntity(user);
            userEntities.add(userEntity);
        }

        return userEntities;
    }

}