package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupMemberResponse;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.group.exceptions.EmptyGroupException;
import com.asd.board_game_statistics_api.group.exceptions.ExistingGroupNameException;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class GroupService implements IGroupService {
    @Autowired PostgreSqlGroupRepository groupRepository;
    @Autowired PostgreSqlGroupMembershipRepository groupMembershipRepository;

    @Override
    public GroupResponse createGroup(String groupName, int creatorId) throws GroupException {
        // If group name is already taken
        if (groupRepository.getByGroupName(groupName) != null) {
            throw new ExistingGroupNameException();
        }

        Instant creationTime = Instant.now();
        // TODO Replace this to integrate with the permissions feature
        String defaultPermissionsString = "00000000";

        int groupId = groupRepository.create(groupName, creationTime);
        groupMembershipRepository.create(groupId, creatorId, defaultPermissionsString, creationTime);

        return getGroupByGroupId(groupId);
    }

    private GroupResponse getGroupByGroupId(int groupId) throws GroupException {
        Group group = groupRepository.getByGroupId(groupId);

        if (group == null) {
            throw new GroupException("Failed to find group with id " + groupId);
        }

        List<GroupMemberResponse> groupMembers = groupMembershipRepository.getGroupMembers(groupId);

        return new GroupResponse(groupId, group.groupName(), group.creationTime(), groupMembers);
    }

    @Override
    public List<GroupResponse> getGroupsByAccountId(int accountId) {
        List<Group> groups = groupRepository.getByAccountId(accountId);

        if (groups == null) {
            throw new GroupException("Failed to find groups for accountId " + accountId);
        }

        // Map list of Group objects to GroupResponse objects that contain a list of members
        List<GroupResponse> groupResponses = new ArrayList<>();

        for (Group group : groups) {
            List<GroupMemberResponse> groupMembers = groupMembershipRepository.getGroupMembers(group.id());

            groupResponses.add(new GroupResponse(group.id(), group.groupName(), group.creationTime(), groupMembers));
        }

        return groupResponses;
    }

    @Override
    public void leaveGroup(Account account, int groupId) throws GroupException {
        // Confirm group membership
        List<GroupMemberResponse> groupMembers = groupMembershipRepository.getGroupMembers(groupId);

        if (groupMembers == null) {
            throw new GroupException("The group with groupId " + groupId + " either does not exist or has no members.");
        }

        boolean isMember = false;
        for (GroupMemberResponse groupMember : groupMembers) {
            if (Objects.equals(groupMember.email(), account.email())) {
                isMember = true;
                break;
            }
        }

        if (!isMember) {
            throw new GroupException("User is not a member of the group with groupId " + groupId);
        }

        // Check if group has one member only
        if (groupMembers.size() == 1) {
            throw new EmptyGroupException();
        }

        // Leave group
        if (!groupMembershipRepository.delete(groupId, account.id())) {
            throw new GroupException("Failed to leave group.");
        }
    }
}
