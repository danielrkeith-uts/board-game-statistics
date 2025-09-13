import { Tabs, Tab } from 'react-bootstrap';
import CreateGroupModal from './CreateGroupModal';
import GroupDropDown from './GroupDropDown';
import GroupHomeView from './GroupHomeView';
import LeaveGroupModal from './LeaveGroupModal';
import MembersListView from './MembersListView';
import { useState, type ChangeEvent } from 'react';
import type { Group } from '../../utils/types';
import {
	apiCreateNewGroup,
	apiLeaveGroup,
} from '../../utils/api/group-api-utils';

interface GroupDashboardProps {
	groups: Group[];
	setGroups: (groups: Group[]) => void;
	currentGroup: Group;
	setCurrentGroup: (group: Group) => void;
}

const GroupDashboard = (props: GroupDashboardProps) => {
	const { groups, setGroups, currentGroup, setCurrentGroup } = props;

	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);

	const handleGroupDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentGroup(
			props.groups.filter((group) => group.id === Number(e.target.value))[0]
		);
	};

	const handleOpenCreateGroupModal = () => setShowCreateGroupModal(true);
	const handleCloseCreateGroupModal = () => setShowCreateGroupModal(false);

	const handleOpenLeaveGroupModal = () => setShowLeaveGroupModal(true);
	const handleCloseLeaveGroupModal = () => setShowLeaveGroupModal(false);

	const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData(e.currentTarget);
		const groupName: string = formData.get('groupNameInput') as string;

		apiCreateNewGroup(groupName).then((group) => {
			if (group !== null) {
				setGroups(
					[...groups, group].sort((groupA, groupB) =>
						groupA.groupName.localeCompare(groupB.groupName)
					)
				);
				setCurrentGroup(group);
			}
		});

		handleCloseCreateGroupModal();
	};

	const handleLeaveGroup = (e: React.FormEvent) => {
		e.preventDefault();

		apiLeaveGroup(currentGroup.id).then((success) => {
			if (success) {
				setGroups(groups.filter((group) => group.id != currentGroup.id));
				setCurrentGroup(groups[0]);
			}
		});

		handleCloseLeaveGroupModal();
	};

	return (
		<>
			<div className="container mb-3">
				<div className="row">
					<div className="col-3">
						<GroupDropDown
							groups={groups}
							currentGroup={currentGroup}
							onChange={handleGroupDropdownChange}
						/>
					</div>
					<div className="col">
						<div className="container mt-4 px-0 d-flex justify-content-end gap-3">
							<button
								className="btn btn-sm btn-success"
								onClick={handleOpenCreateGroupModal}
							>
								Create new group
							</button>
							<button
								className="btn btn-sm btn-danger"
								onClick={handleOpenLeaveGroupModal}
							>
								Leave group
							</button>
						</div>
					</div>
				</div>
			</div>

			<CreateGroupModal
				show={showCreateGroupModal}
				handleClose={handleCloseCreateGroupModal}
				handleSubmit={handleCreateGroup}
			/>

			<LeaveGroupModal
				show={showLeaveGroupModal}
				handleClose={handleCloseLeaveGroupModal}
				handleSubmit={handleLeaveGroup}
				currentGroup={currentGroup}
			/>

			<div className="container">
				<Tabs
					defaultActiveKey="home"
					id="group-view-tabs"
					className="bg-white justify-content-start mb-3 h-auto"
				>
					<Tab eventKey="home" title="Home" className="pb-n3">
						<GroupHomeView currentGroup={currentGroup} />
					</Tab>
					<Tab eventKey="leaderboard" title="Leaderboard">
						Leaderboard
					</Tab>
					<Tab eventKey="members" title="Members">
						Members list
						<br />
						<MembersListView />
					</Tab>
					<Tab eventKey="games" title="Games">
						Games
					</Tab>
					<Tab eventKey="invite" title="Invite">
						Invite
					</Tab>
					<Tab eventKey="manage" title="Manage">
						Manage perms and kick users?
					</Tab>
				</Tabs>
			</div>
		</>
	);
};

export default GroupDashboard;
