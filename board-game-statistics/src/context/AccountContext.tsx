import { createContext, useEffect, useState, type ReactNode } from 'react';
import { apiGetLoggedInAccount } from '../utils/api/account-api-utils';
import type { Account } from '../utils/types';

interface AccountContextProviderProps {
	children: ReactNode;
}

interface AccountContextType {
	account: Account | null;
	loading: boolean;
}

const AccountContext = createContext<AccountContextType>({
	account: null,
	loading: true,
});

const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
	const [account, setAccount] = useState<Account | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		apiGetLoggedInAccount()
			.then((result) => {
				setAccount(result);
			})
			.catch((err) => {
				console.error(err);
				setAccount(null);
			})
			.finally(() => setLoading(false));
	}, []);

	const contextValue: AccountContextType = {
		account,
		loading,
	};

	return (
		<AccountContext.Provider value={contextValue}>
			{children}
		</AccountContext.Provider>
	);
};

export { AccountContext, AccountContextProvider };
