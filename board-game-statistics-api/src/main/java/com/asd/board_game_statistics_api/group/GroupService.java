package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.group.dto.GroupMemberResponse;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.group.exceptions.EmptyGroupException;
import com.asd.board_game_statistics_api.group.exceptions.ExistingGroupNameException;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Group;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;

@Service
public class GroupService implements IGroupService {
    @Autowired PostgreSqlGroupRepository groupRepository;
    @Autowired PostgreSqlGroupMembershipRepository groupMembershipRepository;

    @Override
    public GroupResponse createGroup(String groupName, int creatorId) throws GroupException {
        if (!Validator.isValidGroupName(groupName)) {
            throw new GroupException("Group name is invalid.");
        }

        String caseInsensitiveGroupName = groupName.toLowerCase();

        // Check if the requested group name exists in the database, irrespective of case
        for (String groupNameFromDatabase : groupRepository.getAllGroupNames()) {
            if (groupNameFromDatabase.toLowerCase().equals(caseInsensitiveGroupName)) {
                throw new ExistingGroupNameException();
            }
        }

        Instant creationTime = Instant.now();

        // Give no permissions by default
        EnumSet<Permission> permissions = EnumSet.noneOf(Permission.class);

        int groupId = groupRepository.create(groupName, creationTime);
        groupMembershipRepository.create(groupId, creatorId, permissions, creationTime);

        return getGroupByGroupId(groupId);
    }

    public GroupResponse getGroupByGroupId(int groupId) throws GroupException {
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

        if (groups.isEmpty()) {
            return new ArrayList<>();
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
        GroupResponse group = getGroupByGroupId(groupId);

        // Confirm the group exists
        if (group == null) {
            throw new EmptyGroupException("The group with groupId " + groupId + " does not exist.");
        }

        List<GroupMemberResponse> groupMembers = group.members();

        // Confirm the group has members
        if (groupMembers == null) {
            throw new EmptyGroupException("The group with groupId " + groupId + " has no members.");
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

        // Check if a group has one member only
        if (groupMembers.size() == 1) {
            throw new EmptyGroupException("Leaving this group is not allowed as you are the last member.");
        }

        // Leave a group
        if (!groupMembershipRepository.delete(groupId, account.id())) {
            throw new GroupException("Failed to leave group.");
        }
    }

    @Override
    public boolean belongsToGroup(int accountId, int groupId) {
        List<Group> groups = groupRepository.getByAccountId(accountId);
        for (Group group : groups) {
            if (group.id() == groupId) {
                return true;
            }
        }
        return false;
    }
}
