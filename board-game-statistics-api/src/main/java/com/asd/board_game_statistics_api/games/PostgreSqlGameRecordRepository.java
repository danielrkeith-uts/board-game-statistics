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
        String insertPlayedGame = "INSERT INTO bgs.playedGame (gameId, groupId, datePlayed) VALUES (?, ?, ?) RETURNING playedGameId, datePlayed";
        var playedGame = jdbcTemplate.queryForObject(insertPlayedGame, (rs, rowNum) -> new Object[]{
            rs.getInt("playedGameId"), 
            rs.getDate("datePlayed").toLocalDate()
        }, request.gameId(), request.groupId(), LocalDate.parse(request.datePlayed()));

        int playedGameId = (int) playedGame[0];
        LocalDate datePlayed = (LocalDate) playedGame[1];

        // Insert player results
        for (int i = 0; i < request.playerIds().size(); i++) {
            Integer accountId = request.playerIds().get(i);
            Integer points = request.points().get(i);
            String playerTeam = request.playerTeams().get(i);
            Boolean hasWon = request.hasWon().get(i);

            jdbcTemplate.update(
                "INSERT INTO bgs.playerResult (playedGameId, accountId, points, playerTeam, hasWon) VALUES (?, ?, ?, ?, ?)",
                playedGameId, accountId, points, playerTeam, hasWon
            );
        }

        return new GameRecordResponse(
            playedGameId,
            request.groupId(),
            request.gameId(),
            datePlayed.format(DateTimeFormatter.ISO_LOCAL_DATE),
            request.notes(),
            request.playerIds(),
            request.points(),
            request.playerTeams(),
            request.hasWon()
        );
    }

    @Override
    public List<GameRecordResponse> getGameRecordsByGroup(int groupId) {
        String sql = "SELECT playedGameId, gameId, groupId, datePlayed FROM bgs.playedGame WHERE groupId = ? ORDER BY datePlayed DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapPlayedGame(rs), groupId);
    }

    @Override
    public void deleteGameRecord(int playedGameId) {
        jdbcTemplate.update("DELETE FROM bgs.playedGame WHERE playedGameId = ?", playedGameId);
    }

    private GameRecordResponse mapPlayedGame(ResultSet rs) throws SQLException {
        int playedGameId = rs.getInt("playedGameId");
        int gameId = rs.getInt("gameId");
        int groupId = rs.getInt("groupId");
        String datePlayed = rs.getDate("datePlayed").toLocalDate().format(DateTimeFormatter.ISO_LOCAL_DATE);

        // Fetch player results for this played game
        String playerResultsSql = "SELECT accountId, points, playerTeam, hasWon FROM bgs.playerResult WHERE playedGameId = ? ORDER BY accountId";
        List<Integer> playerIds = jdbcTemplate.query(playerResultsSql, (r, i) -> r.getInt("accountId"), playedGameId);
        List<Integer> points = jdbcTemplate.query(playerResultsSql, (r, i) -> {
            Object p = r.getObject("points");
            return p == null ? null : ((Number) p).intValue();
        }, playedGameId);
        List<String> playerTeams = jdbcTemplate.query(playerResultsSql, (r, i) -> r.getString("playerTeam"), playedGameId);
        List<Boolean> hasWon = jdbcTemplate.query(playerResultsSql, (r, i) -> r.getBoolean("hasWon"), playedGameId);

        return new GameRecordResponse(
            playedGameId,
            groupId,
            gameId,
            datePlayed,
            null,
            playerIds,
            points,
            playerTeams,
            hasWon
        );
    }
}
