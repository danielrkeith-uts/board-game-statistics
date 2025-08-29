package com.asd.board_game_statistics_api.account.exceptions;

public class InvalidEmailException extends CreateAccountException {

    public InvalidEmailException() {
        super("Invalid email");
    }

}
