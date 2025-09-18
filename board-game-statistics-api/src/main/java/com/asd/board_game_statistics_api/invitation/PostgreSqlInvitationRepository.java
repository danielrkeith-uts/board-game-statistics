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
        String sqlStatement = "INSERT INTO bgs.invitation (user_email, group_id) VALUES (?, ?)";
        jdbcTemplate.update(sqlStatement, user_email, group_id);
    }
    @Override
    public Invitation getInvitationByCode(int invite_code) {
        String sqlStatement = "SELECT * FROM bgs.invitation WHERE invite_code = ?";
        return jdbcTemplate.query(sqlStatement, Invitation::fromResultSet, invite_code);
    }
    @Override
    public Invitation getInvitationByEmailAndGroup(String user_email, int group_id) {
        String sqlStatement = "SELECT * FROM bgs.invitation WHERE user_email = ? AND group_id = ?";
        return jdbcTemplate.query(sqlStatement, Invitation::fromResultSet, user_email, group_id);
    }

}
