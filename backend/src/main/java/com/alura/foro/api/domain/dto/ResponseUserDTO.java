package com.alura.foro.api.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseUserDTO {

    Long id;
    String username;
    String image;

}
