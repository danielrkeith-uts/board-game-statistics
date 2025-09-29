package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.group.IGroupService;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.permissions.dto.SetPermissionsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.EnumSet;
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
        if (owner == null) {
            return ResponseEntity.status(404).body("No group owner");
        }

        return ResponseEntity.ok(owner.email());
    }

    @GetMapping("/group/{groupId}/member/{memberId}")
    public ResponseEntity<?> getGroupMemberPermissions(
            @AuthenticationPrincipal Account account,
            @PathVariable int groupId,
            @PathVariable int memberId
    ) {
        if (!groupService.belongsToGroup(account.id(), groupId)) {
            return ResponseEntity.status(401).body("Logged in user does not belong to group");
        }

        return ResponseEntity.ok(permissionsService.getPermissions(memberId, groupId));
    }

    @PutMapping("/group/{groupId}/member/{memberId}")
    public ResponseEntity<?> setGroupMemberPermissions(
            @AuthenticationPrincipal Account account,
            @PathVariable int groupId,
            @PathVariable int memberId,
            @RequestBody SetPermissionsRequest request
            ) {
        if (!groupService.belongsToGroup(account.id(), groupId)) {
            return ResponseEntity.status(401).body("Logged in user does not belong to group");
        }

        if (!permissionsService.getPermissions(account.id(), groupId).contains(Permission.MANAGE_MEMBER_PERMISSIONS)) {
            return ResponseEntity.status(401).body("Logged in user does not have permission for this action");
        }

        // Cast permissions array to EnumSet
        EnumSet<Permission> permissions = request.permissions().isEmpty()
                ? EnumSet.noneOf(Permission.class)
                : EnumSet.copyOf(request.permissions());

        permissionsService.setPermissions(memberId, groupId, permissions);
        return ResponseEntity.ok("Successfully set permissions");
    }
}
