package com.alura.foro.api.infrastructure.adapter;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.PostEntity;

@Repository
public interface PostJpaRepositoryMySQL extends JpaRepository<PostEntity, Long> {

    @Query(value = """
        FROM PostEntity p
        LEFT JOIN p.categoryEntities pc
        LEFT JOIN p.commentEntities c
        WHERE (p.title ILIKE %:query% OR p.content ILIKE %:query%)
            AND (:status IS NULL OR p.status=:status)
            AND (:categories IS NULL OR pc.id in :categories)
            AND (:userId IS NULL OR p.userEntity.id = :userId)
    """)
    Page<PostEntity> searchPosts (
        String query, 
        Boolean status,
        Set<Long> categories,
        Long userId,
        Pageable pageable);

}