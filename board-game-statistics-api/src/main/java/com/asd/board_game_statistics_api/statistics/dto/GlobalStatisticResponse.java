package com.asd.board_game_statistics_api.statistics.dto;

import java.util.List;

public record GlobalStatisticResponse(BarChartData barChartData, PieChartData pieChartData, TableData tableData) {
    private record BarChartData(List<Integer> wins, List<Integer> losses) {}
    private record PieChartData() {}
    private record TableData(Integer numOfGamesPlayed, float winRate) {}
}
