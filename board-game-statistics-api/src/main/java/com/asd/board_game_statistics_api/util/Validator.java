package com.asd.board_game_statistics_api.util;

import com.asd.board_game_statistics_api.games.dto.GameRecordRequest;

import java.util.regex.Pattern;

public class Validator {

    public static final int MINIMUM_PASSWORD_LENGTH = 8;

    public static boolean isValidEmail(String email) {
        return Pattern.compile("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$").matcher(email).matches();
    }

    public static boolean isValidPassword(String password) {
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern digit = Pattern.compile("[0-9]");
        Pattern special = Pattern.compile ("[^a-zA-Z0-9]");

        return letter.matcher(password).find()
                && digit.matcher(password).find()
                && special.matcher(password).find()
                && password.length() >= MINIMUM_PASSWORD_LENGTH;
    }

    public static boolean isValidGroupName(String groupName) {
        Pattern groupNamePattern = Pattern.compile("^[a-zA-Z0-9][a-zA-Z0-9\\s]{0,29}$");

        return groupNamePattern.matcher(groupName).find();
    }

    public static void validateGameRecordRequest(GameRecordRequest request) {
        if (request.groupId() <= 0) throw new IllegalArgumentException("groupId required");
        if (request.gameId() <= 0) throw new IllegalArgumentException("gameId required");
        if (request.datePlayed() == null || request.datePlayed().isEmpty())
            throw new IllegalArgumentException("datePlayed required");
        if (request.playerIds() == null || request.playerIds().isEmpty())
            throw new IllegalArgumentException("At least one player required");
        if (request.points() == null || request.points().size() != request.playerIds().size())
            throw new IllegalArgumentException("Points must be provided for all players");
        if (request.playerTeams() == null || request.playerTeams().size() != request.playerIds().size())
            throw new IllegalArgumentException("Player teams must be provided for all players");
        if (request.hasWon() == null || request.hasWon().size() != request.playerIds().size())
            throw new IllegalArgumentException("Win status must be provided for all players");
    }

}