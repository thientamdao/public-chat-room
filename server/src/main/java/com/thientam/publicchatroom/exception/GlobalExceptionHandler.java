package com.thientam.publicchatroom.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Custom Exceptions -------------------

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<String> handleApiException(ApiException exception) {
        return ResponseEntity.status(exception.getCode()).body(exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        var messages = new ArrayList<String>();
        exception.getAllErrors().forEach(error -> messages.add(error.getDefaultMessage()));
        return messages.toString();
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException exception) {
        return exception.getMessage();
    }

    // System Exceptions -------------------

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleBadCredentialsException(BadCredentialsException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Wrong login information";
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleExpiredJwtException(ExpiredJwtException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Expired JWT";
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleUnsupportedJwtException(UnsupportedJwtException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Unsupported JWT";
    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleMalformedJwtException(MalformedJwtException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Malformed protected header JSON";
    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleSignatureException(SignatureException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Invalid JWT signature";
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleJwtException(JwtException exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        return "Unexpected JWT error";
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception exception) {
        logger.error(exception.getClass() + ": " + exception.getMessage());
        exception.printStackTrace();
        return "Internal server error";
    }

}
