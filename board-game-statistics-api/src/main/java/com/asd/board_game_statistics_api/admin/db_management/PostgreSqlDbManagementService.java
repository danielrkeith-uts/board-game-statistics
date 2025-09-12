package com.asd.board_game_statistics_api.admin.db_management;

import com.asd.board_game_statistics_api.util.ResourceReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PostgreSqlDbManagementService implements IDbManagementService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ResourceReader resourceReader;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void rebuildSchema() {
        String rebuildSchemaSql;
        try {
            rebuildSchemaSql = resourceReader.getResourceAsString("postgresql/rebuild_schema.sql");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        jdbcTemplate.execute(rebuildSchemaSql);
    }

    @Override
    public void insertSampleData() {
        String insertSampleDataSql;

        try {
            insertSampleDataSql = resourceReader.getResourceAsString("postgresql/insert_sample_data.sql");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Sample password to be inserted with sample accounts
        String samplePassword = "test#123456";
        String hashedPassword = passwordEncoder.encode(samplePassword);

        // Passing in the same password for every test account - I could not think of a nicer way to pass in the passwords other than passing it in 8 times
        jdbcTemplate.update(insertSampleDataSql, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword);
    }
}
