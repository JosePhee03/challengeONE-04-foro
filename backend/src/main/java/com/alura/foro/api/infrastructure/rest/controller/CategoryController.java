package com.alura.foro.api.infrastructure.rest.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alura.foro.api.application.service.CategoryService;
import com.alura.foro.api.domain.dto.ResponseCategoryDTO;
import com.alura.foro.api.infrastructure.util.Pagination;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("*")
public class CategoryController {
    
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<Page<ResponseCategoryDTO>> getAllCategories(@PageableDefault(size = 30) Pageable pageable) {
        List<ResponseCategoryDTO> responseCategoryDTOs = this.categoryService.getAllCategories();
        
        Page<ResponseCategoryDTO> page = Pagination.convert(responseCategoryDTOs, pageable);
        return ResponseEntity.ok(page);
    }

}
