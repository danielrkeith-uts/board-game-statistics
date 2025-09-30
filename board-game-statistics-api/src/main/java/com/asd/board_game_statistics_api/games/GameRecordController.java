package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.exceptions.InvalidPermissionsException;
import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.permissions.IPermissionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class GameRecordController {
    @Autowired
    private IGameRecordService gameRecordService;
    @Autowired
    private IPermissionsService permissionsService;

    @PostMapping("/record")
    public ResponseEntity<?> recordGame(
            @AuthenticationPrincipal Account account,
            @RequestBody GameRecordRequest request
    ) {
        if (!permissionsService.getPermissions(account.id(), request.groupId()).contains(Permission.MANAGE_GAMES_PLAYED)) {
            throw new InvalidPermissionsException();
        }

        GameRecordResponse response = gameRecordService.recordGame(account, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> getRecordsForGroup(
            @AuthenticationPrincipal Account account,
            @PathVariable int groupId
    ) {
        List<GameRecordResponse> records = gameRecordService.getRecordsForGroup(account, groupId);
        return ResponseEntity.ok(records);
    }

    @DeleteMapping("/record/{playedGameId}")
    public ResponseEntity<?> deleteRecord(
            @AuthenticationPrincipal Account account,
            @PathVariable int playedGameId
    ) {
        int groupId = gameRecordService.getGroupOf(playedGameId);

        if (!permissionsService.getPermissions(account.id(), groupId).contains(Permission.MANAGE_GAMES_PLAYED)) {
            throw new InvalidPermissionsException();
        }

        gameRecordService.deleteRecord(account, playedGameId);
        return ResponseEntity.ok("Deleted");
    }
}


