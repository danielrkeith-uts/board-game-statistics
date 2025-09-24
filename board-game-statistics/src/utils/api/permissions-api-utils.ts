import type { GroupPermissions } from '../types';
import { apiGet } from './api-utils';

export const apiGetPermissions = (): Promise<GroupPermissions[]> =>
	apiGet('/permissions')
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status === 401) {
				return null;
			}
			throw new Error(`Error getting permissions: ${res.statusText}`);
		})
		.then((data) => data as GroupPermissions[]);

export const apiGetGroupOwner = (groupId: number): Promise<string> =>
	apiGet(`/permissions/group/${groupId}/owner`).then((res) => {
		if (res.ok) {
			return res.text();
		}
		if (res.status === 404) {
			return '';
		}
		throw new Error(`Error getting permissions: ${res.statusText}`);
	});
