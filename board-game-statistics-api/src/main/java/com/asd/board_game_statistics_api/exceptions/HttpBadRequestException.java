package com.asd.board_game_statistics_api.exceptions;

public class HttpBadRequestException extends RuntimeException {
    public HttpBadRequestException(String message) {
        super(message);
    }
}
