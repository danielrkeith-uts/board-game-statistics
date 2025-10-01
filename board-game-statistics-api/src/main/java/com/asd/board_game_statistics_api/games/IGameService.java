package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import java.util.List;

public interface IGameService {
    List<Game> allGames();
    List<Game> ownedGames(int accountId);
    void addOwned(int accountId, int gameId);
    void removeOwned(int accountId, int gameId);

    Game createOrAddOwnedWithProfile(
        int accountId,
        String name,
        String publisher,
        String winCondition,
        String customWinCondition
    );
}