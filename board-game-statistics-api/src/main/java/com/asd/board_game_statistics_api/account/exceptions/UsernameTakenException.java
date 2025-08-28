package com.asd.board_game_statistics_api.account.exceptions;

public class UsernameTakenException extends CreateAccountException {

    public UsernameTakenException() {
        super("An account already exists with that username");
    }

}