package com.asd.board_game_statistics_api.account;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.account.exceptions.CreateAccountException;

public interface IAccountService {

    void createAccount(String email, String password, String firstName, String lastName) throws CreateAccountException;
    Account account(String email);
    void updateAccount(String email, String firstName, String lastName, String newEmail) throws Exception;
    void changePassword(String email, String currentPassword, String newPassword) throws Exception;
    void deleteAccount(String email) throws Exception;

}