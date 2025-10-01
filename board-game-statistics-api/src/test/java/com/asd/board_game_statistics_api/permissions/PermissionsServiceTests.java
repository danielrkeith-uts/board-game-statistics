package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.permissions.exceptions.MemberDoesNotBelongToGroupException;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.EnumSet;

public class PermissionsServiceTests extends TestsWithMockedDatabase {

    @Autowired
    private PermissionsService permissionsService;

    @Test
    void testGetGroupOwner() {
        Account groupOwner = permissionsService.getGroupOwner(1);

        Assertions.assertEquals(1, groupOwner.id());
    }

    @Test
    void testSetAndGetPermissionsForGroup() {
        EnumSet<Permission> expectedPermissions = EnumSet.of(Permission.MANAGE_MEMBER_PERMISSIONS, Permission.MANAGE_MEMBERS);
        permissionsService.setPermissions(1, 1, expectedPermissions);

        EnumSet<Permission> actualPermissions = permissionsService.getPermissions(1, 1);

        Assertions.assertEquals(expectedPermissions, actualPermissions);
    }

    @Test
    void testGetPermissionsThrowsErrorIfMemberDoesNotBelongToGroup() {
        Assertions.assertThrows(
                MemberDoesNotBelongToGroupException.class,
                () -> permissionsService.getPermissions(1, 100)
        );
    }

    @Test
    void testSetPermissionsThrowsErrorIfMemberDoesNotBelongToGroup() {
        Assertions.assertThrows(
                MemberDoesNotBelongToGroupException.class,
                () -> permissionsService.setPermissions(1, 100, EnumSet.noneOf(Permission.class))
        );
    }

}
