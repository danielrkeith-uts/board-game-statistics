package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.Permission;

import java.util.EnumSet;

public interface IPermissionsRepository {

    EnumSet<Permission> getPermissions(int accountId, int groupId);

}
