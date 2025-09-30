package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.exceptions.InvalidPermissionsException;
import com.asd.board_game_statistics_api.invitation.dto.InvitationRequest;
import com.asd.board_game_statistics_api.invitation.dto.JoinGroupRequest;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Invitation;
import com.asd.board_game_statistics_api.model.Permission;
import com.asd.board_game_statistics_api.permissions.IPermissionsService;
import com.asd.board_game_statistics_api.util.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class InvitationController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private InvitationService invitationService;
    @Autowired
    private IPermissionsService permissionsService;

    @PostMapping("/api/invite/send")
    public ResponseEntity<?> SendInvitation(@AuthenticationPrincipal Account account, @RequestBody InvitationRequest invitationRequest){
        if (!permissionsService.getPermissions(account.id(), Integer.parseInt(invitationRequest.group())).contains(Permission.MANAGE_MEMBERS)) {
            throw new InvalidPermissionsException();
        }

        invitationService.createInvitation(invitationRequest.email(), invitationRequest.group());
        Invitation invite = invitationService.getInvitationByEmailAndGroup(invitationRequest.email(), invitationRequest.group());
        emailService.sendEmail(invite.user_email(), "Invitation Code", String.valueOf(invite.invite_code()));
        return ResponseEntity.ok("Invite Sent");
    }

    @PostMapping("/api/invite/join")
    public ResponseEntity<?> JoinGroup(@RequestBody JoinGroupRequest joinGroupRequest) {
        if(invitationService.joinGroup(joinGroupRequest.inviteCode())){
            return ResponseEntity.ok("Group Joined");
        }
        return ResponseEntity.status(401).body("Invitation Not Found");
    }
}