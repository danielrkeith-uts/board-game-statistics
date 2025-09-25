import { Dropdown } from 'react-bootstrap';
import { type Group, type GroupMember } from '../../../utils/types';
import { formatDate, getAccountFullName } from '../../../utils/util-methods';
import KebabDropdownToggle from '../../../components/KebabDropdownToggle';
import { useContext, useEffect, useState } from 'react';
import { PermissionsContext } from '../../../context/PermissionsContext';
import { apiGetGroupOwner } from '../../../utils/api/permissions-api-utils';
import EditPermissionsModal from './EditPermissionsModal';

interface MembersSectionProps {
	group: Group;
}

const MembersSection = (props: MembersSectionProps) => {
	const { group } = props;

	const [ownerEmail, setOwnerEmail] = useState('');

	const [editPermissionsModalMember, setEditPermissionsModalMember] =
		useState<GroupMember>(group.members[0]);
	const [showEditPermissions, setShowEditPermissions] = useState(false);

	const { permissions } = useContext(PermissionsContext);

	useEffect(() => {
		apiGetGroupOwner(group.id).then((email) => setOwnerEmail(email));
	}, [group.id]);

	const groupPermissions = permissions?.find(
		(p) => p.groupId === group.id
	)?.permissions;

	const canEditPermissions = groupPermissions?.includes(
		'MANAGE_MEMBER_PERMISSIONS'
	);
	const canRemoveMembers = groupPermissions?.includes('MANAGE_MEMBERS');

	const editPermissions = (member: GroupMember) => {
		setEditPermissionsModalMember(member);
		setShowEditPermissions(true);
	};

	return (
		<>
			<EditPermissionsModal
				member={editPermissionsModalMember}
				groupId={group.id}
				show={showEditPermissions}
				handleClose={() => setShowEditPermissions(false)}
				handleSubmit={() => {}}
			/>
			<div className='scrollable-table mt-1'>
				<table id='memberTable' className='table'>
					<thead className='position-sticky'>
						<tr>
							<th scope='col'>Name</th>
							<th scope='col'>Date joined</th>
							<th scope='col' />
						</tr>
					</thead>
					<tbody>
						{group.members.map((member) => (
							<tr key={member.email}>
								<td>
									{getAccountFullName(member)}{' '}
									{member.email === ownerEmail ? (
										<span className='badge text-bg-secondary ms-2'>
											Owner
										</span>
									) : null}
								</td>
								<td>
									{formatDate(new Date(member.joinTimestamp))}
								</td>
								<td>
									{(canEditPermissions ||
										canRemoveMembers) && (
										<Dropdown
											align='end'
											className='dropdown'
											onSelect={(eventKey) => {
												switch (eventKey) {
													case 'editPermissions':
														editPermissions(member);
														break;
													case 'removeMember':
														break;
													default:
														break;
												}
											}}
										>
											<Dropdown.Toggle
												as={KebabDropdownToggle}
											/>
											<Dropdown.Menu>
												{canEditPermissions && (
													<Dropdown.Item eventKey='editPermissions'>
														Edit Permissions
													</Dropdown.Item>
												)}
												{canRemoveMembers && (
													<Dropdown.Item eventKey='removeMember'>
														Remove member
													</Dropdown.Item>
												)}
											</Dropdown.Menu>
										</Dropdown>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default MembersSection;
