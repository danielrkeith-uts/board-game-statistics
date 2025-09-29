import type { ChangeEvent } from 'react';
import type { Group } from '../../utils/types';
import GroupDropDown from './GroupDropDown';
import CreateGroupButton from './CreateGroupButton';
import EnterInviteCodeView from './EnterInviteCodeView.tsx';

interface GroupManagementHeaderProps {
	groups: Group[];
	currentGroup: Group;
	handleGroupDropdownChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	handleOpenCreateGroupModal: () => void;
	handleOpenLeaveGroupModal: () => void;
}

const GroupManagementHeader = (props: GroupManagementHeaderProps) => {
	const {
		groups,
		currentGroup,
		handleGroupDropdownChange,
		handleOpenCreateGroupModal,
		handleOpenLeaveGroupModal,
	} = props;

	return (
		<div className='container mb-3'>
			<div className='row'>
				<div className='col-3'>
					<GroupDropDown
						groups={groups}
						currentGroup={currentGroup}
						onChange={handleGroupDropdownChange}
					/>
					<br />
					<EnterInviteCodeView />
				</div>
				<div className='col'>
					<div className='container mt-4 px-0 d-flex justify-content-end gap-3'>
						<CreateGroupButton
							onClick={handleOpenCreateGroupModal}
							size='sm'
						/>
						<button
							className='btn btn-sm btn-danger'
							onClick={handleOpenLeaveGroupModal}
						>
							Leave group
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupManagementHeader;
