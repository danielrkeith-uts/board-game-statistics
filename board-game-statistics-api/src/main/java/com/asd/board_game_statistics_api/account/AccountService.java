package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.*;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.ResetPasswordCode;
import com.asd.board_game_statistics_api.util.EmailService;
import com.asd.board_game_statistics_api.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IAccountRepository accountRepository;
    @Autowired
    private IResetPasswordCodeRepository resetPasswordCodeRepository;
    @Autowired
    private EmailService emailService;
    private final Random random = new Random();

    @Override
    public void createAccount(String email, String password, String firstName, String lastName) throws CreateAccountException {
        if (accountRepository.get(email) != null) {
            throw new EmailTakenException();
        }

        if (!Validator.isValidEmail(email)) {
            throw new InvalidEmailException();
        }

        if (!Validator.isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        String hashedPassword = passwordEncoder.encode(password);

        accountRepository.create(email, hashedPassword, firstName, lastName);
    }

    @Override
    public void sendPasswordReset(String email) throws AccountDoesNotExistException {
        Account account = accountRepository.get(email);

        if (account == null) {
            throw new AccountDoesNotExistException();
        }

        // Destroy other codes first so only one exists for the account
        resetPasswordCodeRepository.destroyAccountCodes(account.id());

        int min = 100_000;
        int max = 999_999;
        int code = random.nextInt(max - min + 1) + min;

        resetPasswordCodeRepository.create(account.id(), code);

        emailService.sendEmail(email, "Reset password code", "Reset password code: " + code);
    }

    @Override
    public boolean checkPasswordResetCode(int code, String email) {
        ResetPasswordCode resetPasswordCode = resetPasswordCodeRepository.get(code);
        Account account = accountRepository.get(email);

        return resetPasswordCode != null && resetPasswordCode.isValid() && resetPasswordCode.accountId() == account.id();
    }

    @Override
    public void resetPassword(int code, String email, String password) throws InvalidResetPasswordCodeException {
        if (!checkPasswordResetCode(code, email)) {
            throw new InvalidResetPasswordCodeException();
        }

        if (!Validator.isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        accountRepository.updatePassword(email, passwordEncoder.encode(password));

        Account account = accountRepository.get(email);
        resetPasswordCodeRepository.destroyAccountCodes(account.id());
    }

    @Override
    public Account account(String email) {
        return accountRepository.get(email);
    }

    @Override
    public void updateAccount(String email, String firstName, String lastName, String newEmail) throws Exception {
        if (newEmail != null && !newEmail.equals(email)) {
            if (accountRepository.get(newEmail) != null) {
                throw new Exception("Email is already taken");
            }
            if (!Validator.isValidEmail(newEmail)) {
                throw new Exception("Invalid email format");
            }
        }
        accountRepository.update(email, firstName, lastName, newEmail);
    }

    @Override
    public void changePassword(String email, String currentPassword, String newPassword) throws Exception {
        Account account = accountRepository.get(email);
        if (account == null) {
            throw new Exception("Account not found");
        }
        
        if (!passwordEncoder.matches(currentPassword, account.password())) {
            throw new Exception("Current password is incorrect");
        }
        

        if (!Validator.isValidPassword(newPassword)) {
            throw new Exception("Invalid new password");
        }
        
        String hashedNewPassword = passwordEncoder.encode(newPassword);
        accountRepository.updatePassword(email, hashedNewPassword);
    }

    @Override
    public void deleteAccount(String email) throws Exception {
        Account account = accountRepository.get(email);
        if (account == null) {
            throw new Exception("Account not found");
        }
        accountRepository.delete(email);
    }

}