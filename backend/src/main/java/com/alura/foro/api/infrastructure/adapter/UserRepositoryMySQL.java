package com.alura.foro.api.infrastructure.adapter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.alura.foro.api.domain.dto.ResponseUserDTO;
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
    public List<ResponseUserDTO> getAllUsers() {
        List<UserEntity> userEntities = this.userJpaRepository.findAll();
        List<ResponseUserDTO> userDTOs = new ArrayList<>();


       for (UserEntity userEntity : userEntities) {
            userDTOs.add(UserMapper.toResponseUserDTO(userEntity));
       }

        return userDTOs;
    }

    @Override
    public ResponseUserDTO getUser(Long id) {
        UserEntity userEntity = this.userJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return UserMapper.toResponseUserDTO(userEntity);
    }

    @Override
    public ResponseUserDTO createUser(User user) {
        
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(user.getPassword());
        userEntity.setImage(user.getImage());
        userEntity.setRole(user.getRole());

        UserEntity saveUserEntity = this.userJpaRepository.save(userEntity);

        return UserMapper.toResponseUserDTO(saveUserEntity);
    }

    @Override
    public ResponseUserDTO updateUser(Long id, String username, String image) {
        
        UserEntity userEntity = this.userJpaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        userEntity.setUsername(username);
        userEntity.setImage(image);

        UserEntity saveUserEntity = this.userJpaRepository.save(userEntity);

        return UserMapper.toResponseUserDTO(saveUserEntity);

    }


    
}
