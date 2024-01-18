package com.alura.foro.api.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateCommentDTO(

	@NotNull(message = "Error al encontrar la publicación")
	Long postId,

    @Size(min = 8, max = 140, message = "El contenido debe tener 8 a 140 caracteres")
	@NotBlank(message = "Campo contenido no puede estar vacío")
	String content
    
) {}
