package com.alura.foro.api.infrastructure.adapter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.PageDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.model.Comment;
import com.alura.foro.api.domain.port.CommentRepository;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PageMapper;
import com.alura.foro.api.infrastructure.entity.PostEntity;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.CommentMapper;
import com.alura.foro.api.infrastructure.util.Pagination;

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

        Long postId = comment.getPostId();

        Long userId = comment.getUserId();

        if (postId == null) throw new ResourceNotFoundException("Error al encontrar la publicación");

        if (userId == null) throw new ResourceNotFoundException("Error al encontrar el usuario");

        CommentEntity commentEntity = new CommentEntity();

        PostEntity postEntity = this.postJpaRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Error al encontrar la publicación"));

        UserEntity userEntity = this.UserJpaRepository.findById(userId)
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

        if (id == null) throw new ResourceNotFoundException("El commentario no existe");

        CommentEntity commentEntity = this.commentJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("El commentario no existe"));

        commentEntity.setContent(content);
        commentEntity.setDateCreated(LocalDateTime.now());

        return CommentMapper.toResponseCommentDTO(this.commentJpaRepository.save(commentEntity));


    }

    @Override
    public void deleteComment(Long id) {
        if (id == null) throw new ResourceNotFoundException("El commentario no existe");

        this.commentJpaRepository.deleteById(id);
    }

    @Override
    public List<ResponseCommentDTO> getAllComments() {
        List<CommentEntity> commentEntities = this.commentJpaRepository.findAll();
        List<ResponseCommentDTO> commentDTOs = new ArrayList<>();

       for (CommentEntity commentEntity : commentEntities) {
            commentDTOs.add(CommentMapper.toResponseCommentDTO(commentEntity));
       }

       return commentDTOs;
    }

    @Override
    public ResponseCommentDTO getComment(Long id) {

        if (id == null) throw new ResourceNotFoundException("El commentario no existe");

        CommentEntity commentEntity = this.commentJpaRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado"));

        return CommentMapper.toResponseCommentDTO(commentEntity);
    }

    @Override
    public PageDTO<ResponseCommentDTO> searchComments(Long postId, Pagination pagination) {
        
        Direction direction = Direction.ASC;

        if (pagination.getDirection().name() != "ASC") direction = Direction.DESC;

        Pageable pageable = PageRequest.of(pagination.getPage(), pagination.getSize(), Sort.by(direction, "dateCreated"));

        Page<CommentEntity> commentEntities = this.commentJpaRepository.searchComments(postId, pageable);
    
        List<ResponseCommentDTO> commentDTOs = new ArrayList<>();

        for (CommentEntity commentEntity : commentEntities) {
            commentDTOs.add(CommentMapper.toResponseCommentDTO(commentEntity));
        }

        PageMapper<ResponseCommentDTO, CommentEntity> pageMapper = new PageMapper<>();

        return pageMapper.toPageDTO(commentEntities, commentDTOs);

    }
    
}
