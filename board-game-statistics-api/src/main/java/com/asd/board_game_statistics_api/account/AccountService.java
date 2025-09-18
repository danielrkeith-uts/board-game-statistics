package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;
import com.asd.board_game_statistics_api.account.exceptions.InvalidEmailException;
import com.asd.board_game_statistics_api.account.exceptions.InvalidPasswordException;
import com.asd.board_game_statistics_api.account.exceptions.EmailTakenException;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.util.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IAccountRepository accountRepository;

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