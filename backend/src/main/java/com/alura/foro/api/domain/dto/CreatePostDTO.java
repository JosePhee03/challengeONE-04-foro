package com.alura.foro.api.domain.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePostDTO(

		@Size(min = 8, max = 160, message = "El titulo debe tener 8 a 160 caracteres") @NotBlank(message = "Campo titulo no puede estar vacío") String title,

		@Size(min = 8, max = 225, message = "El contenido debe tener 8 a 225 caracteres") @NotBlank(message = "Campo contenido no puede estar vacío") String content,

		@Size(min = 1, message = "El campo categoria debe contener al menos una categoria") Set<Long> categories) {
}
