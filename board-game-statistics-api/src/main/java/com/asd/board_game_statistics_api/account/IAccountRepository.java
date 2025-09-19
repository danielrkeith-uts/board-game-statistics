package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.model.Account;

public interface IAccountRepository {

    void create(String email, String password, String first_name, String last_name);

    Account get(String email);
    
    void update(String email, String firstName, String lastName, String newEmail);
    
    void updatePassword(String email, String newPassword);
    
    void delete(String email);

}