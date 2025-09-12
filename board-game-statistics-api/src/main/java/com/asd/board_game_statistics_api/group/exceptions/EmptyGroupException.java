package com.asd.board_game_statistics_api.group.exceptions;

public class EmptyGroupException extends GroupException {
    public EmptyGroupException() {
        super("Leaving this group is not allowed as you are the last member.");
    }
}
