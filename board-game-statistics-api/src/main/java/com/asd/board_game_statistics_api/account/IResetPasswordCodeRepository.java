package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.ResetPasswordCode;

public interface IResetPasswordCodeRepository {

    int create(int accountId);

    ResetPasswordCode get(int code);

}
