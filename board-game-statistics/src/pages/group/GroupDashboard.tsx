import { Tabs, Tab } from 'react-bootstrap';
import GroupHomeView from './GroupHomeView';
import MembersListView from './MembersListView';
import { type ChangeEvent } from 'react';
import type { Group } from '../../utils/types';
import GroupManagementHeader from './GroupManagementHeader';
import InviteMemberView from './InviteMemberView.tsx';

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
						Leaderboard
					</Tab>
					<Tab eventKey='members' title='Members'>
						Members list
						<br />
						<MembersListView />
					</Tab>
					<Tab eventKey='games' title='Games'>
						Games
					</Tab>
					<Tab eventKey='invite' title='Invite'>
						<InviteMemberView group={currentGroup} />
					</Tab>
					<Tab eventKey='manage' title='Manage'>
						Manage perms and kick users?
					</Tab>
				</Tabs>
			</div>
		</>
	);
};

export default GroupDashboard;
