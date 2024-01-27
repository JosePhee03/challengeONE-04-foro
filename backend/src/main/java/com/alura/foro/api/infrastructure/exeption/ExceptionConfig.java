package com.alura.foro.api.infrastructure.exeption;

import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.auth0.jwt.exceptions.TokenExpiredException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionConfig {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<ResponseErrorMessage>> handle(ConstraintViolationException e) {
        List<ResponseErrorMessage> responseErrorMessages = new ArrayList<>();
        e.getConstraintViolations().forEach(
                r -> {
                    responseErrorMessages.add(new ResponseErrorMessage(r.getMessage()));
                });
        return new ResponseEntity<>(responseErrorMessages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpMessageNotReadableException e) {
        String errorMessage = "Error en la solicitud. Verifique el formato y los datos proporcionados.";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseErrorMessage> handle(DataIntegrityViolationException e) {
        System.out.println(e.getLocalizedMessage());
        String errorMessage = "Su solicitud no cumple con la integridad de los datos";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ResponseErrorMessage>> handle(MethodArgumentNotValidException e) {
        List<ResponseErrorMessage> responseErrorMessages = new ArrayList<>();
        e.getAllErrors().forEach(
                r -> {
                    responseErrorMessages.add(new ResponseErrorMessage(r.getDefaultMessage()));
                });
        return new ResponseEntity<>(responseErrorMessages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseErrorMessage> handle(ResourceNotFoundException e) {
        String errorMessage = e.getMessage();
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpMediaTypeNotSupportedException e) {
        String errorMessage = "El formato de datos enviado no es compatible. Por favor, verifique y utilice un formato válido.";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

     
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseErrorMessage> handle(MethodArgumentTypeMismatchException e) {
        String errorMessage = "El recurso /" + e.getName() + " no permite el valor '" + e.getValue()+ "'.";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseErrorMessage> handle(NoResourceFoundException e) {
        String errorMessage = "Recurso no encontrado";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ResponseErrorMessage> handle (HttpRequestMethodNotSupportedException e) {
        String errorMessage = "Metodo de petición no permitido";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateEntryException.class)
    public ResponseEntity<ResponseErrorMessage> handle (DuplicateEntryException e) {
        String errorMessage = e.getMessage();
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseErrorMessage> handle(Exception e) {
        String errorMessage = "Error interno del servidor";
        return new ResponseEntity<>(new ResponseErrorMessage(errorMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
