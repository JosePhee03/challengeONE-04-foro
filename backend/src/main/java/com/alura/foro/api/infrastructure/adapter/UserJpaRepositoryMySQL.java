package com.alura.foro.api.infrastructure.adapter;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alura.foro.api.infrastructure.entity.UserEntity;

@Repository
public interface UserJpaRepositoryMySQL extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    boolean existsByUsername(String username);

}
