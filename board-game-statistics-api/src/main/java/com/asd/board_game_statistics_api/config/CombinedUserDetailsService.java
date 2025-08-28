package com.asd.board_game_statistics_api.config;

import com.asd.board_game_statistics_api.account.IAccountRepository;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CombinedUserDetailsService implements UserDetailsService {

    private final DbUserDetailsService dbService;
    private final InMemoryAdminService adminService;

    public CombinedUserDetailsService(
            IAccountRepository accountRepository,
            PasswordEncoder passwordEncoder,
            @Value("${BGS_ADMIN_PASSWORD}") String adminPassword
    ) {
        this.dbService = new DbUserDetailsService(accountRepository);
        this.adminService = new InMemoryAdminService(passwordEncoder, adminPassword);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return dbService.loadUserByUsername(username);
        } catch (UsernameNotFoundException ex) {
            return adminService.loadUserByUsername(username);
        }
    }

    private static class DbUserDetailsService implements UserDetailsService {

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

            return User.withUsername(account.username())
                    .password(account.password())
                    .roles("USER")
                    .build();
        }

    }

    private static class InMemoryAdminService implements UserDetailsService {

        private final UserDetails admin;

        public InMemoryAdminService(PasswordEncoder passwordEncoder, String adminPassword) {
            String encodedPassword = passwordEncoder.encode(adminPassword);

            this.admin = User.withUsername("admin")
                    .password(encodedPassword)
                    .roles("ADMIN")
                    .build();
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            if (username.equals("admin")) {
                return admin;
            }
            throw new UsernameNotFoundException("User not found");
        }
    }
}