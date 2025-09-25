package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.permissions.exceptions.MemberDoesNotBelongToGroupException;

import java.util.EnumSet;
import java.util.List;

public interface IPermissionsService {

    List<GroupPermissions> getPermissions(int accountId);

    Account getGroupOwner(int groupId);

    EnumSet<Permission> getPermissions(int accountId, int groupId) throws MemberDoesNotBelongToGroupException;
}
