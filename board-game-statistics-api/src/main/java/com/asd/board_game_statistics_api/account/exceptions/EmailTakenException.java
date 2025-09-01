package com.asd.board_game_statistics_api.account.exceptions;

public class EmailTakenException extends CreateAccountException {

    public EmailTakenException() {
        super("An account already exists with that email");
    }

}