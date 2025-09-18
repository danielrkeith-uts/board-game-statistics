import {apiPost} from "./api-utils.ts";

export const apiInvite = (email: string, group: number): Promise<boolean> =>


    apiPost('/invite/send', {email, group}).then(response => {
        if (response.ok){
            return true
        }
        if (response.status === 401) {
            return false
        }
        throw new Error(`Error sending invitation: ${response.statusText}`);
    })