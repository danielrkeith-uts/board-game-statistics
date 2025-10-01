import type { Account } from '../types.ts';
import { apiGet, apiPost, apiPut, apiDelete } from './api-utils.ts';

export const apiLogin = (email: string, password: string): Promise<boolean> =>
	apiPost('/account/login', { email, password }).then((res) => {
		if (res.ok) {
			return true;
		}
		if (res.status === 401) {
			return false;
		}
		throw new Error(`Error logging in: ${res.statusText}`);
	});

export const apiLogout = (): Promise<Response> => apiPost('/account/logout');

export const apiGetLoggedInAccount = (): Promise<Account> =>
	apiGet('/account/me')
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			if (res.status === 401) {
				return null;
			}
			throw new Error(
				`Error getting logged in account: ${res.statusText}`
			);
		})
		.then((data) => {
			return data as Account;
		});

export const apiUpdateAccount = (
	firstName: string,
	lastName: string,
	email: string
): Promise<boolean> =>
	apiPut('/account/update', { firstName, lastName, email }).then((res) => {
		if (res.ok) {
			return true;
		}
		if (res.status === 401) {
			return false;
		}
		throw new Error(`Error updating account: ${res.statusText}`);
	});

export const apiChangePassword = (
	currentPassword: string,
	newPassword: string
): Promise<boolean> =>
	apiPut('/account/change-password', { currentPassword, newPassword }).then(
		(res) => {
			if (res.ok) {
				return true;
			}
			if (res.status === 401) {
				return false;
			}
			throw new Error(`Error changing password: ${res.statusText}`);
		}
	);

export const apiDeleteAccount = (): Promise<boolean> =>
	apiDelete('/account/delete').then((res) => {
		if (res.ok) {
			return true;
		}
		if (res.status === 401) {
			return false;
		}
		throw new Error(`Error deleting account: ${res.statusText}`);
	});

export const apiSendPasswordReset = (
	email: string
): Promise<{ ok: boolean; message?: string }> =>
	apiPost('/account/send-password-reset', { email }).then((res) => {
		if (res.ok) {
			return { ok: true };
		}

		if (res.status === 400) {
			return res.json();
		}

		throw new Error(
			`Error sending password reset: ${res.status} ${res.statusText}`
		);
	});

export const apiCheckPasswordResetCode = (
	code: number,
	email: string
): Promise<boolean> =>
	apiPut('/account/check-password-reset-code', { code, email })
		.then((res) => {
			if (res.ok) {
				return res.json();
			}

			throw new Error(`Error checking code: ${res.statusText}`);
		})
		.then((data) => data as boolean);

export const apiResetPassword = (
	code: number,
	email: string,
	password: string
): Promise<{ ok: boolean; message?: string }> =>
	apiPut('/account/reset-password', { code, email, password }).then((res) => {
		if (res.ok) {
			return { ok: true };
		}

		if (res.status === 400) {
			return res.json();
		}

		throw new Error(`Error resetting password: ${res.statusText}`);
	});

export const apiCreateAccount = async (
	email: string,
	firstName: string,
	lastName: string,
	password: string
): Promise<{ ok: boolean; message?: string }> => {
	const res = await apiPost('/account/create', {
		email,
		firstName,
		lastName,
		password,
	});

	if (res.ok) {return { ok: true };}

	if (res.status === 400) {
		try {
			const data = await res.json();
			return {
				ok: false,
				message: data?.message || data?.error || res.statusText,
			};
		} catch {
			return { ok: false, message: res.statusText };
		}
	}

	throw new Error(`Error creating account: ${res.status} ${res.statusText}`);
};
