package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.group.IGroupRepository;
import com.asd.board_game_statistics_api.model.Group;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

@Service
public class PermissionsService implements IPermissionsService {

    @Autowired
    private IPermissionsRepository permissionsRepository;
    @Autowired
    private IGroupRepository groupRepository;

    @Override
    public List<GroupPermissions> getPermissions(int accountId) {
        List<Group> groups = groupRepository.getByAccountId(accountId);
        List<GroupPermissions> allGroupPermissions = new ArrayList<>();

        for (Group group : groups) {
            EnumSet<Permission> permissions = permissionsRepository.getPermissions(accountId, group.id());

            allGroupPermissions.add(new GroupPermissions(group.id(), permissions));
        }

        return allGroupPermissions;
    }
}
