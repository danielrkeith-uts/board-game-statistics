package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;
import com.asd.board_game_statistics_api.account.exceptions.InvalidEmailException;
import com.asd.board_game_statistics_api.account.exceptions.InvalidPasswordException;
import com.asd.board_game_statistics_api.account.exceptions.EmailTakenException;
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

}