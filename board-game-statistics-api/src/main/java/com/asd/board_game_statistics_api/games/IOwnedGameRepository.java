package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import java.util.List;

public interface IOwnedGameRepository {
    List<Game> getOwnedByAccount(int accountId);
    boolean exists(int accountId, int gameId);
    void addOwned(int accountId, int gameId);
    void removeOwned(int accountId, int gameId);
}
