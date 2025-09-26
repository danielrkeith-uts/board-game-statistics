package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameRecordController {
    @Autowired
    private GameRecordService gameRecordService;

    @PostMapping("/record")
    public ResponseEntity<?> recordGame(
            @AuthenticationPrincipal Account account,
            @RequestBody GameRecordRequest request
    ) {
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
}


