package com.asd.board_game_statistics_api.invitation;

import com.asd.board_game_statistics_api.account.AccountService;
import com.asd.board_game_statistics_api.group.GroupService;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.Invitation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InvitationService implements IInvitaionService{

    @Autowired
    IInvitationRespository invitationRespository;
    @Autowired
    private AccountService accountService;
    @Autowired
    private GroupService groupService;

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
    public boolean checkInvitationExistsByCode(String code) {
        return invitationRespository.checkInvitationExistsByCode(code);
    }

    @Override
    public boolean checkInvitationExistsByEmailAndGroup(String email, String group_id) {
        return invitationRespository.checkInvitationExistsByEmailAndGroup(email, group_id);
    }

    @Override
    public boolean joinGroup(String inviteCode) {
        if(invitationRespository.checkInvitationExistsByCode(inviteCode)){
            int code = Integer.parseInt(inviteCode);
            //Add user to group table (check for implementation)
            //  Get invitation
            Invitation invitation = invitationRespository.getInvitationByCode(code);
            //  Get user id
            Account account = accountService.account(invitation.user_email());
            int userId = account.id();
            //  Get group id
            int groupId = invitation.group_id();
            //  Add row to group membership table
            groupService.addGroupMember(userId, groupId);
            //  Delete invitation from invitation table
            invitationRespository.deleteInvitationByCode(code);
            return true;
        }
        return false;
    }
}
