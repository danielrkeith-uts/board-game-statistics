package com.asd.board_game_statistics_api.games.dto;

import java.util.List;

public record GameRecordResponse(
        int recordId,
        int groupId,
        int gameId,
        String dateIso,
        String winCondition,
        Integer numTeams,
        String notes,
        List<Integer> playerIds,
        List<Integer> teamAssignments,
        String winner
) {}


