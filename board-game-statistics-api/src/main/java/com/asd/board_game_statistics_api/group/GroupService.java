package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.account.dto.MeResponse;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService implements IGroupService {
    @Autowired PostgreSqlGroupRepository groupRepository;
    @Autowired PostgreSqlGroupMembershipRepository groupMembershipRepository;

    @Override
    public void createGroup(String groupName, int creatorId) {
        Instant creationTime = Instant.now();
        String defaultPermissionsString = "00000000";

        int groupId = groupRepository.create(groupName, creationTime);
        groupMembershipRepository.create(groupId, creatorId, defaultPermissionsString);
    }

    @Override
    public List<GroupResponse> getGroupsByAccountId(int accountId) {
        List<Group> groups = groupRepository.get(accountId);
        List<GroupResponse> groupResponses = new ArrayList<>();

        // Map list of Group objects to GroupResponse objects that contain a list of members
        for (Group group : groups) {
            List<MeResponse> groupMembers = groupMembershipRepository.getGroupMembers(group.id());

            groupResponses.add(new GroupResponse(group.id(), group.groupName(), group.creationTime(), groupMembers));
        }

        return groupResponses;
    }
}
