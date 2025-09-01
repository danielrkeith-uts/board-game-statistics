package com.asd.board_game_statistics_api.account.dto;

public record CreateAccountRequest(String email, String password, String firstName, String lastName) { }