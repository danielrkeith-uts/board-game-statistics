package com.asd.board_game_statistics_api.statistics.dto;

import java.util.List;

public record PieChartData(List<String> gameNames, List<Integer> numOfGames) { }
