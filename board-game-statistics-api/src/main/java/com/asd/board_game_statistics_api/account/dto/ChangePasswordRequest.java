package com.asd.board_game_statistics_api.account.dto;

public record ChangePasswordRequest(
    String currentPassword,
    String newPassword
) {}
