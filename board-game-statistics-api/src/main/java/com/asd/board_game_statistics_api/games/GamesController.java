package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.CreateOwnedCustomRequest;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GamesController {

    @Autowired
    private IGameService gameService;

    @GetMapping
    public ResponseEntity<List<Game>> getCatalog() {
        return ResponseEntity.ok(gameService.allGames());
    }

    @GetMapping("/owned")
    public ResponseEntity<List<Game>> getOwned(@AuthenticationPrincipal Account account) {
        return ResponseEntity.ok(gameService.ownedGames(account.id()));
    }

    @PostMapping("/owned/{gameId}")
    public ResponseEntity<?> addOwned(
            @AuthenticationPrincipal Account account,
            @PathVariable int gameId
    ) {
        gameService.addOwned(account.id(), gameId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/owned/{gameId}")
    public ResponseEntity<?> removeOwned(
            @AuthenticationPrincipal Account account,
            @PathVariable int gameId
    ) {
        gameService.removeOwned(account.id(), gameId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/owned/custom")
    public ResponseEntity<?> createOrAddOwnedCustom(
            @AuthenticationPrincipal Account account,
            @RequestBody CreateOwnedCustomRequest req
    ) {
        try {
            Game game = gameService.createOrAddOwnedWithProfile(
                    account.id(),
                    req.name(),
                    req.publisher(),
                    req.winCondition(),
                    req.customWinCondition()
            );
            return ResponseEntity.ok(game);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}