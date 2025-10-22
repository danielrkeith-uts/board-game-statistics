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
	winCondition: WinCondition;
}

export const WinConditionValues = {
	HIGH_SCORE: 'HIGH_SCORE',
	LOW_SCORE: 'LOW_SCORE',
	FIRST_TO_FINISH: 'FIRST_TO_FINISH',
	COOPERATIVE: 'COOPERATIVE',
} as const;

type WinCondition =
	(typeof WinConditionValues)[keyof typeof WinConditionValues];

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
	gameName: string;
	winCondition: string;
	datePlayed: string;
	playerIds: number[];
	points: number[];
	playerTeams: (number | null)[];
	hasWon: boolean[];
}

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
	wins: number[];
	losses: number[];
}

interface PieChartData {
	gameNames: string[];
	numOfGames: number[];
}

interface TableData {
	numOfGamesPlayed: number;
	winRate: number;
}

interface GlobalPlayerStats {
	barChartData: BarChartData;
	pieChartData: PieChartData;
	tableData: TableData;
}

export type {
	Account,
	BarChartData,
	Game,
	GameRecordDto,
	GlobalPlayerStats,
	Group,
	GroupMember,
	GroupPermissions,
	LeaderboardRow,
	OwnedGame,
	Permission,
	PieChartData,
	Player,
	PlayerStatistic,
	RecordGamePayload,
	WinCondition,
	TableData,
};
