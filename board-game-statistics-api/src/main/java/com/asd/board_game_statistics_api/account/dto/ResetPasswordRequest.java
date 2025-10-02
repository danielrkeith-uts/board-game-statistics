package com.asd.board_game_statistics_api.account.dto;

public record ResetPasswordRequest(int code, String email, String password) { }
