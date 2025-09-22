package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.CreateGroupRequest;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.group.dto.LeaveGroupRequest;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewGroup(@AuthenticationPrincipal Account account, @RequestBody CreateGroupRequest createGroupRequest) {
        try {
            GroupResponse group = groupService.createGroup(createGroupRequest.groupName(), account.id());
            return ResponseEntity.ok(group);
        } catch (GroupException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getGroupsByAccountId(@AuthenticationPrincipal Account account) {
        try {
            List<GroupResponse> groups = groupService.getGroupsByAccountId(account.id());
            return ResponseEntity.ok(groups);
        } catch (GroupException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/leave")
    public ResponseEntity<?> leaveGroup(@AuthenticationPrincipal Account account, @RequestBody LeaveGroupRequest leaveGroupRequest) {
        try {
            groupService.leaveGroup(account, leaveGroupRequest.groupId());
            return ResponseEntity.ok("Left group successfully");
        } catch (GroupException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
