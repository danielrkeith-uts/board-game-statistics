package com.asd.board_game_statistics_api.group;

import com.asd.board_game_statistics_api.account.AccountService;
import com.asd.board_game_statistics_api.account.PostgreSqlAccountRepository;
import com.asd.board_game_statistics_api.group.dto.GroupResponse;
import com.asd.board_game_statistics_api.group.exceptions.EmptyGroupException;
import com.asd.board_game_statistics_api.group.exceptions.ExistingGroupNameException;
import com.asd.board_game_statistics_api.group.exceptions.GroupException;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;

public class GroupControllerTests extends TestsWithMockedDatabase {
    @Autowired
    GroupService groupService;
    @Autowired
    PostgreSqlGroupRepository groupRepository;
    @Autowired
    AccountService accountService;
    @Autowired
    PostgreSqlAccountRepository accountRepository;

    @Test
    void doesGetGroupByGroupIdReturnTheCorrectGroup() {
        int testGroupId = 1;

        GroupResponse group = groupService.getGroupByGroupId(testGroupId);
        Assertions.assertEquals(testGroupId, group.id());
    }

    @Test
    void doesGetGroupByGroupIdErrorOnNonExistentGroup() {
        int testGroupId = -1;

        Assertions.assertThrows(
                GroupException.class,
                () -> groupService.getGroupByGroupId(testGroupId)
        );
    }

    @Test
    void doesGetGroupsByAccountIdReturnNullWhenAccountIsNotAMemberOfAnyGroups() {
        // Create a new test account (which inherently has no group memberships)
        String testEmail = "john@cena.com";

        accountService.createAccount(testEmail, "test#123456", "John", "Doe");
        Account testAccount = accountRepository.get(testEmail);

        Assertions.assertNull(groupService.getGroupsByAccountId(testAccount.id()));
    }

    @Test
    void doesCreateGroupReturnCorrectGroupObject() {
        String testGroupName = "TestGroup1";
        Account testAccount = accountRepository.get("alice@example.com");

        GroupResponse group = groupService.createGroup(testGroupName, testAccount.id());
        Assertions.assertEquals(testGroupName, group.groupName());
        Assertions.assertEquals(testAccount.email(), group.members().getFirst().email());
    }

    @Test
    void doesCreateGroupErrorIfGroupNameIsAlreadyTaken() {
        String testGroupName = "Board Gamers";
        Account testAccount = accountRepository.get("alice@example.com");

        Assertions.assertThrows(
                ExistingGroupNameException.class,
                () -> groupService.createGroup(testGroupName, testAccount.id())
        );
    }

    @Test
    void doesLeaveGroupCheckIfGroupExists() {
        Account testAccount = accountRepository.get("alice@example.com");
        int testGroupId = -1;

        Assertions.assertThrows(
                GroupException.class,
                () -> groupService.leaveGroup(testAccount, testGroupId)
        );
    }

    @Test
    void doesLeaveGroupCheckIfGroupHasAnyGroupMembers() {
        String testGroupName = "TestGroup1";
        Account testAccount = accountRepository.get("alice@example.com");

        // Create an empty group
        int groupId = groupRepository.create(testGroupName, Instant.now());

        Assertions.assertThrows(
                GroupException.class,
                () -> groupService.leaveGroup(testAccount, groupId)
        );
    }

    // Test leaveGroup if the user is not a member of the group, they are trying to leave
    @Test
    void doesLeaveGroupCheckIfAccountIsAMemberOfGroup() {
        int testGroupId = 2;
        Account testAccount = accountRepository.get("alice@example.com");

        Assertions.assertThrows(
                GroupException.class,
                () -> groupService.leaveGroup(testAccount, testGroupId)
        );
    }

    // Test leaveGroup if user is the last member
    @Test
    void doesLeaveGroupCheckIfAccountIsLastMemberOfGroup() {
        String testGroupName = "TestGroup1";
        Account testAccount = accountRepository.get("alice@example.com");

        GroupResponse group = groupService.createGroup(testGroupName, testAccount.id());

        Assertions.assertThrows(
                GroupException.class,
                () -> groupService.leaveGroup(testAccount, group.id())
        );
    }

    @Test
    void doesLeaveGroupActuallyLeaveGroup() {
        Account testAccount = accountRepository.get("alice@example.com");
        int testGroupId = 1;

        // Leave the test group
        groupService.leaveGroup(testAccount, testGroupId);

        // Fetch the account's groups
        List<GroupResponse> groups = groupService.getGroupsByAccountId(testAccount.id());

        // And verify they are no longer in it
        for (GroupResponse group : groups) {
            Assertions.assertNotEquals(testGroupId, group.id());
        }
    }
}
