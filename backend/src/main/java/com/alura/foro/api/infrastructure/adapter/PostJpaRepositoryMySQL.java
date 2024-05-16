package com.alura.foro.api.infrastructure.adapter;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.PostEntity;

@Repository
public interface PostJpaRepositoryMySQL extends JpaRepository<PostEntity, Long> {

    @Query(value = """
        SELECT p FROM PostEntity p 
        LEFT JOIN p.categoryEntities pc 
        LEFT JOIN p.commentEntities c 
        WHERE (:status IS NULL OR p.status = :status) 
        AND (p.title LIKE %:query% OR p.content LIKE %:query%) 
        AND (:categories IS NULL OR pc.id IN :categories) 
        AND (:userId IS NULL OR p.userEntity.id = :userId)
        """)
    List<PostEntity> searchPosts (
        String query,
        Boolean status,
        Set<Long> categories,
        Long userId);

}