package com.asd.board_game_statistics_api.model;

import java.util.EnumSet;

public record GroupPermissions(int groupId, EnumSet<Permission> permissions) { }
