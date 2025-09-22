package com.asd.board_game_statistics_api.test_utils;

import com.asd.board_game_statistics_api.admin.db_management.PostgreSqlDbManagementService;
import com.asd.board_game_statistics_api.util.ResourceReader;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import javax.sql.DataSource;

import static io.zonky.test.db.AutoConfigureEmbeddedDatabase.DatabaseProvider.ZONKY;
import static io.zonky.test.db.AutoConfigureEmbeddedDatabase.RefreshMode.AFTER_EACH_TEST_METHOD;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest(properties = "BGS_ADMIN_PASSWORD=1234567890")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Import(TestResourceReaderConfig.class)
@AutoConfigureEmbeddedDatabase(provider = ZONKY, refresh = AFTER_EACH_TEST_METHOD)
public abstract class TestsWithMockedDatabase {
    protected JdbcTemplate jdbcTemplate;

    // Mocked util classes for the dbManagementService
    @MockitoBean
    ResourceLoader resourceLoader;

    // Fetching beans from application context
    @Autowired
    protected DataSource mockedPostgreSqlDatabase;
    @Autowired
    protected ResourceReader autowiredResourceReader;

    @Autowired
    private PostgreSqlDbManagementService dbManagementService;

    @BeforeAll
    void setupMocks() {
        // Instantiate a jdbcTemplate on the mocked database
        jdbcTemplate = new JdbcTemplate(mockedPostgreSqlDatabase);
    }

    @BeforeEach
    void rebuild_schema() {
        dbManagementService.rebuildSchema();
        // FIXME: The sample data insert can be removed if not everyone wants to use the sample data
        dbManagementService.insertSampleData();
    }
}
