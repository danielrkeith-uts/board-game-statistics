package com.asd.board_game_statistics_api.leaderboards;

import com.asd.board_game_statistics_api.group.dto.GroupMemberResponse;
import com.asd.board_game_statistics_api.leaderboards.dto.GameResponse;

import java.util.List;

public interface ILeaderboardService {
    List<GameResponse> getOwnedGames(int groupId);
    List<GroupMemberResponse> getGroupMembersPlayedGame(int groupId, int gameId);
}
