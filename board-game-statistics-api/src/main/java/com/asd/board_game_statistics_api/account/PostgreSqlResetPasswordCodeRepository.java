package com.asd.board_game_statistics_api.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class PostgreSqlResetPasswordCodeRepository implements IResetPasswordCodeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int create(int accountId) {
        String sql = "INSERT INTO bgs.reset_password_code(account_id) VALUES (?);";

        KeyHolder keyholder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, new String[] {"code"});

            preparedStatement.setInt(1, accountId);

            return preparedStatement;
        }, keyholder);

        Number code = keyholder.getKey();

        if (code == null) {
            return -1;
        }

        return code.intValue();
    }
}
