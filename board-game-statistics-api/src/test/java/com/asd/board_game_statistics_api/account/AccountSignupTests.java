package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;
import com.asd.board_game_statistics_api.account.exceptions.EmailTakenException;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AccountSignupTests extends TestsWithMockedDatabase {

    @Autowired
    private AccountService accountService;

    @Autowired
    private PostgreSqlAccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void createAccount_persistsAndHashesPassword() throws Exception {
        String email = "signup" + System.currentTimeMillis() + "@test.com"; // no '+'
        String rawPassword = "Str0ng#123";
        String first = "Sign";
        String last = "Up";
    
        accountService.createAccount(email, rawPassword, first, last);
    
        Account created = accountRepository.get(email);
        Assertions.assertNotNull(created, "Account should be persisted");
        Assertions.assertNotEquals(rawPassword, created.password(), "Password must be hashed");
        Assertions.assertTrue(passwordEncoder.matches(rawPassword, created.password()), "Hashed password must match");
        Assertions.assertEquals(first, created.firstName());
        Assertions.assertEquals(last, created.lastName());
    }

    @Test
    void createAccount_duplicateEmail_throwsEmailTaken() throws Exception {
        String email = "signup.duplicate@example.com";
        String pass = "Str0ng#123";

        try {
            accountService.createAccount(email, pass, "Dup", "User");
        } catch (EmailTakenException ignored) {
        }

        Assertions.assertThrows(EmailTakenException.class, () ->
                accountService.createAccount(email, pass, "Dup", "User")
        );
    }

    @Test
    void createAccount_invalidEmail_throwsCreateAccountException() {
        String badEmail = "not-an-email";
        Assertions.assertThrows(CreateAccountException.class, () ->
                accountService.createAccount(badEmail, "Str0ng#123", "Bad", "Email")
        );
    }

    @Test
    void createAccount_weakPassword_throwsCreateAccountException() {
        String email = "signup.weak+" + System.currentTimeMillis() + "@example.com";
        // intentionally weak/short
        Assertions.assertThrows(CreateAccountException.class, () ->
                accountService.createAccount(email, "123", "Weak", "Pwd")
        );
    }
}