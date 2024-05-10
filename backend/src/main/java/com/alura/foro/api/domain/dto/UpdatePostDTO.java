package com.alura.foro.api.domain.dto;

import java.util.Set;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;

public record UpdatePostDTO (
    
    @Size(min = 8, max = 80, message = "El titulo debe tener 8 a 80 caracteres")
    @Nullable
	String title,

	@Size(min = 8, max = 140, message = "El contenido debe tener 8 a 140 caracteres")
    @Nullable
	String content,

    @Size(min = 1, message = "El conjunto debe contener al menos una categoria")
    @Nullable
    Set<Long> categories,

    @Nullable
    Boolean status

) {}
