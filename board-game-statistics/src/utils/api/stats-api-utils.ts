import type { PlayerStatistic } from '../types';
import { apiGet } from './api-utils';

export const apiGetPlayerStatsByGroupId = (
	groupId: number
): Promise<PlayerStatistic> =>
	apiGet(`/stats/${groupId}`)
		.then(async (res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status === 400) {
				return res.text().then((err) => {
					throw new Error(err);
				});
			}

			throw new Error(`HTTP ${res.status}: ${res.statusText}`);
		})
		.then((data) => {
			return data as PlayerStatistic;
		});
