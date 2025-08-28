package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.Account;

public interface IAccountRepository {

    void create(String username, String password, String first_name, String last_name);

    Account get(String username);

}