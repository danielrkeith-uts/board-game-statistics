package com.asd.board_game_statistics_api.invitation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationService implements IInvitaionService{

    @Autowired
    IInvitationRespository invitationRespository;

    @Override
    public void createInvitation(String user_email, String group_id) {
        invitationRespository.createInvitation(user_email, Integer.parseInt(group_id));
    }
}
