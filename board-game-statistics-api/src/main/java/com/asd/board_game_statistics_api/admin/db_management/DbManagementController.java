package com.asd.board_game_statistics_api.admin.db_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/db")
public class DbManagementController {

    @Autowired
    private IDbManagementService dbManagementService;

    @PostMapping("/rebuild-schema")
    public void rebuildSchema() {
        dbManagementService.rebuildSchema();
    }

    @PostMapping("/rebuild-with-sample-data")
    public void rebuildSchemaWithSampleData() {
        dbManagementService.rebuildSchema();
        dbManagementService.insertSampleData();
    }

}
