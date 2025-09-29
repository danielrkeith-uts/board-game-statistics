package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
    public Invitation getInvitationByCode(int inviteCode) {
        String sqlStatement = "SELECT * FROM bgs.invitation WHERE inviteCode = ?";
        return jdbcTemplate.query(sqlStatement, Invitation::fromResultSet, inviteCode);
    }
    @Override
    public Invitation getInvitationByEmailAndGroup(String user_email, int group_id) {
        String sqlStatement = "SELECT * FROM bgs.invitation WHERE user_email = ? AND group_id = ?";
        return jdbcTemplate.query(sqlStatement, Invitation::fromResultSet, user_email, group_id);
    }

    @Override
    public void deleteInvitationByCode(int inviteCode) {
        String sqlStatement = "DELETE FROM bgs.invitation WHERE inviteCode = ?";
        jdbcTemplate.update(sqlStatement, inviteCode);
    }

    @Override
    public boolean checkInvitationExistsByCode(String code) {
        int inviteCode = Integer.valueOf(code);
        String sqlStatement = "SELECT COUNT(*) FROM bgs.invitation WHERE inviteCode = ?";
        int count = jdbcTemplate.queryForObject(sqlStatement, Integer.class, inviteCode);
        return count > 0;
    }

    @Override
    public boolean checkInvitationExistsByEmailAndGroup(String email, String group_id) {
        String sqlStatement = "SELECT COUNT(*) FROM bgs.invitation WHERE user_email = ?";
        int count = jdbcTemplate.queryForObject(sqlStatement, Integer.class, email);
        return count > 0;
    }
}
