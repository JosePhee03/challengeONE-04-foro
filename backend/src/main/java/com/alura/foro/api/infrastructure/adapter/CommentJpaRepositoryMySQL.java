package com.alura.foro.api.infrastructure.adapter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.CommentEntity;

@Repository
public interface CommentJpaRepositoryMySQL extends JpaRepository<CommentEntity, Long> {

    @Query("""
            FROM CommentEntity c
            WHERE (:postId IS NULL OR c.postEntity.id = :postId)
        """)
    Page<CommentEntity> searchComments(Long postId, Pageable pageable);
}