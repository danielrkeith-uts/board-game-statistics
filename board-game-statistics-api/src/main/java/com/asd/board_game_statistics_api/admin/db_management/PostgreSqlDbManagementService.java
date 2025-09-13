package com.asd.board_game_statistics_api.admin.db_management;

import com.asd.board_game_statistics_api.util.ResourceReader;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
@AllArgsConstructor
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

        // Sample password to be inserted with all sample accounts
        String samplePassword = "test#123456";
        String hashedPassword = passwordEncoder.encode(samplePassword);

        // Count the number of account rows being inserted
        String accountInsertQuery = insertSampleDataSql.split(";")[0].strip();
        String[] rows = accountInsertQuery.split("\n");
        int numberOfAccounts = rows.length - 1;

        String[] hashedPasswordArray = Collections.nCopies(numberOfAccounts, hashedPassword).toArray(new String[0]);

        jdbcTemplate.update(insertSampleDataSql, (Object[]) hashedPasswordArray);
    }
}
