package com.alura.foro.api.domain.port;

import java.util.List;

import com.alura.foro.api.domain.dto.ResponseCategoryDTO;

public interface CategoryRepository {
    
    // GET
	List<ResponseCategoryDTO> getAllCategories();

    List<ResponseCategoryDTO> searchCategories (List<Long> categoriesId);

}
