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
    apiGet("/account/me")
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 401) {
                return null;
            }
            throw new Error(`Error getting logged in account: ${res.statusText}`);
        })
        .then(data => {
            return data as Account
        });

export const apiUpdateAccount = (firstName: string, lastName: string, email: string): Promise<boolean> => 
    apiPut("/account/update", { firstName, lastName, email })
        .then(res => {
            if (res.ok) {
                return true;
            }
            if (res.status === 401) {
                return false;
            }
            throw new Error(`Error updating account: ${res.statusText}`);
        });

export const apiChangePassword = (currentPassword: string, newPassword: string): Promise<boolean> => 
    apiPut("/account/change-password", { currentPassword, newPassword })
        .then(res => {
            if (res.ok) {
                return true;
            }
            if (res.status === 401) {
                return false;
            }
            throw new Error(`Error changing password: ${res.statusText}`);
        });

export const apiDeleteAccount = (): Promise<boolean> => 
    apiDelete("/account/delete")
        .then(res => {
            if (res.ok) {
                return true;
            }
            if (res.status === 401) {
                return false;
            }
            throw new Error(`Error deleting account: ${res.statusText}`);
        });
