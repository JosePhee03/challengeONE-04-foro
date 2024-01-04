package com.alura.foro.api.infrastructure.adapter;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.model.User;
import com.alura.foro.api.domain.port.UserRepository;
import com.alura.foro.api.infrastructure.entity.UserEntity;
import com.alura.foro.api.infrastructure.exeption.ResourceNotFoundException;
import com.alura.foro.api.infrastructure.mapper.UserMapper;

@Repository
public class UserRepositoryMySQL implements UserRepository {

    private final UserJpaRepositoryMySQL userJpaRepository;

    public UserRepositoryMySQL(UserJpaRepositoryMySQL userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities = this.userJpaRepository.findAll();
        return UserMapper.mapListToModel(userEntities);
    }

    @Override
    public User getUser(Long id) {
        UserEntity userEntity = this.userJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return UserMapper.mapToModel(userEntity);
    }

    @Override
    public User createUser(User user) {
        UserEntity userEntity = UserMapper.mapToEntity(user);
        return UserMapper.mapToModel(this.userJpaRepository.save(userEntity));
    }

    @Override
    public User updateUser(Long id, String username, String image) {
        UserEntity userEntity = this.userJpaRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        userEntity.setUsername(username);
        userEntity.setImage(image);

        return UserMapper.mapToModel(this.userJpaRepository.save(userEntity));

    }
    
}
