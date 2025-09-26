package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.account.AccountService;
import com.asd.board_game_statistics_api.group.GroupService;
import com.asd.board_game_statistics_api.invitation.dto.JoinGroupRequest;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Invitation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import com.asd.board_game_statistics_api.util.EmailService;
import com.asd.board_game_statistics_api.invitation.dto.InvitationRequest;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class InvitationController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private InvitationService invitationService;
    @Autowired
    private GroupService groupService;

    @PostMapping("/api/invite/send")
    public ResponseEntity<?> SendInvitation(@RequestBody InvitationRequest invitationRequest){
        invitationService.createInvitation(invitationRequest.email(), invitationRequest.group());
        Invitation invite = invitationService.getInvitationByEmailAndGroup(invitationRequest.email(), invitationRequest.group());
        emailService.sendEmail(invite.user_email(), "t5337271@gmail.com", "Invitation Code", String.valueOf(invite.invite_code()));
        return ResponseEntity.ok("Invite Sent");
    }

    @PostMapping("/api/invite/join")
    public ResponseEntity<?> JoinGroup(@RequestBody JoinGroupRequest joinGroupRequest) {
        if(invitationService.checkInvitationExistsByCode(joinGroupRequest.inviteCode())){
            //Add user to group table (check for implementation)
            //  Get invitation
            Invitation invitation = invitationService.getInvitationByCode(joinGroupRequest.inviteCode());
            //  Get user id
            Account account = accountService.account(invitation.user_email());
            int userId = account.id();
            //  Get group id
            int groupId = invitation.group_id();
            //  Add row to group membership table
            groupService.addGroupMember(groupId, userId);
            //  Delete invitation from invitation table
            invitationService.deleteInvitationByCode(joinGroupRequest.inviteCode());
            return ResponseEntity.ok("Group Joined");
        }
        return ResponseEntity.status(401).body("Invitation Not Found");
    }
}