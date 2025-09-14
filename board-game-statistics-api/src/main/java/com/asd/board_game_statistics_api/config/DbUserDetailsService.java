package com.asd.board_game_statistics_api.config;

import com.asd.board_game_statistics_api.account.IAccountRepository;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DbUserDetailsService implements UserDetailsService {

    private final IAccountRepository accountRepository;

    public DbUserDetailsService(IAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.get(username);

        if (account == null) {
            throw new UsernameNotFoundException("Account not found");
        }

        return account;
    }

}