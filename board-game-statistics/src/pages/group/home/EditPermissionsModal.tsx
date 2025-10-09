import { Button, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import type { GroupMember, Permission } from '../../../utils/types';
import { getAccountFullName } from '../../../utils/util-methods';
import {
	apiGetPermissionOfGroupMember,
	apiSetGroupMemberPermissions,
} from '../../../utils/api/permissions-api-utils';

interface PermissionName {
	permission: Permission;
	name: string;
}

const PermissionNames: PermissionName[] = [
	{ permission: 'MANAGE_MEMBERS', name: 'Manage members' },
	{
		permission: 'MANAGE_MEMBER_PERMISSIONS',
		name: 'Manage member permissions',
	},
	{ permission: 'MANAGE_GAMES_PLAYED', name: 'Manage games played' },
];

interface EditPermissionsModalProps {
	member: GroupMember;
	groupId: number;
	show: boolean;
	handleClose: () => void;
}

const EditPermissionsModal = ({
	member,
	groupId,
	show,
	handleClose,
}: EditPermissionsModalProps) => {
	const [permissions, setPermissions] = useState<Set<Permission>>(
		new Set<Permission>()
	);

	useEffect(() => {
		apiGetPermissionOfGroupMember(member.id, groupId).then((data) =>
			setPermissions(data)
		);
	}, [member]);

	const togglePermission = (permission: Permission) =>
		setPermissions((prevSet) => {
			const nextSet = new Set<Permission>(prevSet);
			if (nextSet.has(permission)) {
				nextSet.delete(permission);
			} else {
				nextSet.add(permission);
			}
			return nextSet;
		});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		apiSetGroupMemberPermissions(member.id, groupId, permissions).finally(
			() => handleClose()
		);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					Edit permissions for {getAccountFullName(member)}
				</Modal.Title>
			</Modal.Header>
			<form id='editPermissionsForm' onSubmit={handleSubmit}>
				<Modal.Body>
					<div className='form-floating'>
						{PermissionNames.map(({ permission, name }) => (
							<Form.Check
								key={String(permission)}
								type='checkbox'
								label={name}
								checked={permissions.has(permission)}
								onChange={() => {
									togglePermission(permission);
								}}
							/>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='success' type='submit'>
						Submit
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default EditPermissionsModal;
