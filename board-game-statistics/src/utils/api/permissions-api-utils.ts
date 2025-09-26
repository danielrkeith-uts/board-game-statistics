import type { GroupPermissions, Permission } from '../types';
import { apiGet, apiPut } from './api-utils';

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

export const apiGetPermissionOfGroupMember = (
	memberId: number,
	groupId: number
): Promise<Set<Permission>> =>
	apiGet(`/permissions/group/${groupId}/member/${memberId}`)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error(
				`Error getting group member permissions: ${res.statusText}`
			);
		})
		.then((data) => new Set<Permission>(data));

export const apiGetGroupOwner = (groupId: number): Promise<string> =>
	apiGet(`/permissions/group/${groupId}/owner`).then((res) => {
		if (res.ok) {
			return res.text();
		}
		if (res.status === 404) {
			return '';
		}
		throw new Error(`Error getting group owner: ${res.statusText}`);
	});

export const apiSetGroupMemberPermissions = (
	memberId: number,
	groupId: number,
	permissions: Set<Permission>
): Promise<boolean> =>
	apiPut(`/permissions/group/${groupId}/member/${memberId}`, {
		permissions: [...permissions],
	}).then((res) => {
		if (res.ok) {
			return true;
		}
		throw new Error(`Error setting permissions: ${res.statusText}`);
	});
