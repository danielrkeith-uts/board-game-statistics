package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionsController {

    @Autowired
    private IPermissionsService permissionsService;

    @GetMapping
    public ResponseEntity<List<GroupPermissions>> getPermissions(@AuthenticationPrincipal Account account) {
        return ResponseEntity.ok(permissionsService.getPermissions(account.id()));
    }
}
