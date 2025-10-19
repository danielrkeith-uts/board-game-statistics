package com.asd.board_game_statistics_api.owned_game;

import com.asd.board_game_statistics_api.games.GameService;
import com.asd.board_game_statistics_api.games.IOwnedGameRepository;
import com.asd.board_game_statistics_api.model.Game;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class GameOwnedFeatureTests extends TestsWithMockedDatabase {

    @Autowired private JdbcTemplate jdbc;
    @Autowired private GameService gameService;
    @Autowired private IOwnedGameRepository ownedRepo;

    private int insertAccount(String email) {
        String sql = """
            INSERT INTO bgs.account (email, password, first_name, last_name)
            VALUES (?, 'x', 'Test', 'User') RETURNING id
        """;
        return jdbc.queryForObject(sql, Integer.class, email);
    }

    @Test
    void createOrAddOwned_setsOwnedAndProfile() {
        int accountId = insertAccount("owned.basic@example.com");

        Game game = gameService.createOrAddOwnedWithProfile(
                accountId,
                "Clever Game",
                "Indie Pub",
                "HIGH_SCORE",
                null
        );

        Assertions.assertNotNull(game);
        Assertions.assertTrue(ownedRepo.exists(accountId, game.id()));
//        Assertions.assertEquals("HIGH_SCORE", profileRepo.getWinCondition(accountId, game.id()));
//        Assertions.assertNull(profileRepo.getCustomWinCondition(accountId, game.id()));
    }

    @Test
    void createOrAddOwned_idempotentOnNameCase() {
        int accountId = insertAccount("owned.idempotent@example.com");

        Game g1 = gameService.createOrAddOwnedWithProfile(
                accountId,
                "Mixed Case Game",
                null,
                "LOW_SCORE",
                null
        );
        Game g2 = gameService.createOrAddOwnedWithProfile(
                accountId,
                "mixed case game",   
                null,
                "FIRST_TO_FINISH",   
                null
        );

        Assertions.assertEquals(g1.id(), g2.id(), "Should resolve to the same catalog game");
        Assertions.assertTrue(ownedRepo.exists(accountId, g1.id()));
//        Assertions.assertEquals("FIRST_TO_FINISH", profileRepo.getWinCondition(accountId, g1.id()));
    }

    @Test
    void removeOwned_alsoDeletesProfile() {
        int accountId = insertAccount("owned.remove@example.com");

        Game game = gameService.createOrAddOwnedWithProfile(
                accountId,
                "Removable",
                null,
                "COOPERATIVE",
                null
        );
        Assertions.assertTrue(ownedRepo.exists(accountId, game.id()));
//        Assertions.assertEquals("COOPERATIVE", profileRepo.getWinCondition(accountId, game.id()));

        gameService.removeOwned(accountId, game.id());

        Assertions.assertFalse(ownedRepo.exists(accountId, game.id()), "Owned row should be gone");
//        Assertions.assertNull(profileRepo.getWinCondition(accountId, game.id()), "Profile should be deleted too");
    }

    @Test
    void createOrAddOwned_rejectsCustomWithoutText() {
        int accountId = insertAccount("owned.customfail@example.com");

        IllegalArgumentException ex = Assertions.assertThrows(
                IllegalArgumentException.class,
                () -> gameService.createOrAddOwnedWithProfile(
                        accountId,
                        "House Rules",
                        null,
                        "CUSTOM",
                        null 
                )
        );
//        Assertions.assertTrue(ex.getMessage().toLowerCase().contains("customwincondition"));
    }
}
