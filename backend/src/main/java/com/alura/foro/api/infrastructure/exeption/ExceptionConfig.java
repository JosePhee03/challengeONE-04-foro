package com.alura.foro.api.infrastructure.exeption;

import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionConfig {
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<ResponseMessage>> handle(ConstraintViolationException e) {
        List<ResponseMessage> responseMessages = new ArrayList<>();
        e.getConstraintViolations().forEach(
                r -> {
                    responseMessages.add(new ResponseMessage(r.getMessage()));
                });
        return new ResponseEntity<>(responseMessages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseMessage> handle(HttpMessageNotReadableException e) {
        String errorMessage = "Error en la solicitud. Verifique el formato y los datos proporcionados.";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseMessage> handle(DataIntegrityViolationException e) {
        System.out.println(e.getLocalizedMessage());
        String errorMessage = "Su solicitud no cumple con la integridad de los datos";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ResponseMessage>> handle(MethodArgumentNotValidException e) {
        List<ResponseMessage> responseMessages = new ArrayList<>();
        e.getAllErrors().forEach(
                r -> {
                    responseMessages.add(new ResponseMessage(r.getDefaultMessage()));
                });
        return new ResponseEntity<>(responseMessages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseMessage> handle(ResourceNotFoundException e) {
        String errorMessage = e.getMessage();
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ResponseMessage> handle(HttpMediaTypeNotSupportedException e) {
        String errorMessage = "El formato de datos enviado no es compatible. Por favor, verifique y utilice un formato válido.";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

     
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseMessage> handle(MethodArgumentTypeMismatchException e) {
        String errorMessage = "El recurso /" + e.getName() + " no permite el valor '" + e.getValue()+ "'.";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseMessage> handle(NoResourceFoundException e) {
        String errorMessage = "Recurso no encontrado";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessage> handle(Exception e) {
        String errorMessage = "Error interno del servidor";
        return new ResponseEntity<>(new ResponseMessage(errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
