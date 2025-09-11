package com.asd.board_game_statistics_api.group;

public interface IGroupMembershipRepository {
    void create(int groupId, int accountId, byte[] permissionsString);
}
