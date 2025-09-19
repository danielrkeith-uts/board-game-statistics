package com.asd.board_game_statistics_api.group.dto;

import java.sql.Timestamp;
import java.util.List;

public record GroupResponse(int id, String groupName, Timestamp creationTime, List<GroupMemberResponse> members) { }
