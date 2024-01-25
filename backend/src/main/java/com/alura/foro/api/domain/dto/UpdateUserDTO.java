package com.alura.foro.api.domain.dto;

import org.hibernate.validator.constraints.URL;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserDTO (

    @Size(min = 3, max = 30, message = "El nombre de usuario debe tener de 3 a 30 caracteres")
	@NotBlank(message = "El nombre de usuario no puede estar vació")
    String username,

    @Nullable
    @URL(message = "La dirección de la imagen no es valida")
    String image

) {}
