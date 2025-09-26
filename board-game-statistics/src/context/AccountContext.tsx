import { createContext, useEffect, useState, type ReactNode } from 'react';
import { apiGetLoggedInAccount } from '../utils/api/account-api-utils';
import type { Account } from '../utils/types';

interface AccountContextProviderProps {
	children: ReactNode;
}

interface AccountContextType {
	account: Account | null;
	loading: boolean;
	error: string | null;
}

const AccountContext = createContext<AccountContextType>({
	account: null,
	loading: true,
	error: null,
});

const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
	const [account, setAccount] = useState<Account | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);

		apiGetLoggedInAccount()
			.then((result) => {
				setAccount(result);
				setError(null);
			})
			.catch((err) => {
				console.error(err);
				setError('Failed to load account');
				setAccount(null);
			})
			.finally(() => setLoading(false));
	}, []);

	const contextValue: AccountContextType = {
		account,
		loading,
		error,
	};

	return (
		<AccountContext.Provider value={contextValue}>
			{children}
		</AccountContext.Provider>
	);
};

export { AccountContext, AccountContextProvider };
