package com.asd.board_game_statistics_api.account.exceptions;

public class InvalidPasswordException extends CreateAccountException {

    public InvalidPasswordException() {
        super("Password must be at least 8 characters long and contain a letter, number, and special character");
    }

}