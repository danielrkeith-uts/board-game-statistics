interface Account {
	email: string;
	firstName: string;
	lastName: string;
}

interface GroupPermissions {
	groupId: number;
	permissions: Permission[];
}

type Permission =
	| 'OWNERSHIP_AND_GROUP_SETTINGS'
	| 'MANAGE_MEMBERS'
	| 'MANAGE_MEMBER_PERMISSIONS'
	| 'MANAGE_BOARD_GAMES'
	| 'MANAGE_GAMES_PLAYED';

interface GroupMember extends Account {
	joinTimestamp: string;
}

interface Group {
	id: number;
	groupName: string;
	creationTime: Date;
	members: GroupMember[];
}

export type { Account, GroupPermissions, GroupMember, Group };
