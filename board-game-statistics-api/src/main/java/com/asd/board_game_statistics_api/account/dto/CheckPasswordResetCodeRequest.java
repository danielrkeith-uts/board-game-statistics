package com.asd.board_game_statistics_api.account.dto;

public record CheckPasswordResetCodeRequest(int code, String email) { }
