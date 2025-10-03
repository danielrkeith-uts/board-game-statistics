package com.asd.board_game_statistics_api.games.dto;

public record CreateOwnedCustomRequest(
        String name,
        String publisher,
        String winCondition,
        String customWinCondition
) { }