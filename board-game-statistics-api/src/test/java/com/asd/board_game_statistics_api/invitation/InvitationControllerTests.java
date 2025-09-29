package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;

public class InvitationControllerTests extends TestsWithMockedDatabase {

    @Autowired
    private InvitationController invitationController;

    @Autowired
    private InvitationService invitationService;

    @Test
    public void isInvitationCreatedSuccessfully() {
        String testEmail = "test@test.com";
        String testGroupId = "1";
        invitationService.createInvitation(testEmail, testGroupId);
        Assertions.assertTrue(invitationService.checkInvitationExistsByEmailAndGroup(testEmail, testGroupId));
    }
}
