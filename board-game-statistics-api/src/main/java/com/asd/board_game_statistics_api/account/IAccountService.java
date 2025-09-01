package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;
import com.asd.board_game_statistics_api.model.Account;

public interface IAccountService {

    void createAccount(String email, String password, String firstName, String lastName) throws CreateAccountException;
    Account account(String email);

}