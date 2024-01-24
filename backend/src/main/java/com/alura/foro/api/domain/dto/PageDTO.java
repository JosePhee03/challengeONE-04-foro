package com.alura.foro.api.domain.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageDTO<T> {
    
    private List<T> content;
    private int page;
    private int size;
	private Long offset;
	private Boolean last;
	private int numberOfElements;
	private Boolean first;
	private Boolean empty;
	private Long total;

}
