package com.alura.foro.api.domain.port;

import java.util.List;

import java.util.Set;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;

public interface CategoryRepository {
    
    // GET
	List<ResponseCategoryDTO> getAllCategories();

    Set<ResponseCategoryDTO> searchCategories (Set<Long> categoriesId);

}
