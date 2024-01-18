package com.alura.foro.api.infrastructure.mapper;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;

public class CategoryMapper {

    public static ResponseCategoryDTO toResponseCategoryDTO(CategoryEntity categoryEntities) {
        
         return new ResponseCategoryDTO(categoryEntities.getId(), categoryEntities.getName());

    }

}
