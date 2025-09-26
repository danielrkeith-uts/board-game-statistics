package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import com.asd.board_game_statistics_api.util.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;

public class EmailServiceTests extends TestsWithMockedDatabase {
    @Autowired
    EmailService emailService;

    @Test
    public void emailServiceTests() {
        Assertions.assertDoesNotThrow(() -> {
            emailService.sendEmail("test@example.com", "t5337271@gmail.com", "Test Send Email", "Test test");
        });
    }
}
