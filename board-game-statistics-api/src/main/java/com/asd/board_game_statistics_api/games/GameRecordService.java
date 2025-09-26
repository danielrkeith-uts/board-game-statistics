package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import com.asd.board_game_statistics_api.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.List;

@Service
public class GameRecordService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public GameRecordResponse recordGame(Account account, GameRecordRequest request) {
        validateRequest(request);

        // Insert header
        String insertHeader = "INSERT INTO bgs.game_record (group_id, game_id, played_at, win_condition, num_teams, notes) VALUES (?, ?, NOW(), ?, ?, ?) RETURNING id, played_at";
        var header = jdbcTemplate.queryForObject(insertHeader, (rs, rowNum) -> new Object[]{rs.getInt("id"), rs.getTimestamp("played_at").toInstant().toString()},
                request.groupId(), request.gameId(), request.winCondition(), request.numTeams(), request.notes());
        int recordId = (int) header[0];
        String playedAtIso = (String) header[1];

        // Insert players
        if (request.winCondition().equals("team")) {
            for (int i = 0; i < request.playerIds().size(); i++) {
                Integer accountId = request.playerIds().get(i);
                Integer team = request.teamAssignments().get(i);
                boolean isWinner = String.valueOf(team).equals(request.winner());
                jdbcTemplate.update("INSERT INTO bgs.game_record_player (record_id, account_id, team_number, is_winner) VALUES (?, ?, ?, ?)",
                        recordId, accountId, team, isWinner);
            }
        } else {
            for (Integer accountId : request.playerIds()) {
                boolean isWinner = String.valueOf(accountId).equals(request.winner());
                jdbcTemplate.update("INSERT INTO bgs.game_record_player (record_id, account_id, team_number, is_winner) VALUES (?, ?, NULL, ?)",
                        recordId, accountId, isWinner);
            }
        }

        return new GameRecordResponse(
                recordId,
                request.groupId(),
                request.gameId(),
                playedAtIso != null ? playedAtIso : Instant.now().toString(),
                request.winCondition(),
                request.numTeams(),
                request.notes(),
                request.playerIds(),
                request.teamAssignments(),
                request.winner()
        );
    }

    public List<GameRecordResponse> getRecordsForGroup(Account account, int groupId) {
        String sql = "SELECT id, group_id, game_id, played_at, win_condition, num_teams, notes FROM bgs.game_record WHERE group_id = ? ORDER BY played_at DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapRecord(rs), groupId);
    }

    public void deleteRecord(Account account, int recordId) {
        jdbcTemplate.update("DELETE FROM bgs.game_record WHERE id = ?", recordId);
    }

    private GameRecordResponse mapRecord(ResultSet rs) throws SQLException {
        int recordId = rs.getInt("id");
        int groupId = rs.getInt("group_id");
        int gameId = rs.getInt("game_id");
        String dateIso = rs.getTimestamp("played_at").toInstant().toString();
        String winCondition = rs.getString("win_condition");
        Integer numTeams = (Integer) rs.getObject("num_teams");
        String notes = rs.getString("notes");

        // Fetch players for this record
        String ps = "SELECT account_id, team_number, is_winner FROM bgs.game_record_player WHERE record_id = ?";
        List<Integer> playerIds = jdbcTemplate.query(ps, (r, i) -> r.getInt("account_id"), recordId);
        List<Integer> teamAssignments = jdbcTemplate.query(ps, (r, i) -> {
            Object t = r.getObject("team_number");
            return t == null ? null : ((Number) t).intValue();
        }, recordId);

        String winner = null;
        if ("single".equals(winCondition)) {
            String ws = "SELECT account_id FROM bgs.game_record_player WHERE record_id = ? AND is_winner = TRUE LIMIT 1";
            Integer w = jdbcTemplate.query(ws, rs2 -> rs2.next() ? rs2.getInt(1) : null, recordId);
            winner = w == null ? null : String.valueOf(w);
        } else if ("team".equals(winCondition)) {
            String ws = "SELECT team_number FROM bgs.game_record_player WHERE record_id = ? AND is_winner = TRUE LIMIT 1";
            Integer w = jdbcTemplate.query(ws, rs2 -> rs2.next() ? (Integer) rs2.getObject(1) : null, recordId);
            winner = w == null ? null : String.valueOf(w);
        }

        return new GameRecordResponse(recordId, groupId, gameId, dateIso, winCondition, numTeams, notes, playerIds, teamAssignments, winner);
    }

    private void validateRequest(GameRecordRequest request) {
        if (request.groupId() <= 0) throw new IllegalArgumentException("groupId required");
        if (request.gameId() <= 0) throw new IllegalArgumentException("gameId required");
        if (request.playerIds() == null || request.playerIds().isEmpty())
            throw new IllegalArgumentException("At least one player");
        if (request.winCondition() == null || (!request.winCondition().equals("single") && !request.winCondition().equals("team")))
            throw new IllegalArgumentException("Invalid win condition");
        if (request.winCondition().equals("team")) {
            if (request.numTeams() == null || request.numTeams() < 2)
                throw new IllegalArgumentException("numTeams >= 2 required for team mode");
            if (request.teamAssignments() == null || request.teamAssignments().size() != request.playerIds().size())
                throw new IllegalArgumentException("All players must have a team");
        } else {
            if (request.winner() == null || request.winner().isEmpty())
                throw new IllegalArgumentException("Winner required for single mode");
        }
    }
}


