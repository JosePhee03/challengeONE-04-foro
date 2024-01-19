package com.alura.foro.api.infrastructure.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseErrorMessage {

    private String error;

}
