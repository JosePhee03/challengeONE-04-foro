package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;

public record ResponseCommentDTO(

    String content,
	LocalDateTime date_created,
	ResponseUserDTO user
    
) {}
