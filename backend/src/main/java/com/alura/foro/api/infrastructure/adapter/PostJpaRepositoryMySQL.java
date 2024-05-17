package com.alura.foro.api.infrastructure.adapter;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.PostEntity;

@Repository
public interface PostJpaRepositoryMySQL extends JpaRepository<PostEntity, Long> {

    // @Query("""
    //     SELECT p FROM PostEntity p 
    //     LEFT JOIN p.categoryEntities pc 
    //     LEFT JOIN p.commentEntities c 
    //     WHERE (:status IS NULL OR p.status = :status) 
    //     AND (:query IS NULL OR p.title LIKE % || :query || % OR p.content LIKE % || :query || %) 
    //     AND (:categories IS NULL OR pc.id IN :categories) 
    //     AND (:userId IS NULL OR p.userEntity.id = :userId)
    //     """)
    // Page<PostEntity> searchPosts (
    //     @Param("query") String query,
    //     @Param("status") Boolean status,
    //     @Param("categories") Set<Long> categories,
    //     @Param("userId") Long userId,
    //     @Param("size") int pagination,
    //     @Param("page") int page);

        @Query(value = "SELECT DISTINCT p.id " +
                    "FROM post p " +
                    "LEFT JOIN post_categories pc ON pc.post_id = p.id " +
                    "WHERE (:status IS NULL OR p.status = :status) " +
                    "AND (p.title ILIKE %:query% OR p.content ILIKE %:query%) " +
                    "AND (:categories IS NULL OR pc.category_id IN (:categories)) " +
                    "AND (:userId IS NULL OR p.user_id = :userId)",
           countQuery = "SELECT DISTINCT COUNT(p.id) " +
                        "FROM post p " +
                        "LEFT JOIN post_categories pc ON pc.post_id = p.id " +
                        "WHERE (:status IS NULL OR p.status = :status) " +
                        "AND (p.title ILIKE %:query% OR p.content ILIKE %:query%) " +
                        "AND (:categories IS NULL OR pc.category_id IN (:categories)) " +
                        "AND (:userId IS NULL OR p.user_id = :userId)",
           nativeQuery = true)
    Page<Long> searchPostIds(
        @Param("query") String query,
        @Param("status") Boolean status,
        @Param("categories") List<?> categories,
        @Param("userId") Long userId,
        Pageable pageable
        );
}