import { createContext, useEffect, useState, type ReactNode } from 'react';
import { apiGetLoggedInAccount } from '../utils/api/account-api-utils';
import type { Account } from '../utils/types';

interface AccountContextProviderProps {
	children: ReactNode;
}

const AccountContext = createContext<Account | null>(null);

const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
	const [account, setAccount] = useState<Account | null>(null);

	useEffect(() => {
		apiGetLoggedInAccount()
			.then((result) => {
				setAccount(result);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<AccountContext.Provider value={account}>
			{children}
		</AccountContext.Provider>
	);
};

export { AccountContext, AccountContextProvider };
