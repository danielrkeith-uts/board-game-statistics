import { apiDelete, apiGet, apiPost } from './api-utils';

export interface RecordGamePayload {
	groupId: number;
	gameId: number;
	winCondition: 'single' | 'team';
	numTeams?: number;
	playerIds: number[];
	teamAssignments?: number[];
	winner?: string;
	notes?: string;
}

export const apiRecordGame = async (payload: RecordGamePayload) => {
	const res = await apiPost('/games/record', payload);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.json();
};

export const apiGetGroupGames = async (groupId: number) => {
	const res = await apiGet(`/games/${groupId}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.json();
};

export const apiDeleteGameRecord = async (recordId: number) => {
	const res = await apiDelete(`/games/record/${recordId}`);
	if (!res.ok) {
		throw new Error(await res.text());
	}
	return res.text();
};
