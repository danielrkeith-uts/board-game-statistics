package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.test_utils.TestsWithMockedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.mockito.Mockito;

public class AccountServiceTests extends TestsWithMockedDatabase {

    @Autowired
    private AccountService accountService;

    @Autowired
    private PostgreSqlAccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void doesChangePasswordActuallyChangePassword() throws Exception {
        // Use a fresh account to avoid any interference from seeded test data
        String email = "temp.pwdchange@test.com";
        String currentPassword = "test#123456";
        String newPassword = "NewPass#123";

        accountService.createAccount(email, currentPassword, "Temp", "User");

        Account created = accountRepository.get(email);
        Mockito.when(passwordEncoder.matches(currentPassword, created.password())).thenReturn(true);

        accountService.changePassword(email, currentPassword, newPassword);

        Account updated = accountRepository.get(email);
        Assertions.assertNotNull(updated);
        Assertions.assertNotEquals(currentPassword, updated.password());
    }

    @Test
    void doesDeleteAccountActuallyDeleteAccount() throws Exception {
        String email = "temp.delete@test.com";
        accountService.createAccount(email, "test#123456", "Temp", "Delete");
        Assertions.assertNotNull(accountRepository.get(email));

        accountService.deleteAccount(email);

        Assertions.assertNull(accountRepository.get(email));
    }

    @Test
    void doesEmailChangeActuallyChangeEmail() throws Exception {
        String oldEmail = "dave@example.com";
        String newEmail = "dave.renamed@example.com";

        accountService.updateAccount(oldEmail, "Dave", "Brown", newEmail);

        Assertions.assertNull(accountRepository.get(oldEmail));
        Account updated = accountRepository.get(newEmail);
        Assertions.assertNotNull(updated);
        Assertions.assertEquals("Dave", updated.firstName());
        Assertions.assertEquals("Brown", updated.lastName());
    }

    @Test
    void doesChangeFirstAndLastNameUpdateNames() throws Exception {
        String email = "eve@example.com";

        accountService.updateAccount(email, "Evelyn", "Doe", null);

        Account updated = accountRepository.get(email);
        Assertions.assertNotNull(updated);
        Assertions.assertEquals("Evelyn", updated.firstName());
        Assertions.assertEquals("Doe", updated.lastName());
    }
}


