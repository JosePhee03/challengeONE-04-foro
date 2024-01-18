package com.alura.foro.api.infrastructure.adapter;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.CategoryEntity;

@Repository
public interface CategoryJpaRepositoryMySQL extends JpaRepository<CategoryEntity, Long> {

    Set<CategoryEntity> findByIdIn(Set<Long> categoriesId);

}