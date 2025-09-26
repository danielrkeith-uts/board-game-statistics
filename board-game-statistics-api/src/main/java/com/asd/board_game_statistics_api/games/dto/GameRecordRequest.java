package com.asd.board_game_statistics_api.games.dto;

import java.util.List;

public record GameRecordRequest(
        int groupId,
        int gameId,
        String winCondition, // 'single' | 'team'
        Integer numTeams, // required if team
        List<Integer> playerIds,
        List<Integer> teamAssignments, // parallel array to playerIds when team-based, values are 1..numTeams
        String winner, // playerId as string for single, or team number as string for team (optional)
        String notes
) {}


