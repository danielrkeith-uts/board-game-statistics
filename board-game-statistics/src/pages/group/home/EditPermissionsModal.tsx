import { Button, Form, Modal } from 'react-bootstrap';
import { PermissionNames } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import type { GroupMember, Permission } from '../../../utils/types';
import { getAccountFullName } from '../../../utils/util-methods';
import { apiGetPermissionOfGroupMember } from '../../../utils/api/permissions-api-utils';

interface EditPermissionsModalProps {
	member: GroupMember;
	groupId: number;
	show: boolean;
	handleClose: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditPermissionsModal = ({
	member,
	groupId,
	show,
	handleClose,
	handleSubmit,
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
			</form>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='success' type='submit'>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditPermissionsModal;
