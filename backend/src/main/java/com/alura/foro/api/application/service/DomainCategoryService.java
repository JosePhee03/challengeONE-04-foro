package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.Category;
import com.alura.foro.api.domain.port.CategoryRepository;

public class DomainCategoryService implements CategoryService {

    private CategoryRepository categoryRepository;

    public DomainCategoryService (CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.getAllCategories();
    }
    
}