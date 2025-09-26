package com.asd.board_game_statistics_api.permissions.exceptions;

import com.asd.board_game_statistics_api.exceptions.HttpBadRequestException;

public class MemberDoesNotBelongToGroupException extends HttpBadRequestException {
    public MemberDoesNotBelongToGroupException() {
        super("Member does not belong to group");
    }
}
