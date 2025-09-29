package com.asd.board_game_statistics_api.statistics.dto;

public record PlayerStatisticResponse(Integer numOfGamesPlayed, Integer wins, Integer losses) {
}
