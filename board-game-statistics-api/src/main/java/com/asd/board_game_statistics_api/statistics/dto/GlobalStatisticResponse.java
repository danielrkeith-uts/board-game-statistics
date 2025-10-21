package com.asd.board_game_statistics_api.statistics.dto;

public record GlobalStatisticResponse(BarChartData barChartData, PieChartData pieChartData, TableData tableData) { }
