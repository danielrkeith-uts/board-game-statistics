package com.asd.board_game_statistics_api.account.exceptions;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;

public class InvalidResetPasswordCodeException extends HttpBadRequestException {
    public InvalidResetPasswordCodeException() {
        super("Invalid reset password code");
    }
}
