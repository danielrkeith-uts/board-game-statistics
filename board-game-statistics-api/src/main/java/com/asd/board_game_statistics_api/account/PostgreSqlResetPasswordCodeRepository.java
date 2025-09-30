package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.ResetPasswordCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PostgreSqlResetPasswordCodeRepository implements IResetPasswordCodeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void create(int accountId, int code) {
        String sql = "INSERT INTO bgs.reset_password_code(account_id, code) VALUES (?, ?);";

        jdbcTemplate.update(sql, accountId, code);
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
