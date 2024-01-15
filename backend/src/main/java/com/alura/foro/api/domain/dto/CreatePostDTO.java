package com.alura.foro.api.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreatePostDTO(
    @Size(min = 8, max = 80, message = "El titulo debe tener 8 a 80 caracteres")
	@NotBlank(message = "Campo titulo no puede estar vacío")
	String title,

	@Size(min = 8, max = 140, message = "El contenido debe tener 8 a 140 caracteres")
	@NotBlank(message = "Campo contenido no puede estar vacío")
	String content,

	@NotNull(message = "Las categorias no puede ser nulo")
    @Size(min = 1, message = "El conjunto debe contener al menos una categoria")
    int[] categories
) {}
