import { apiDelete, apiGet, apiPost } from './api-utils';

export interface RecordGamePayload {
	groupId: number;
	gameId: number;
	datePlayed: string; // ISO date string
	playerIds: number[];
	points: number[];
	playerTeams: string[];
	hasWon: boolean[];
	notes?: string;
}

export const apiRecordGame = async (payload: RecordGamePayload) => {
	const res = await apiPost('/results/record', payload);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.json();
};

export const apiGetGroupGames = async (groupId: number) => {
	const res = await apiGet(`/results/${groupId}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.json();
};

export const apiDeleteGameRecord = async (recordId: number) => {
	const res = await apiDelete(`/results/record/${recordId}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.text();
};
