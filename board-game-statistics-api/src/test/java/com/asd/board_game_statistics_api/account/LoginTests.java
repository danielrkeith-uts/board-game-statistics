package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

public class LoginTests extends TestsWithMockedDatabase {

    private static final String USERNAME = "alice@example.com";
    private static final String PASSWORD = "test#123456";

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testDbManagerLoadsByUsernameAndPassword() {
        UserDetails userDetails = userDetailsService.loadUserByUsername(USERNAME);
        Assertions.assertTrue(passwordEncoder.matches(PASSWORD, userDetails.getPassword()));
    }

    @Test
    void testAuthenticationManagerAuthenticatesSuccessfully() {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(USERNAME, PASSWORD);
        Assertions.assertDoesNotThrow(() -> {
            authenticationManager.authenticate(auth);
        });
    }

    @Test
    void testAuthenticationManagerDeniesAuthentication() {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(USERNAME, "incorrectPassword");
        Assertions.assertThrows(AuthenticationException.class, () -> {
            authenticationManager.authenticate(auth);
        });
    }
}
