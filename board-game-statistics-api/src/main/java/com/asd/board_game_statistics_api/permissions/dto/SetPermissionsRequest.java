package com.asd.board_game_statistics_api.permissions.dto;

import com.asd.board_game_statistics_api.model.Permission;

import java.util.List;

public record SetPermissionsRequest(List<Permission> permissions) { }
