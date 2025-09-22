package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PostgreSqlAccountRepository implements IAccountRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(String email, String password, String firstName, String lastName) {
        String sql = "INSERT INTO bgs.account(email, password, first_name, last_name) VALUES (?, ?, ?, ?);";

        jdbcTemplate.update(sql, email, password, firstName, lastName);
    }

    @Override
    public Account get(String email) {
        String sql = "SELECT * FROM bgs.account WHERE email = ?;";

        return jdbcTemplate.query(sql, Account::fromResultSet, email);
    }

    @Override
    public void update(String email, String firstName, String lastName, String newEmail) {
        if (newEmail != null && !newEmail.equals(email)) {
            String sql = "UPDATE bgs.account SET email = ?, first_name = ?, last_name = ? WHERE email = ?;";
            jdbcTemplate.update(sql, newEmail, firstName, lastName, email);
        } else {
            String sql = "UPDATE bgs.account SET first_name = ?, last_name = ? WHERE email = ?;";
            jdbcTemplate.update(sql, firstName, lastName, email);
        }
    }

    @Override
    public void updatePassword(String email, String newPassword) {
        String sql = "UPDATE bgs.account SET password = ? WHERE email = ?;";
        jdbcTemplate.update(sql, newPassword, email);
    }

    @Override
    public void delete(String email) {
        String sql = "DELETE FROM bgs.account WHERE email = ?;";
        jdbcTemplate.update(sql, email);
    }

}