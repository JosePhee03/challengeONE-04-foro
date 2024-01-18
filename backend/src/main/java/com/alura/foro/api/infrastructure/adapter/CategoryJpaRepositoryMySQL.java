package com.alura.foro.api.infrastructure.adapter;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.CategoryEntity;

@Repository
public interface CategoryJpaRepositoryMySQL extends JpaRepository<CategoryEntity, Long> {

    List<CategoryEntity> findByIdIn(List<Long> categoriesId);

}