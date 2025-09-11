package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.model.Group;

import java.util.List;

public interface IGroupService {
    void createGroup(String groupName, int creatorId);
    List<GroupResponse> getGroupsByAccountId(int accountId);
}
