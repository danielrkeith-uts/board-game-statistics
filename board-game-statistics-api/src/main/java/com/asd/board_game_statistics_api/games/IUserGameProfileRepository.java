package com.asd.board_game_statistics_api.games;

public interface IUserGameProfileRepository {
    String getWinCondition(int accountId, int gameId);
    String getCustomWinCondition(int accountId, int gameId);
    void upsertProfile(int accountId, int gameId, String winCondition, String customWinCondition);
    void deleteProfile(int accountId, int gameId);
}

