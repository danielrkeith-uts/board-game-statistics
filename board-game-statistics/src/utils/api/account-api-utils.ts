import { apiPost } from './api-utils.ts';

export const apiLogin = (email: string, password: string): Promise<boolean> => 
    apiPost("/account/login", { email, password })
        .then(res => {
            if (res.ok) {
                return true;
            } else if (res.status == 401) {
                return false;
            } else {
                throw new Error(`HTTP error status: ${res.status}`)
            }
        })
