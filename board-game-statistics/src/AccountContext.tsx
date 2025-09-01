import { createContext, useEffect, useState, type ReactNode } from "react";
import { apiGetLoggedInAccount } from "./utils/api/account-api-utils";
import type { Account } from "./utils/types";

interface AccountContextType {
    account: Account | null;
    loading: boolean;
}

interface AccountContextProviderProps {
    children: ReactNode
}

const AccountContext = createContext<AccountContextType>({
    account: null,
    loading: true
});

const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGetLoggedInAccount()
            .then(result => {
                setAccount(result);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AccountContext.Provider value={{ account, loading }}>
            {children}
        </AccountContext.Provider>
    )
}

export { AccountContext, AccountContextProvider }