package com.alura.foro.api.infrastructure.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pagination {
    
    private int page;
    private int size;
    private Direction direction;

}
