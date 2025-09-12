import { useEffect, useState } from 'react';
import { apiGetGroupsByAccountId } from '../../utils/api/group-api-utils.ts';
import type { Group } from '../../utils/types.ts';
import Spinner from 'react-bootstrap/Spinner';
import GroupDashboard from './GroupDashboard.tsx';

const GroupView = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [groups, setGroups] = useState<Group[]>([]);
	const [currentGroup, setCurrentGroup] = useState<Group>();

	const minLoadTime: number = 700;

	// On page load, get groups for current user
	useEffect(() => {
		setIsLoading(true);

		apiGetGroupsByAccountId()
			.then((groups) => {
				setGroups(groups);

				if (groups.length > 0) {
					setCurrentGroup(groups[0]);
				}
			})
			.catch((err) => alert(err))
			.finally(() => setTimeout(() => setIsLoading(false), minLoadTime));
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="container centerContainer flex-column">
					<h5 className="mb-3">Fetching group data</h5>
					<Spinner />
				</div>
			) : currentGroup ? (
				<GroupDashboard
					groups={groups}
					setGroups={setGroups}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
				/>
			) : (
				<div>You have no bitches.</div>
			)}
		</>
	);
};

export default GroupView;
