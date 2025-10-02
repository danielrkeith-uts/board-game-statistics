import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import type { GroupPermissions, Permission } from '../utils/types';
import { apiGetPermissions } from '../utils/api/permissions-api-utils';
import { AccountContext } from './AccountContext';

interface PermissionsContextProviderProps {
	children: ReactNode;
}

interface PermissionsContextType {
	permissions: GroupPermissions[] | null;
	loading: boolean;
	getGroupPermissions: (groupId: number) => Permission[] | undefined;
}

const PermissionsContext = createContext<PermissionsContextType>({
	permissions: null,
	loading: true,
	getGroupPermissions: () => [],
});

const PermissionsContextProvider = ({
	children,
}: PermissionsContextProviderProps) => {
	const { account } = useContext(AccountContext);

	const [permissions, setPermissions] = useState<GroupPermissions[] | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	const getGroupPermissions = (groupId: number) =>
		permissions?.find(
			(groupPermission) => groupPermission.groupId === groupId
		)?.permissions;

	useEffect(() => {
		if (!account) {
			return;
		}

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
		getGroupPermissions,
	};

	return (
		<PermissionsContext.Provider value={contextValue}>
			{children}
		</PermissionsContext.Provider>
	);
};

export { PermissionsContext, PermissionsContextProvider };
