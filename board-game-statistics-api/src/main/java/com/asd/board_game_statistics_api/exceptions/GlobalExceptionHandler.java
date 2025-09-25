package com.asd.board_game_statistics_api.exceptions;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpBadRequestException.class)
    public ResponseEntity<?> handleCreateAccountException(CreateAccountException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", ex.getClass().getSimpleName(),
                        "message", ex.getMessage()
                ));
    }

}