package com.asd.board_game_statistics_api.account;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootTest
public class PasswordEncoderTests {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    void testEncodeAndMatch() {
        String rawPassword = "password123";

        String encodedPassword = passwordEncoder.encode(rawPassword);

        Assertions.assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));
    }

    @Test
    void testEncodeAndDoNotMatch() {
        String rawPasswordA = "password123";
        String rawPasswordB = "password456";

        String encodedPasswordB = passwordEncoder.encode(rawPasswordB);

        Assertions.assertFalse(passwordEncoder.matches(rawPasswordA, encodedPasswordB));
    }

}
