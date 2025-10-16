package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class GameService implements IGameService {
    private static final Set<String> ALLOWED_WIN_CONDITIONS = Set.of(
            "HIGH_SCORE", "LOW_SCORE", "FIRST_TO_FINISH", "COOPERATIVE"
    );

    @Autowired private IGameRepository gameRepository;
    @Autowired private IOwnedGameRepository ownedRepository;

    @Override
    public List<Game> allGames() {
        return gameRepository.getAll();
    }

    @Override
    public List<Game> ownedGames(int accountId) {
        return ownedRepository.getOwnedByAccount(accountId);
    }

    @Override
    public void addOwned(int accountId, int gameId) {
        if (ownedRepository.exists(accountId, gameId)) return;
        ownedRepository.addOwned(accountId, gameId);
    }

    @Override
    public void removeOwned(int accountId, int gameId) {
        ownedRepository.removeOwned(accountId, gameId);
    }

    @Override
    public Game createOrAddOwnedWithProfile(
            int accountId,
            String name,
            String publisher,
            String winCondition,
            String customWinCondition
    ) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Game name is required");
        }

        String normalized = (winCondition == null ? "HIGH_SCORE" : winCondition.trim().toUpperCase());
        if (!ALLOWED_WIN_CONDITIONS.contains(normalized)) {
            throw new IllegalArgumentException("Invalid win condition: " + winCondition);
        }
        if ("CUSTOM".equals(normalized)) {
            if (customWinCondition == null || customWinCondition.trim().isEmpty()) {
                throw new IllegalArgumentException("customWinCondition is required when winCondition is CUSTOM");
            }
        } else {
            customWinCondition = null;
        }

        Game game = gameRepository.getByName(name);
        if (game == null) {
            game = gameRepository.create(name, publisher, winCondition);
        }

        if (!ownedRepository.exists(accountId, game.id())) {
            ownedRepository.addOwned(accountId, game.id());
        }

        return game;
    }
}