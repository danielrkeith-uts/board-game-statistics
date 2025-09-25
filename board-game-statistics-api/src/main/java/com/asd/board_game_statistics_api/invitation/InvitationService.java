package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.model.Invitation;
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

    @Override
    public Invitation getInvitationByEmailAndGroup(String email, String group_id) {
        return invitationRespository.getInvitationByEmailAndGroup(email, Integer.parseInt(group_id));
    }

    @Override
    public Invitation getInvitationByCode(String code) {
        return invitationRespository.getInvitationByCode(Integer.parseInt(code));
    }

    @Override
    public void deleteInvitationByCode(String code) {
        invitationRespository.deleteInvitationByCode(Integer.parseInt(code));
    }

    @Override
    public boolean checkInvitationExists(String code) {
        return invitationRespository.checkInvitationExists(code);
    }


}
