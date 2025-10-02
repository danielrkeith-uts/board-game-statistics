package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.group.GroupService;
import com.asd.board_game_statistics_api.model.Invitation;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;

public class InvitationControllerTests extends TestsWithMockedDatabase {

    @Autowired
    private InvitationService invitationService;
    @Autowired
    private GroupService groupService;

    @Test
    public void isInvitationCreatedSuccessfully() {
        String testEmail = "test@test.com";
        String testGroupId = "1";
        invitationService.createInvitation(testEmail, testGroupId);
        Assertions.assertTrue(invitationService.checkInvitationExistsByEmailAndGroup(testEmail, testGroupId));
    }

    @Test
    public void isMemberAddedSuccessfully() {
        int userId = 22;
        int groupId = 1;
        invitationService.joinGroup(userId, groupId);
        Assertions.assertTrue(groupService.belongsToGroup(userId, groupId));
    }

    @Test
    public void isInvitationDeleted() {
        String testEmail = "aaron.falco2@gmail.com";
        String testGroupId = "1";
        invitationService.createInvitation(testEmail, testGroupId);
        String inviteCode = String.valueOf(invitationService.getInvitationByEmailAndGroup(testEmail, testGroupId).invite_code());
        invitationService.joinGroup(inviteCode);
        Assertions.assertFalse(invitationService.checkInvitationExistsByCode(inviteCode));
    }
}
