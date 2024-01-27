package com.alura.foro.api.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthRequest (
    
    @Size(min = 3, max = 30, message = "El nombre de usuario debe tener de 3 a 30 caracteres")
	@NotBlank(message = "El nombre de usuario no puede estar vació")
	String username,

	@Size(min = 8, max = 50, message = "La contraceña debe tener de 8 a 50 caracteres")
    @NotBlank(message = "La contraseña no puede estar vacia") 
	String password

) {}
