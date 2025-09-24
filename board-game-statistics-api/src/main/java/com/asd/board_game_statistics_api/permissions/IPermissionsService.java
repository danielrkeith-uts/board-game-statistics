package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.GroupPermissions;

import java.util.List;

public interface IPermissionsService {
    List<GroupPermissions> getPermissions(int accountId);
}
