package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Service;

@Service
public class PostgreSqlInvitationRepository implements IInvitationRespository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void createInvitation(String user_email, int group_id) {
        String sqlStatement = "INSERT INTO invitation (user_email, group_id) VALUES (?, ?)";
        jdbcTemplate.update(sqlStatement, user_email, group_id);
    }
    public Invitation getInvitation(String user_email, int group_id) {
        return null;
    }
}
