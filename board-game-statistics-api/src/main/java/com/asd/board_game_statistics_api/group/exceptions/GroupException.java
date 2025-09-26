package com.asd.board_game_statistics_api.group.exceptions;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;

public class GroupException extends HttpBadRequestException {
    public GroupException(String message) {
        super(message);
    }
}
