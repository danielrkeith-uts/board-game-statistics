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
    public void invitationProcessedCorrectly() {
        try{
            String testEmail = "aaron.falco2@gmail.com";
            String testGroupId = "1";
            int accountId = 22;
            invitationService.createInvitation(testEmail, testGroupId);
            Invitation invitation = invitationService.getInvitationByEmailAndGroup(testEmail, testGroupId);
            invitationService.joinGroup(String.valueOf(invitation.invite_code()));
            Boolean invitationDeleted = !invitationService.checkInvitationExistsByEmailAndGroup(testEmail, testGroupId);
            Boolean groupJoined = groupService.belongsToGroup(accountId, invitation.group_id());
            Assertions.assertTrue(invitationDeleted && groupJoined);
        }
        catch (Exception e){
            Assertions.fail(e.getMessage());
        }
    }
}
