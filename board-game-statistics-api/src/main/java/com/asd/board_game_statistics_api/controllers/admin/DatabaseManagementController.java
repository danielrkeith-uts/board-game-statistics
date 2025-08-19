package com.asd.board_game_statistics_api.controllers.admin;

import com.asd.board_game_statistics_api.services.IDbManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO - Secure controller with admin header in request
@RestController
@RequestMapping("/api/admin/db")
public class DatabaseManagementController {

    @Autowired
    private IDbManagementService dbManagementService;

    @PostMapping("/create-tables")
    public void createTables() {
        dbManagementService.createTables();
    }

    @DeleteMapping("/drop-tables")
    public void dropTables() {
        dbManagementService.dropTables();
    }

}
