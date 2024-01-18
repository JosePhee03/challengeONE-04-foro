package com.alura.foro.api.infrastructure.adapter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;
import com.alura.foro.api.domain.port.CategoryRepository;
import com.alura.foro.api.infrastructure.entity.CategoryEntity;
import com.alura.foro.api.infrastructure.mapper.CategoryMapper;

@Repository
public class CategoryRepositoryMySQL implements CategoryRepository {
    
    private final CategoryJpaRepositoryMySQL categoryJpaRepository;

    public CategoryRepositoryMySQL(CategoryJpaRepositoryMySQL categoryJpaRepository) {
        this.categoryJpaRepository = categoryJpaRepository;
    }

    @Override
    public List<ResponseCategoryDTO> getAllCategories() {
        List<CategoryEntity> categoryEntities = this.categoryJpaRepository.findAll();
        List<ResponseCategoryDTO> categoryDTOs = new ArrayList<>();

        for (CategoryEntity categoryEntity : categoryEntities) {
            categoryDTOs.add(CategoryMapper.toResponseCategoryDTO(categoryEntity));
        }
        
        return categoryDTOs;
    }

}
