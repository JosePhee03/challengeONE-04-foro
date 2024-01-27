package com.alura.foro.api.infrastructure.exeption;

public class DuplicateEntryException extends RuntimeException{

    public DuplicateEntryException(String s) {
        super(s);
    }
    
}
