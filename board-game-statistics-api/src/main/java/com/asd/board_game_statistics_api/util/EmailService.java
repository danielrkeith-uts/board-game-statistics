package com.asd.board_game_statistics_api.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService{

    @Autowired
    private JavaMailSender emailSender;

    @Value("${BGS_MAIL_USERNAME}")
    private String mailFrom;

    public void sendEmail(String to, String subject, String text) {
        sendEmail(to, mailFrom, subject, text);
    }

    private void sendEmail(String to, String from, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
    }
}