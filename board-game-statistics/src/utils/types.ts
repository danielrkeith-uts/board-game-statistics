interface Account {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
}

type Permission =
	| 'OWNERSHIP_AND_GROUP_SETTINGS'
	| 'MANAGE_MEMBERS'
	| 'MANAGE_MEMBER_PERMISSIONS'
	| 'MANAGE_BOARD_GAMES'
	| 'MANAGE_GAMES_PLAYED';

interface GroupPermissions {
	groupId: number;
	permissions: Permission[];
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

interface RecordGamePayload {
	groupId: number;
	gameId: number;
	datePlayed: string; // ISO date string
	playerIds: number[];
	points: number[];
	playerTeams: (number | null)[];
	hasWon: boolean[];
}

interface GameRecordDto {
	playedGameId: number;
	groupId: number;
	gameId: number;
	datePlayed: string;
	playerIds: number[];
	points: number[];
	playerTeams: (number | null)[];
	hasWon: boolean[];
}

type WinCondition = 'single' | 'team' | 'coop';

interface Player {
	id: number;
	name: string;
}

interface Game {
	id: string;
	name: string;
}

export type {
	Account,
	Permission,
	GroupPermissions,
	GroupMember,
	Group,
	RecordGamePayload,
	GameRecordDto,
	WinCondition,
	Player,
	Game,
};
