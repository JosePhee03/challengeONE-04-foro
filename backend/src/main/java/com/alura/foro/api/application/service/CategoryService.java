package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.model.Category;

public interface CategoryService {
    
    // GET
	List<Category> getAllCategories();

}
