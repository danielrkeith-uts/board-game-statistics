import { apiGet } from './api-utils';
import type { LeaderboardRow, OwnedGame } from '../types.ts';

export const apiGetOwnedGames = (groupId: number): Promise<OwnedGame[]> =>
	apiGet(`/ownedgames/${groupId}`)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			if (response.status === 401) {
				return null;
			}
			throw new Error(response.statusText);
		})
		.then((games) => games as OwnedGame[]);

export const apiGetLeaderboardRows = (
	groupId: number,
	gameId: number
): Promise<LeaderboardRow[]> =>
	apiGet(`/leaderboard/${groupId}/${gameId}`).then((response) => {
		if (response.ok) {
			return response.json();
		}
		if (response.status === 401) {
			return null;
		}
		throw new Error(response.statusText);
	});
