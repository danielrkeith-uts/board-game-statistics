package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.model.Group;

import java.time.Instant;
import java.util.List;

public interface IGroupRepository {
    int create(String groupName, Instant creationTime);
    List<Group> get();
    List<Group> get(int userId);
}
