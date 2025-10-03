package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import java.util.List;

public interface IGameRepository {
    List<Game> getAll();
    Game getById(int id);
    Game getByName(String name);
    Game create(String name, String publisher);
}






