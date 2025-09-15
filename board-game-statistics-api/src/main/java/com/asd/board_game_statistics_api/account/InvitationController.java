package com.asd.board_game_statistics_api.account;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import com.asd.board_game_statistics_api.util.EmailService;
import com.asd.board_game_statistics_api.account.dto.SendInvitationRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@RestController
@RequestMapping("/api/invite")
public class InvitationController {

    @Autowired
    EmailService emailService;

    private void testSendEmail() {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("noreply@boardgamestats.com");
        message.setTo("aaron.falco2@gmail.com");
        message.setSubject("Test");
        message.setText("Testy testy test. Test test test.");

        //emailService.sendEmail(message);
    }

    @PostMapping("/send")
    public ResponseEntity<?> SendInvitation(@RequestBody SendInvitationRequest sendInvitationRequest){
        //emailService.testSendEmail();
        return ResponseEntity.ok("Invite Sent");
    }
}