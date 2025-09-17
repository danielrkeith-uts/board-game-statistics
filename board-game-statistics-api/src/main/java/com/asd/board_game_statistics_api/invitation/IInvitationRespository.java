package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;

public interface IInvitationRespository {
    void createInvitation(String user_email, int group_id);
    Invitation getInvitation(String user_email, int group_id);
}

