package com.asd.board_game_statistics_api.account.exceptions;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;

public class CreateAccountException extends HttpBadRequestException {
    public CreateAccountException(String message) {
        super(message);
    }
}
