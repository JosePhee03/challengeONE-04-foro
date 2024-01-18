package com.alura.foro.api.infrastructure.adapter;

import java.time.LocalDateTime;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.port.CommentRepository;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.CommentMapper;

@Repository
public class CommentRepositoryMySQL implements CommentRepository {

    private final CommentJpaRepositoryMySQL commentJpaRepository;
    private final PostJpaRepositoryMySQL postJpaRepository;
    private final UserJpaRepositoryMySQL UserJpaRepository;

    public CommentRepositoryMySQL(CommentJpaRepositoryMySQL commentJpaRepository, PostJpaRepositoryMySQL postJpaRepository, UserJpaRepositoryMySQL UserJpaRepository) {
        this.commentJpaRepository = commentJpaRepository;
        this.postJpaRepository = postJpaRepository;
        this.UserJpaRepository = UserJpaRepository;
    }

    @Override
    public ResponseCommentDTO createComment(Comment comment) {
        CommentEntity commentEntity = new CommentEntity();

        PostEntity postEntity = this.postJpaRepository.findById(comment.getPostId())
            .orElseThrow(() -> new ResourceNotFoundException("Error al encontrar la publicación"));

        UserEntity userEntity = this.UserJpaRepository.findById(comment.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("Error al encontrar el usuario"));

        commentEntity.setContent(comment.getContent());
        commentEntity.setDateCreated(comment.getDateCreated());
        commentEntity.setPostEntity(postEntity);
        commentEntity.setUserEntity(userEntity);

        CommentEntity saveCommentEntity = this.commentJpaRepository.save(commentEntity);

        return CommentMapper.toResponseCommentDTO(saveCommentEntity);

    }

    @Override
    public ResponseCommentDTO updateComment(Long id, String content) {
        CommentEntity commentEntity = this.commentJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("El commentario no existe"));

        commentEntity.setContent(content);
        commentEntity.setDateCreated(LocalDateTime.now());

        return CommentMapper.toResponseCommentDTO(this.commentJpaRepository.save(commentEntity));


    }

    @Override
    public void deleteComment(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteComment'");
    }
    
}
