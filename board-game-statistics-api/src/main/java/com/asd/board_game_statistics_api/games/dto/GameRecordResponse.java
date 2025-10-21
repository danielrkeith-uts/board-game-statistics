package com.asd.board_game_statistics_api.games.dto;

import java.util.List;

public record GameRecordResponse(
        int playedGameId,
        int groupId,
        int gameId,
        String gameName,
        String datePlayed,
        List<Integer> playerIds,
        List<Integer> points,
        List<Integer> playerTeams,
        List<Boolean> hasWon
) {}


