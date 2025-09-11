package com.asd.board_game_statistics_api.admin.db_management;

import com.asd.board_game_statistics_api.util.ResourceReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PostgreSqlDbManagementService implements IDbManagementService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ResourceReader resourceReader;

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

        jdbcTemplate.execute(insertSampleDataSql);
    }
}
