package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;

public interface IInvitaionService {
    void createInvitation(String user_email, String group_id);
    Invitation getInvitationByEmailAndGroup(String email, String group_id);
    Invitation getInvitationByCode(String code);
    void deleteInvitationByCode(String code);
    boolean checkInvitationExistsByCode(String code);
    boolean checkInvitationExistsByEmailAndGroup(String email, String group_id);
    boolean joinGroup(String inviteCodes);
}
