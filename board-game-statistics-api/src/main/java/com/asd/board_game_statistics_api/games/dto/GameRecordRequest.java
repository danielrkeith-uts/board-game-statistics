package com.asd.board_game_statistics_api.games.dto;

import java.util.List;

public record GameRecordRequest(
        int groupId,
        int gameId,
        String datePlayed, 
        List<Integer> playerIds,
        List<Integer> points,
        List<String> playerTeams, 
        List<Boolean> hasWon
) {}


