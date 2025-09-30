package com.asd.board_game_statistics_api.leaderboards.dto;

public record GameResponse(
        int gameId,
        int groupId,
        String gameName
) {}
