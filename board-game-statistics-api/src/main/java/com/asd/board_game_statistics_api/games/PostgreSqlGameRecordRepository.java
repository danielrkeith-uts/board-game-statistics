package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;
import com.asd.board_game_statistics_api.games.dto.GameRecordResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
public class PostgreSqlGameRecordRepository implements IGameRecordRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public GameRecordResponse createGameRecord(GameRecordRequest request) {
        // Insert playedGame
        String insertPlayedGame = "INSERT INTO bgs.played_game (game_id, group_id, date_played) VALUES (?, ?, ?) RETURNING played_game_id, date_played";
        var playedGame = jdbcTemplate.queryForObject(insertPlayedGame, (rs, rowNum) -> new Object[]{
            rs.getInt("played_game_id"), 
            rs.getDate("date_played").toLocalDate()
        }, request.gameId(), request.groupId(), LocalDate.parse(request.datePlayed()));

        int playedGameId = (int) playedGame[0];
        LocalDate datePlayed = (LocalDate) playedGame[1];

        // Get game name
        String gameName = jdbcTemplate.queryForObject(
            "SELECT name FROM bgs.board_game WHERE id = ?", 
            String.class, 
            request.gameId()
        );

        // Insert player results
        for (int i = 0; i < request.playerIds().size(); i++) {
            Integer accountId = request.playerIds().get(i);
            Integer points = request.points().get(i);
            Integer playerTeam = request.playerTeams().get(i);
            Boolean hasWon = request.hasWon().get(i);

            jdbcTemplate.update(
                "INSERT INTO bgs.player_result (played_game_id, account_id, points, player_team, has_won) VALUES (?, ?, ?, ?, ?)",
                playedGameId, accountId, points, playerTeam, hasWon
            );
        }

        return new GameRecordResponse(
            playedGameId,
            request.groupId(),
            request.gameId(),
            gameName,
            datePlayed.format(DateTimeFormatter.ISO_LOCAL_DATE),
            request.playerIds(),
            request.points(),
            request.playerTeams(),
            request.hasWon()
        );
    }

    @Override
    public List<GameRecordResponse> getGameRecordsByGroup(int groupId) {
        String sql = """
            SELECT pg.played_game_id, pg.game_id, pg.group_id, pg.date_played, bg.name as game_name 
            FROM bgs.played_game pg 
            INNER JOIN bgs.board_game bg ON pg.game_id = bg.id 
            WHERE pg.group_id = ? 
            ORDER BY pg.date_played DESC
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapPlayedGame(rs), groupId);
    }

    @Override
    public void deleteGameRecord(int playedGameId) {
        jdbcTemplate.update("DELETE FROM bgs.played_game WHERE played_game_id = ?", playedGameId);
    }

    @Override
    public int getGroupOf(int playedGameId) {
        String sql = "SELECT group_id FROM bgs.played_game WHERE played_game_id = ?;";

        Integer groupId = jdbcTemplate.queryForObject(sql, Integer.class, playedGameId);

        if (groupId == null) {
            return -1;
        }

        return groupId;
    }

    private GameRecordResponse mapPlayedGame(ResultSet rs) throws SQLException {
        int playedGameId = rs.getInt("played_game_id");
        int gameId = rs.getInt("game_id");
        int groupId = rs.getInt("group_id");
        String gameName = rs.getString("game_name");
        String datePlayed = rs.getDate("date_played").toLocalDate().format(DateTimeFormatter.ISO_LOCAL_DATE);

        // Fetch player results for this played game
        String playerResultsSql = "SELECT account_id, points, player_team, has_won FROM bgs.player_result WHERE played_game_id = ? ORDER BY account_id";
        List<Integer> playerIds = jdbcTemplate.query(playerResultsSql, (r, i) -> r.getInt("account_id"), playedGameId);
        List<Integer> points = jdbcTemplate.query(playerResultsSql, (r, i) -> {
            Object p = r.getObject("points");
            return p == null ? null : ((Number) p).intValue();
        }, playedGameId);
        List<Integer> playerTeams = jdbcTemplate.query(playerResultsSql, (r, i) -> {
            Object team = r.getObject("player_team");
            return team == null ? null : ((Number) team).intValue();
        }, playedGameId);
        List<Boolean> hasWon = jdbcTemplate.query(playerResultsSql, (r, i) -> r.getBoolean("has_won"), playedGameId);

        return new GameRecordResponse(
            playedGameId,
            groupId,
            gameId,
            gameName,
            datePlayed,
            playerIds,
            points,
            playerTeams,
            hasWon
        );
    }
}
