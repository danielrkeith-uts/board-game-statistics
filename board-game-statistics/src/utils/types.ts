interface Account {
	email: string;
	firstName: string;
	lastName: string;
}

interface GroupMember extends Account {
	joinTimestamp: string;
}

interface Group {
	id: number;
	groupName: string;
	creationTime: Date;
	members: GroupMember[];
}

export type { Account, GroupMember, Group };
