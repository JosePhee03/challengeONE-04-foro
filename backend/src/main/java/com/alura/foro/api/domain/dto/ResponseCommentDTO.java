package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseCommentDTO {

	String content;
	LocalDateTime dateCreated;
	ResponseUserDTO user;

}