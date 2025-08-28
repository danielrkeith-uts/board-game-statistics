package com.asd.board_game_statistics_api.account.dto;

public record CreateAccountRequest(String username, String password, String firstName, String lastName) { }