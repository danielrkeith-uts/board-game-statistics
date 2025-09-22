package com.asd.board_game_statistics_api.account.dto;

public record UpdateAccountRequest(
    String firstName,
    String lastName,
    String email
) {}
