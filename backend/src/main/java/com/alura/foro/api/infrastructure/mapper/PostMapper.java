package com.alura.foro.api.infrastructure.mapper;

import java.util.ArrayList;
import java.util.List;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;
import com.alura.foro.api.domain.dto.ResponseCommentDTO;
import com.alura.foro.api.domain.dto.ResponsePostDTO;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.entity.CommentEntity;
import com.alura.foro.api.infrastructure.entity.PostEntity;

public class PostMapper {
    

    static public ResponsePostDTO toResponsePostDTO (PostEntity postEntity) {

        ResponsePostDTO postDTO = new ResponsePostDTO();

        postDTO.setId(postEntity.getId());
        postDTO.setTitle(postEntity.getTitle());
        postDTO.setContent(postEntity.getContent());
        postDTO.setDateCreated(postEntity.getDateCreated());
        postDTO.setStatus(postEntity.getStatus());


        postDTO.setUser(UserMapper.toResponseUserDTO(postEntity.getUserEntity()));

        List<ResponseCommentDTO> commentDTOs = new ArrayList<>();

        for (CommentEntity commentEntities : postEntity.getCommentEntities()) {
            commentDTOs.add(CommentMapper.toResponseCommentDTO(commentEntities));
        }

        List<ResponseCategoryDTO> categoryDTOs = new ArrayList<>();

       for (CategoryEntity categoryEntities : postEntity.getCategoryEntities()) {
            categoryDTOs.add(CategoryMapper.toResponseCategoryDTO(categoryEntities));
       }

       postDTO.setTotalComments(commentDTOs.size());

        return postDTO;
    }


}
