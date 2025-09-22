import { useEffect, useRef, useState } from 'react';
import {
	apiCreateNewGroup,
	apiGetGroupsByAccountId,
	apiLeaveGroup,
} from '../../utils/api/group-api-utils.ts';
import type { Group } from '../../utils/types.ts';
import Spinner from 'react-bootstrap/Spinner';
import GroupDashboard from './GroupDashboard.tsx';
import CreateGroupModal from './CreateGroupModal.tsx';
import LeaveGroupModal from './LeaveGroupModal.tsx';
import CreateGroupButton from './CreateGroupButton.tsx';
import AlertMessage from './AlertMessage.tsx';

const GroupView = () => {
	// Data state
	const [groups, setGroups] = useState<Group[]>([]);
	const [currentGroup, setCurrentGroup] = useState<Group>();
	// Modal state
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
	// Status state
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const sortGroupsAlphabetically = (groups: Group[]) =>
		groups.sort((groupA, groupB) =>
			groupA.groupName.localeCompare(groupB.groupName)
		);

	const updateGroupState = (groups: Group[]) =>
		setGroups(sortGroupsAlphabetically(groups));

	const handleOpenCreateGroupModal = () => setShowCreateGroupModal(true);
	const handleCloseCreateGroupModal = () => setShowCreateGroupModal(false);

	const handleOpenLeaveGroupModal = () => setShowLeaveGroupModal(true);
	const handleCloseLeaveGroupModal = () => setShowLeaveGroupModal(false);

	const minPageLoadTime: number = 700;
	const minErrorPopupTime: number = 8000;
	const minSuccessPopupTime: number = 5000;

	const successTimeout = useRef<number | undefined>(undefined);
	const errorTimeout = useRef<number | undefined>(undefined);

	// On page load, get groups for current user
	useEffect(() => {
		setIsLoading(true);

		apiGetGroupsByAccountId()
			.then((groups) => {
				setGroups(groups ? groups : []);

				if (groups.length > 0) {
					setCurrentGroup(groups[0]);
				}
			})
			.catch((err: Error) => setError(err.message))
			.finally(() =>
				setTimeout(() => setIsLoading(false), minPageLoadTime)
			);
	}, []);

	// Hide alert popups after set delay. If the user closes the alert, cancel the timeout
	useEffect(() => {
		if (success) {
			successTimeout.current = setTimeout(
				() => setSuccess(null),
				minSuccessPopupTime
			);
		} else {
			clearTimeout(successTimeout.current);
		}
	}, [success]);

	useEffect(() => {
		if (error) {
			errorTimeout.current = setTimeout(
				() => setError(null),
				minErrorPopupTime
			);
		} else {
			clearTimeout(errorTimeout.current);
		}
	}, [error]);

	const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData(e.currentTarget);
		const groupName: string = formData.get('groupNameInput') as string;

		apiCreateNewGroup(groupName)
			.then((group) => {
				setSuccess(`Created new group ${group.groupName}`);

				updateGroupState([...groups, group]);
				setCurrentGroup(group);
			})
			.catch((err: Error) => setError(err.message));

		handleCloseCreateGroupModal();
	};

	const handleLeaveGroup = (e: React.FormEvent) => {
		e.preventDefault();

		if (currentGroup !== undefined) {
			apiLeaveGroup(currentGroup.id)
				.then(() => {
					setSuccess(
						`Left group ${currentGroup.groupName} successfully!`
					);

					// Remove group from state
					const filteredGroups = groups.filter(
						(group) => group.id !== currentGroup.id
					);

					updateGroupState(filteredGroups);
					setCurrentGroup(filteredGroups[0]);
				})
				.catch((err: Error) => setError(err.message));

			handleCloseLeaveGroupModal();
		} else {
			// Handle error - user is not a member of any groups
		}
	};

	return (
		<>
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

			{isLoading ? (
				<div className='container centerContainer flex-column'>
					<h5 className='mb-3'>Fetching group data</h5>
					<Spinner />
				</div>
			) : currentGroup ? (
				<GroupDashboard
					groups={groups}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
					handleOpenCreateGroupModal={handleOpenCreateGroupModal}
					handleOpenLeaveGroupModal={handleOpenLeaveGroupModal}
				/>
			) : (
				<div className='container centerContainer flex-column'>
					<h4>You are currently not a member of any groups.</h4>
					<CreateGroupButton onClick={handleOpenCreateGroupModal} />
				</div>
			)}

			<AlertMessage
				variant='danger'
				message={error}
				setMessage={setError}
			/>
			<AlertMessage
				variant='success'
				message={success}
				setMessage={setSuccess}
			/>
		</>
	);
};

export default GroupView;
