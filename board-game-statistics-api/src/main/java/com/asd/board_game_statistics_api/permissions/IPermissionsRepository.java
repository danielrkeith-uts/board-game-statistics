package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.AccountPermissions;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;

import java.util.EnumSet;
import java.util.List;

public interface IPermissionsRepository {

    EnumSet<Permission> getPermissionsForGroup(int accountId, int groupId);

    List<GroupPermissions> getAllGroupPermissions(int accountId);

    List<AccountPermissions> getAllAccountPermissions(int groupId);
}
