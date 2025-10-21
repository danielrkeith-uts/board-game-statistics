package com.asd.board_game_statistics_api.statistics.dto;

import java.util.List;

public record BarChartData(List<Integer> wins, List<Integer> losses) { }
