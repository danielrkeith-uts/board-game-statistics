package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupMemberResponse;

import java.time.Instant;
import java.util.List;

public interface IGroupMembershipRepository {
    void create(int groupId, int accountId, String permissionsString, Instant joinTimestamp);
    List<GroupMemberResponse> getGroupMembers(int groupId);
    boolean delete(int groupId, int accountId);
}
