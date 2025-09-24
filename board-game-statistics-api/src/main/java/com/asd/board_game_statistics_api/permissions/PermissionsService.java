package com.asd.board_game_statistics_api.permissions;

import com.asd.board_game_statistics_api.account.IAccountRepository;
import com.asd.board_game_statistics_api.model.Account;
import com.asd.board_game_statistics_api.model.AccountPermissions;
import com.asd.board_game_statistics_api.model.GroupPermissions;
import com.asd.board_game_statistics_api.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionsService implements IPermissionsService {

    @Autowired
    private IPermissionsRepository permissionsRepository;
    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public List<GroupPermissions> getPermissions(int accountId) {
        return permissionsRepository.getAllGroupPermissions(accountId);
    }

    @Override
    public Account getGroupOwner(int groupId) {
        List<AccountPermissions> allAccountPermissions = permissionsRepository.getAllAccountPermissions(groupId);

        for (AccountPermissions accountPermissions : allAccountPermissions) {
            if (accountPermissions.permissions().contains(Permission.OWNERSHIP_AND_GROUP_SETTINGS)) {
                return accountRepository.get(accountPermissions.accountId());
            }
        }
        return null;
    }
}
