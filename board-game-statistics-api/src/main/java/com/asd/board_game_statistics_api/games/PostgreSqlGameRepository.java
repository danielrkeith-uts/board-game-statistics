package com.asd.board_game_statistics_api.games;

import com.asd.board_game_statistics_api.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class PostgreSqlGameRepository implements IGameRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Game> getAll() {
        String sql = "SELECT id, name, publisher, win_condition FROM bgs.board_game ORDER BY name ASC;";
        return jdbcTemplate.query(sql, Game::fromRow);
    }

    @Override
    public Game getById(int id) {
        String sql = "SELECT id, name, publisher, win_condition FROM bgs.board_game WHERE id = ?;";
        return jdbcTemplate.query(sql, Game::fromResultSet, id);
    }

    @Override
    public Game getByName(String name) {
        String sql = "SELECT id, name, publisher, win_condition FROM bgs.board_game WHERE LOWER(name) = LOWER(TRIM(?));";
        return jdbcTemplate.query(sql, Game::fromResultSet, name);
    }

    @Override
    public Game create(String name, String publisher, String winCondition) {
        String sql = "INSERT INTO bgs.board_game (name, publisher, win_condition) VALUES (TRIM(?), ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
                ps.setString(1, name);
                ps.setString(2, publisher);
                ps.setString(3, winCondition);
                return ps;
            }, keyHolder);
        } catch (DataIntegrityViolationException dup) {
            return getByName(name);
        }

        Number key = keyHolder.getKey();
        return key != null ? getById(key.intValue()) : getByName(name);
    }
}