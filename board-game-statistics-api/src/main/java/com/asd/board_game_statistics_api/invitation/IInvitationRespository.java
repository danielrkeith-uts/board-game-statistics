package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;

public interface IInvitationRespository {
    void createInvitation(String user_email, int group_id);
    Invitation getInvitationByCode(int invite_code);
    Invitation getInvitationByEmailAndGroup(String user_email, int group_id);
    void deleteInvitationByCode(int invite_code);
    boolean checkInvitationExistsByCode(String code);
    boolean checkInvitationExistsByEmailAndGroup(String email, String group_id);
}

