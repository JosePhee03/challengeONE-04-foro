package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;

import com.alura.foro.api.domain.model.Comment;

import lombok.Getter;

@Getter
public class ResponseCommentDTO {

	String content;
	LocalDateTime dateCreated;
	ResponseUserDTO user;

	public ResponseCommentDTO (Comment comment) {
		this.content = comment.getContent();
		this.dateCreated = comment.getDateCreated();
		this.user = new ResponseUserDTO(comment.getUser());
	}

}
