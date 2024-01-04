package com.alura.foro.api.infrastructure.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class Pagination {
    
    private Pagination () {}

    public static <T> Page<T> convert(List<T> list, Pageable pageable) {
        int offset = (int) pageable.getOffset();
        int end = Math.min((offset + pageable.getPageSize()), list.size());
        List<T> pageList;
        if (offset > end) pageList = new ArrayList<>();
        else pageList = list.subList(offset, end);
        return new PageImpl<>(pageList, pageable, list.size());
    }

}
