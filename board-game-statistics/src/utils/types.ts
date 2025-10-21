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

interface Game {
	id: number;
	name: string;
	publisher?: string | null;
}

export type TempWinCondition =
	| 'HIGH_SCORE'
	| 'LOW_SCORE'
	| 'FIRST_TO_FINISH'
	| 'COOPERATIVE'
	| 'CUSTOM';

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

interface OwnedGame {
	gameId: number;
	groupId: number;
	gameName: string;
}

interface LeaderboardRow {
	accountId: number;
	firstName: string;
	lastName: string;
	wins: number;
}

interface PlayerStatistic {
	numOfGamesPlayed: number;
	wins: number;
	losses: number;
}

interface BarChartData {
	winData: number[];
	lossData: number[];
}

export type {
	Account,
	BarChartData,
	Game,
	GameRecordDto,
	Group,
	GroupMember,
	GroupPermissions,
	LeaderboardRow,
	OwnedGame,
	Permission,
	Player,
	PlayerStatistic,
	RecordGamePayload,
	WinCondition,
};
