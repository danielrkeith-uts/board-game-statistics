package com.asd.board_game_statistics_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class PostgreSqlDbManagementService implements IDbManagementService {

    private static final String CREATE_USER_TABLE = "CREATE TABLE person (username varchar(100), password varchar(100))";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void createTables() {
        jdbcTemplate.execute(CREATE_USER_TABLE);
    }

    @Override
    public void dropTables() {

    }
}
