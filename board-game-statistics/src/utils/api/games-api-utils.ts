import { apiGet, apiPost, apiDelete } from './api-utils';
import type { Game, WinCondition } from '../types';

export const apiGetAllGames = (): Promise<Game[]> =>
	apiGet('/games').then(async (res) => {
		if (!res.ok)
			{throw new Error(
				`Error getting games: ${res.status} ${res.statusText}`
			);}
		return (await res.json()) as Game[];
	});

export const apiGetOwnedGames = (): Promise<Game[]> =>
	apiGet('/games/owned').then(async (res) => {
		if (!res.ok)
			{throw new Error(
				`Error getting owned games: ${res.status} ${res.statusText}`
			);}
		return (await res.json()) as Game[];
	});

export const apiAddOwnedGame = (gameId: number): Promise<boolean> =>
	apiPost(`/games/owned/${gameId}`).then((res) => {
		if (res.ok) {return true;}
		if (res.status === 401) {return false;}
		throw new Error(`Error adding game: ${res.status} ${res.statusText}`);
	});

export const apiRemoveOwnedGame = (gameId: number): Promise<boolean> =>
	apiDelete(`/games/owned/${gameId}`).then((res) => {
		if (res.ok) {return true;}
		if (res.status === 404) {return false;}
		throw new Error(`Error removing game: ${res.status} ${res.statusText}`);
	});

export const apiCreateOrAddOwnedCustom = (payload: {
	name: string;
	publisher?: string | null;
	winCondition: WinCondition;
	customWinCondition?: string | null;
}): Promise<Game> =>
	apiPost('/games/owned/custom', payload).then(async (res) => {
		if (res.ok) {return (await res.json()) as Game;}
		const msg = await res.text().catch(() => null);
		throw new Error(
			msg || `Error creating/owning game: ${res.status} ${res.statusText}`
		);
	});
