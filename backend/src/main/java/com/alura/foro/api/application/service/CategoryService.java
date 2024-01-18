package com.alura.foro.api.application.service;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;

public interface CategoryService {
    
    // GET
	List<ResponseCategoryDTO> getAllCategories();

}
