package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.ResetPasswordCode;
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

    @Override
    public ResetPasswordCode get(int code) {
        String sql = "SELECT * FROM bgs.reset_password_code WHERE code = ?;";

        return jdbcTemplate.query(sql, ResetPasswordCode::fromResultSet, code);
    }

    @Override
    public void destroyAccountCodes(int accountId) {
        String sql = "DELETE FROM bgs.reset_password_code WHERE account_id = ?;";

        jdbcTemplate.update(sql, accountId);
    }
}
