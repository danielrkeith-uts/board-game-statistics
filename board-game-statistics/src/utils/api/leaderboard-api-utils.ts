import { apiGet } from './api-utils';
import type { Game } from '../types.ts';

export const apiOwnedGames = (groupId: number): Promise<Game[]> =>
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
		.then((games) => games as Game[]);
