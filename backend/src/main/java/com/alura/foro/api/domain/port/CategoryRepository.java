package com.alura.foro.api.domain.port;

import java.util.List;

import com.alura.foro.api.domain.model.Category;

public interface CategoryRepository {
    
    // GET
	List<Category> getAllCategories();

}
