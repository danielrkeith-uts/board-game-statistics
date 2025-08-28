package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class PostgreSqlAccountRepository implements IAccountRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(String username, String password, String firstName, String lastName) {
        String sql = "INSERT INTO bgs.account(username, password, first_name, last_name) VALUES (?, ?, ?, ?);";

        jdbcTemplate.update(sql, username, password, firstName, lastName);
    }

    @Override
    public Account get(String username) {
        String sql = "SELECT * FROM bgs.account WHERE username = ?;";

        return jdbcTemplate.query(sql, Account::fromResultSet, username);
    }

}