package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.group.IGroupService;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionsController {

    @Autowired
    private IPermissionsService permissionsService;
    @Autowired
    private IGroupService groupService;

    @GetMapping
    public ResponseEntity<List<GroupPermissions>> getPermissions(@AuthenticationPrincipal Account account) {
        return ResponseEntity.ok(permissionsService.getPermissions(account.id()));
    }

    @GetMapping("/group/{groupId}/owner")
    public ResponseEntity<String> getGroupOwner(@AuthenticationPrincipal Account account, @PathVariable int groupId) {
        if (!groupService.belongsToGroup(account.id(), groupId)) {
            return ResponseEntity.status(401).body("Logged in user does not belong to group");
        }

        Account owner = permissionsService.getGroupOwner(groupId);
        return ResponseEntity.ok(owner.email());
    }
}
