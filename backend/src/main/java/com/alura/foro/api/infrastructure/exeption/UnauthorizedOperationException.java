package com.alura.foro.api.infrastructure.exeption;

public class UnauthorizedOperationException extends RuntimeException {
    public UnauthorizedOperationException(String s) {
        super(s);
    }
}
