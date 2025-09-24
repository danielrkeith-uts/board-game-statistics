import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { GroupPermissions } from '../utils/types';
import { apiGetPermissions } from '../utils/api/permissions-api-utils';

interface PermissionsContextProviderProps {
	children: ReactNode;
}

interface PermissionsContextType {
	permissions: GroupPermissions[] | null;
	loading: boolean;
	error: string | null;
}

const PermissionsContext = createContext<PermissionsContextType>({
	permissions: null,
	loading: true,
	error: null,
});

const PermissionsContextProvider = ({
	children,
}: PermissionsContextProviderProps) => {
	const [permissions, setPermissions] = useState<GroupPermissions[] | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);

		apiGetPermissions()
			.then((result) => {
				setPermissions(result);
				setError(null);
			})
			.catch((err) => {
				console.error(err);
				setError('Failed to load account');
				setPermissions(null);
			})
			.finally(() => setLoading(false));
	}, []);

	const contextValue: PermissionsContextType = {
		permissions,
		loading,
		error,
	};

	return (
		<PermissionsContext.Provider value={contextValue}>
			{children}
		</PermissionsContext.Provider>
	);
};

export { PermissionsContext, PermissionsContextProvider };
