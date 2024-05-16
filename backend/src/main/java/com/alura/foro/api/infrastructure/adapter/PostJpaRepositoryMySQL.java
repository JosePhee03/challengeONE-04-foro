package com.alura.foro.api.infrastructure.adapter;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.PostEntity;

@Repository
public interface PostJpaRepositoryMySQL extends JpaRepository<PostEntity, Long> {

    @Query(value = """
        SELECT p.*
        FROM post p
        LEFT JOIN post_categories pc ON p.id = pc.post_id
        LEFT JOIN comment c ON p.id = c.post_id
        WHERE (:status IS NULL OR p.status = :status)
            AND (p.title ILIKE %:query% OR p.content ILIKE %:query%)
            AND (:categories IS NULL OR pc.category_id IN (:categories))
            AND (:userId IS NULL OR p.user_id = :userId);
        """, nativeQuery = true)
    Page<PostEntity> searchPosts (
        @Param("query") String query, 
        @Param("status") Boolean status,
        @Param("categories") Set<Long> categories,
        @Param("userId") Long userId,
        Pageable pageable);

}