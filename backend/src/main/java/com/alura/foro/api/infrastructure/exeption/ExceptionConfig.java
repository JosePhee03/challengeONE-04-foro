package com.alura.foro.api.infrastructure.exeption;

import java.io.IOException;
import java.util.Set;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionConfig {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, BadCredentialsException e) {
        String message = "Credenciales inválidas. Por favor, verifique su nombre de usuario y contraseña e intente nuevamente.";

        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.UNAUTHORIZED, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, ConstraintViolationException e) {

        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        StringBuilder errors = new StringBuilder();

        constraintViolations.forEach(r -> errors.append(r.getMessage())

        );

        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.BAD_REQUEST, errors.toString(), request.getRequestURI());

        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, HttpMessageNotReadableException e) {
        String message = "Error en la solicitud. Verifique el formato y los datos proporcionados.";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.BAD_REQUEST, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, DataIntegrityViolationException e) {
        String message = "Su solicitud no cumple con la integridad de los datos";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.CONFLICT, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        StringBuilder errors = new StringBuilder();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            errors.append(fieldError.getDefaultMessage() + "; ");
        }

        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                e.getStatusCode(), errors.toString(), request.getRequestURI());

        return new ResponseEntity<>(errorMessage, e.getStatusCode());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, ResourceNotFoundException e) {
        String message = e.getMessage();
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.NOT_FOUND, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request,
            HttpMediaTypeNotSupportedException e) {
        String message = "El Content-Type " + e.getContentType() + " no es valido.";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                e.getStatusCode(), message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, e.getStatusCode());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request,
            MethodArgumentTypeMismatchException e) {
        String message = "El recurso /" + e.getName() + " no permite el valor '" + e.getValue() + "'.";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.BAD_REQUEST, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, NoResourceFoundException e) {
        String message = "El recurso /" + e.getResourcePath() + " no encontrado.";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                e.getStatusCode(), message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, e.getStatusCode());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request,
            HttpRequestMethodNotSupportedException e) {
        String message = "Metodo de petición no permitido";
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                e.getStatusCode(), message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, e.getStatusCode());
    }

    @ExceptionHandler(DuplicateEntryException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, DuplicateEntryException e)
            throws IOException {
        String message = e.getMessage();
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.CONFLICT, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnauthorizedOperationException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, UnauthorizedOperationException e)
            throws IOException {
        String message = e.getMessage();
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.FORBIDDEN, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, InternalAuthenticationServiceException e) throws IOException {
        String message = e.getMessage();
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.BAD_REQUEST, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseErrorMessage> handle(HttpServletRequest request, Exception e) throws IOException {
        String message = "Error interno del servidor " + e;
        ResponseErrorMessage errorMessage = new ResponseErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR, message, request.getRequestURI());
        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
