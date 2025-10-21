import type { GlobalPlayerStats, PlayerStatistic } from '../types';
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

			throw new Error(`Error fetching player statistic data.`);
		})
		.then((data) => {
			return data as PlayerStatistic;
		});

export const apiGetGlobalPlayerStats = (): Promise<GlobalPlayerStats> =>
	apiGet(`/stats/global`)
		.then(async (res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status === 400) {
				return res.text().then((err) => {
					throw new Error(err);
				});
			}

			throw new Error(`Error fetching player statistic data.`);
		})
		.then((data) => {
			return data as GlobalPlayerStats;
		});
