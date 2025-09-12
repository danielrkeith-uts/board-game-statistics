import type { Group } from '../types';
import { apiGet, apiPost } from './api-utils';

export const apiCreateNewGroup = (groupName: string): Promise<Group> =>
	apiPost('/group/create', { groupName }).then(async (res) => {
		if (res.ok) {
			return res.json();
		}
		if (res.status == 400) {
			res.text().then((err) => {
				alert(err);
			});

			return null;
		}
	});

export const apiGetGroupsByAccountId = (): Promise<Group[]> =>
	apiGet('/group').then((res) => {
		if (res.ok) {
			return res.json();
		}
		if (res.status == 400) {
			res.text().then((err) => {
				alert(err);
			});

			return null;
		}
	});

export const apiLeaveGroup = (groupId: number): Promise<boolean> =>
	apiPost('/group/leave', { groupId }).then((res) => {
		if (res.ok) {
			return true;
		}
		if (res.status === 400) {
			res.text().then((err) => {
				alert(err);
			});
		}

		return false;
	});
