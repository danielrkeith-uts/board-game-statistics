import type { Group } from '../types';
import { apiGet, apiPost } from './api-utils';

export const apiCreateNewGroup = (groupName: string): Promise<Group> =>
	apiPost('/group/create', { groupName })
		.then(async (res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status == 400) {
				return res.text().then((err) => {
					throw new Error(err);
				});
			}

			throw new Error(`HTTP ${res.status}: ${res.statusText}`);
		})
		.then((data) => {
			return data as Group;
		});

export const apiGetGroupsByAccountId = (): Promise<Group[]> =>
	apiGet('/group')
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status == 400) {
				return res.text().then((err) => {
					throw new Error(err);
				});
			}
			throw new Error(`HTTP ${res.status}: ${res.statusText}`);
		})
		.then((data) => {
			return data as Group[];
		});

export const apiLeaveGroup = (groupId: number): Promise<boolean> =>
	apiPost('/group/leave', { groupId }).then((res) => {
		if (res.ok) {
			return true;
		}
		if (res.status == 400) {
			return res.text().then((err) => {
				throw new Error(err);
			});
		}

		throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	});
