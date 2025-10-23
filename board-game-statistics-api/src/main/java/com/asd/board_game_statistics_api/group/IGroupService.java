package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.model.Account;

import java.util.List;

public interface IGroupService {

    GroupResponse createGroup(String groupName, int creatorId);

    List<GroupResponse> getGroupsByAccountId(int accountId);

    void leaveGroup(Account account, int groupId);

    boolean belongsToGroup(int accountId, int groupId);

    void addGroupMember(int accountId, int groupId);

    void removeGroupMember(int accountId, int groupId);
}
