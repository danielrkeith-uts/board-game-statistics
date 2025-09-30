package com.asd.board_game_statistics_api.account.exceptions;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;

public class AccountDoesNotExistException extends HttpBadRequestException {
    public AccountDoesNotExistException() {
        super("No account exists with that email");
    }
}
