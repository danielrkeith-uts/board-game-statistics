package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;

public interface IAccountService {

    void createAccount(String username, String password, String firstName, String lastName) throws CreateAccountException;

}