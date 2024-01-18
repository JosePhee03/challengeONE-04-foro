package com.alura.foro.api.infrastructure.mapper;

import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.infrastructure.entity.CommentEntity;

public class CommentMapper {

    public static ResponseCommentDTO toResponseCommentDTO(CommentEntity commentEntity) {
        ResponseCommentDTO commentDTO = new ResponseCommentDTO();

        commentDTO.setContent(commentEntity.getContent());
        commentDTO.setDateCreated(commentEntity.getDateCreated());
        commentDTO.setUser(UserMapper.toResponseUserDTO(commentEntity.getUserEntity()));

        return commentDTO;

    }

}
