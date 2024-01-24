package com.alura.foro.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pagination {
    
    private int page;
    private int size;
    private Direction direction;

}
