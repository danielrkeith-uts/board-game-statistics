package com.asd.board_game_statistics_api.invitation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import com.asd.board_game_statistics_api.util.EmailService;
import com.asd.board_game_statistics_api.invitation.dto.InvitationRequest;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class InvitationController {

    @Autowired
    EmailService emailService;

    @PostMapping("/api/invite/send")
    public ResponseEntity<?> SendInvitation(@RequestBody InvitationRequest invitationRequest){
        emailService.sendEmail("aaron.falco2@gmail.com", "aaron.falco2@gmail.com", "Invitation Code", "Body");
        return ResponseEntity.ok("Invite Sent");
    }

    @PostMapping("/api/invite/join")
    public ResponseEntity<?> JoinGroup(@RequestBody InvitationRequest invitationRequest){

        return ResponseEntity.ok("Group Joined");
    }
}