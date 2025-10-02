import { Tabs, Tab } from 'react-bootstrap';
import GroupHomeView from './home/GroupHomeView';
import { useContext, type ChangeEvent } from 'react';
import type { Group } from '../../utils/types';
import GroupManagementHeader from './GroupManagementHeader';
import InviteMemberView from './InviteMemberView';
import { PermissionsContext } from '../../context/PermissionsContext';
import GroupGamesView from './games/GroupGamesView';
import GameLeaderboardView from './leaderboard/GameLeaderboardView.tsx';

interface GroupDashboardProps {
	groups: Group[];
	currentGroup: Group;
	setCurrentGroup: (group: Group) => void;
	handleOpenCreateGroupModal: () => void;
	handleOpenLeaveGroupModal: () => void;
}

const GroupDashboard = (props: GroupDashboardProps) => {
	const {
		groups,
		currentGroup,
		setCurrentGroup,
		handleOpenCreateGroupModal,
		handleOpenLeaveGroupModal,
	} = props;

	const { getGroupPermissions } = useContext(PermissionsContext);
	const thisGroupsPermissions = getGroupPermissions(currentGroup.id);

	const handleGroupDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentGroup(
			props.groups.filter(
				(group) => group.id === Number(e.target.value)
			)[0]
		);
	};

	return (
		<>
			<GroupManagementHeader
				groups={groups}
				currentGroup={currentGroup}
				handleGroupDropdownChange={handleGroupDropdownChange}
				handleOpenCreateGroupModal={handleOpenCreateGroupModal}
				handleOpenLeaveGroupModal={handleOpenLeaveGroupModal}
			/>

			<div className='container'>
				<Tabs
					defaultActiveKey='home'
					id='group-view-tabs'
					className='bg-white justify-content-start mb-3 h-auto'
				>
					<Tab eventKey='home' title='Home' className='pb-n3'>
						<GroupHomeView currentGroup={currentGroup} />
					</Tab>
					<Tab eventKey='leaderboard' title='Leaderboard'>
						<GameLeaderboardView currentGroup={currentGroup} />
					</Tab>
					<Tab eventKey='games' title='Games'>
						<GroupGamesView group={currentGroup} />
					</Tab>
					{thisGroupsPermissions?.includes('MANAGE_MEMBERS') && (
						<Tab eventKey='invite' title='Invite'>
							<InviteMemberView group={currentGroup} />
						</Tab>
					)}
				</Tabs>
			</div>
		</>
	);
};

export default GroupDashboard;
