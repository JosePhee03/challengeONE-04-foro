package com.alura.foro.api.domain.dto;

import java.time.ZonedDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseCommentDTO {

	Long id;
	Long postId;
	String content;
	ZonedDateTime dateCreated;
	ResponseUserDTO author;

}