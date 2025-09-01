package com.asd.board_game_statistics_api.util;

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

}