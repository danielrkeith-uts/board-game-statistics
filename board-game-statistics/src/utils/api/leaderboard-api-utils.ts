import { apiGet } from './api-utils';
import type { OwnedGame } from '../types.ts';

export const apiOwnedGames = (groupId: number): Promise<OwnedGame[]> =>
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
