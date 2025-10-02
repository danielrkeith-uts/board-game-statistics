package com.asd.board_game_statistics_api.exceptions;

public class InvalidPermissionsException extends RuntimeException {
    public InvalidPermissionsException() {
        super("Logged in user does not have permissions for this action");
    }
}
