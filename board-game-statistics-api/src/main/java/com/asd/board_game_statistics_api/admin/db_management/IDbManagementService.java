package com.asd.board_game_statistics_api.admin.db_management;

public interface IDbManagementService {
    void rebuildSchema();
    void insertSampleData();
}
