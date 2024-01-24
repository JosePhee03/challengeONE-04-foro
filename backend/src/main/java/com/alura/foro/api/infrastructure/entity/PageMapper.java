package com.alura.foro.api.infrastructure.entity;

import java.util.List;

import org.springframework.data.domain.Page;

import com.alura.foro.api.domain.dto.PageDTO;

public class PageMapper <T, S> {

    public PageDTO<T> toPageDTO (Page<S> page, List<T> content) {
        PageDTO<T> pageDTO = new PageDTO<>();

		pageDTO.setContent(content);
		pageDTO.setPage(page.getNumber());
		pageDTO.setSize(page.getSize());
		pageDTO.setOffset(page.getPageable().getOffset());
		pageDTO.setLast(page.isLast());
		pageDTO.setNumberOfElements(page.getNumberOfElements());
		pageDTO.setFirst(page.isFirst());
		pageDTO.setEmpty(page.isEmpty());
		pageDTO.setTotal(page.getTotalElements());

        return pageDTO;
   } 

}
