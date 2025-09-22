package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserDetailsServiceTests extends TestsWithMockedDatabase {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testLoadUserByUsernameAndPasswordForLogin() {
        String email = "alice@example.com";
        String password = "test#123456";

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        Assertions.assertTrue(passwordEncoder.matches(password, userDetails.getPassword()));
    }
}
