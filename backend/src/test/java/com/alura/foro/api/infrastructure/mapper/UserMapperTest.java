package com.alura.foro.api.infrastructure.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.model.Post;
import com.alura.foro.api.domain.model.Role;
import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;


public class UserMapperTest {


    @Test
    public void testMapToEntity() {
        // Crear un objeto User de prueba con arrays de posts y comentarios
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");
        user.setPassword("testPassword");
        user.setRole(Role.USER);
        user.setImage("testImage");

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Post");
        post.setContent("Test Content");
        post.setDateCreated(LocalDateTime.now());
        post.setStatus(true);

        Comment comment = new Comment();
        comment.setId(1L);
        comment.setContent("Test Comment");
        comment.setDateCreated(LocalDateTime.now());

        user.getPosts().add(post);
        user.getComments().add(comment);

        // Mapear el objeto User a UserEntity
        UserEntity userEntity = UserMapper.mapToEntity(user);

        // Verificar la correspondencia de los campos
        assertEquals(user.getId(), userEntity.getId());
        assertEquals(user.getUsername(), userEntity.getUsername());
        assertEquals(user.getPassword(), userEntity.getPassword());
        assertEquals(user.getRole(), userEntity.getRole());
        assertEquals(user.getImage(), userEntity.getImage());

        // Verificar la correspondencia del array de posts
        assertNotNull(userEntity.getPostEntities());
        assertEquals(1, userEntity.getPostEntities().size());

        // Verificar la correspondencia del array de comentarios
        assertNotNull(userEntity.getCommentEntities());
        assertEquals(1, userEntity.getCommentEntities().size());
    }

    @Test
    public void testMapToModel() {
        // Crear un objeto UserEntity de prueba con arrays de postEntities y commentEntities
        UserEntity userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setUsername("testUserEntity");
        userEntity.setPassword("testPasswordEntity");
        userEntity.setRole(Role.USER);
        userEntity.setImage("testImageEntity");

        PostEntity postEntity = new PostEntity();
        postEntity.setId(1L);
        postEntity.setTitle("Test Post Entity");
        postEntity.setContent("Test Content Entity");
        postEntity.setDateCreated(LocalDateTime.now());
        postEntity.setStatus(true);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setId(1L);
        commentEntity.setContent("Test Comment Entity");
        commentEntity.setDateCreated(LocalDateTime.now());

        userEntity.getPostEntities().add(postEntity);
        userEntity.getCommentEntities().add(commentEntity);

        // Mapear el objeto UserEntity a User
        User user = UserMapper.mapToModel(userEntity);

        // Verificar la correspondencia de los campos
        assertEquals(userEntity.getId(), user.getId());
        assertEquals(userEntity.getUsername(), user.getUsername());
        assertEquals(userEntity.getPassword(), user.getPassword());
        assertEquals(userEntity.getRole(), user.getRole());
        assertEquals(userEntity.getImage(), user.getImage());

        // Verificar la correspondencia del array de posts
        assertNotNull(user.getPosts());
        assertEquals(1, user.getPosts().size());

        // Verificar la correspondencia del array de comentarios
        assertNotNull(user.getComments());
        assertEquals(1, user.getComments().size());
    }

}
