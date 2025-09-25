import type { Permission } from './types';

// Page urls
export const HOME_PAGE_URL = '/';
export const GAMES_PAGE_URL = '/games';
export const GROUPS_PAGE_URL = '/groups';
export const LOGIN_PAGE_URL = '/login';
export const CREATE_ACCOUNT_PAGE_URL = '/createAccount';
export const MANAGE_ACCOUNT_PAGE_URL = '/manageAccount';

export const allowedPagesWhileLoggedOut = [
	HOME_PAGE_URL,
	LOGIN_PAGE_URL,
	CREATE_ACCOUNT_PAGE_URL,
];

interface PermissionName {
	permission: Permission;
	name: string;
}

export const PermissionNames: PermissionName[] = [
	{ permission: 'MANAGE_MEMBERS', name: 'Manage members' },
	{
		permission: 'MANAGE_MEMBER_PERMISSIONS',
		name: 'Manage member permissions',
	},
	{ permission: 'MANAGE_BOARD_GAMES', name: 'Manage board games' },
	{ permission: 'MANAGE_GAMES_PLAYED', name: 'Manage games played' },
];
