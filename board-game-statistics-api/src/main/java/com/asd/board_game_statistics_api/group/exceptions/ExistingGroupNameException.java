package com.asd.board_game_statistics_api.group.exceptions;

public class ExistingGroupNameException extends GroupException {
    public ExistingGroupNameException() {
        super("Group name is already taken.");
    }
}
