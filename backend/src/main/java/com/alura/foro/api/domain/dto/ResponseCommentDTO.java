package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseCommentDTO {

	Long id;
	Long postId;
	String content;
	LocalDateTime dateCreated;
	ResponseUserDTO user;

}