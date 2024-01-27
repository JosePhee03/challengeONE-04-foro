package com.alura.foro.api.infrastructure.exeption;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseErrorMessage {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ResponseErrorMessage (
        HttpStatusCode httpStatusCode,
        String message,
        String path
    ) {
        HttpStatus error = HttpStatus.resolve(httpStatusCode.value());
        this.timestamp = LocalDateTime.now();
        this.status = httpStatusCode.value();
        this.message = message;
        this.error = error != null ? error.getReasonPhrase() : "error";
        this.path = path;
    }

}
