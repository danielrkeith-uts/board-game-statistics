package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.account.dto.MeResponse;

import java.util.List;

public interface IGroupMembershipRepository {
    void create(int groupId, int accountId, String permissionsString);
    List<MeResponse> getGroupMembers(int groupId);
}
