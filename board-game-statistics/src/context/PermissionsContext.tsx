import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { GroupPermissions } from '../utils/types';
import { apiGetPermissions } from '../utils/api/permissions-api-utils';

interface PermissionsContextProviderProps {
	children: ReactNode;
}

interface PermissionsContextType {
	permissions: GroupPermissions[] | null;
	loading: boolean;
}

const PermissionsContext = createContext<PermissionsContextType>({
	permissions: null,
	loading: true,
});

const PermissionsContextProvider = ({
	children,
}: PermissionsContextProviderProps) => {
	const [permissions, setPermissions] = useState<GroupPermissions[] | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		apiGetPermissions()
			.then((result) => {
				setPermissions(result);
			})
			.catch((err) => {
				console.error(err);
				setPermissions(null);
			})
			.finally(() => setLoading(false));
	}, []);

	const contextValue: PermissionsContextType = {
		permissions,
		loading,
	};

	return (
		<PermissionsContext.Provider value={contextValue}>
			{children}
		</PermissionsContext.Provider>
	);
};

export { PermissionsContext, PermissionsContextProvider };
