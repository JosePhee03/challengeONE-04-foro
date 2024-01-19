package com.alura.foro.api.infrastructure.mapper;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.infrastructure.entity.CommentEntity;

public class CommentMapper {

    public static ResponseCommentDTO toResponseCommentDTO(CommentEntity commentEntity) {
        ResponseCommentDTO commentDTO = new ResponseCommentDTO();
        
        commentDTO.setId(commentEntity.getId());
        commentDTO.setPostId(commentEntity.getPostEntity().getId());
        commentDTO.setContent(commentEntity.getContent());
        commentDTO.setDateCreated(commentEntity.getDateCreated());
        commentDTO.setAuthor(UserMapper.toResponseUserDTO(commentEntity.getUserEntity()));
        
        return commentDTO;

    }

}
