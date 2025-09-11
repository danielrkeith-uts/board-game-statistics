package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class GroupService implements IGroupService {
    @Autowired PostgreSqlGroupRepository groupRepository;
    @Autowired PostgreSqlGroupMembershipRepository groupMembershipRepository;

    @Override
    public void createGroup(String groupName, int creatorId) {
        Instant creationTime = Instant.now();
        byte[] defaultPermissionsString = new byte[] { (byte)0b00000000 };

        int groupId = groupRepository.create(groupName, creationTime);
        groupMembershipRepository.create(groupId, creatorId, defaultPermissionsString);
    }

    @Override
    public List<Group> getGroupsByUserId(int userId) {
        return groupRepository.get(userId);
    }
}
