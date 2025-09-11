package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.CreateGroupRequest;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<String> createNewGroup(@RequestBody CreateGroupRequest createGroupRequest) {
        groupService.createGroup(createGroupRequest.groupName(), createGroupRequest.creatorId());
        return ResponseEntity.ok("Group created successfully");
    }

    @GetMapping
    public ResponseEntity<List<GroupResponse>> getGroupsByAccountId(@RequestParam Integer accountId) {
        List<GroupResponse> groups = groupService.getGroupsByAccountId(accountId);
        return ResponseEntity.ok(groups);
    }
}
