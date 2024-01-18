package com.alura.foro.api.infrastructure.mapper;

import com.alura.foro.api.domain.dto.ResponseUserDTO;
import com.alura.foro.api.infrastructure.entity.UserEntity;

public class UserMapper {

    public static ResponseUserDTO toResponseUserDTO(UserEntity userEntity) {

        ResponseUserDTO userDTO = new ResponseUserDTO();

        userDTO.setId(userEntity.getId());
        userDTO.setUsername(userEntity.getUsername());
        userDTO.setImage(userEntity.getImage());


        return userDTO;
    }

}
