import { Dropdown } from 'react-bootstrap';
import type { Group } from '../../../utils/types';
import { formatDate, getAccountFullName } from '../../../utils/util-methods';
import KebabDropdownToggle from '../../../components/KebabDropdownToggle';
import { useContext } from 'react';
import { PermissionsContext } from '../../../context/PermissionsContext';

interface MembersSectionProps {
	group: Group;
}

const MembersSection = (props: MembersSectionProps) => {
	const { group } = props;

	const { permissions } = useContext(PermissionsContext);
	const groupPermissions = permissions?.find(
		(p) => p.groupId === group.id
	)?.permissions;

	const canEditPermissions = groupPermissions?.includes(
		'MANAGE_MEMBER_PERMISSIONS'
	);
	const canRemoveMembers = groupPermissions?.includes('MANAGE_MEMBERS');

	// Change later to draw from permissions
	const ownerEmail = 'matthew@adler.id.au';

	return (
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
										Owner{' '}
										{/* Replace w a yellow crown icon */}
									</span>
								) : null}
							</td>
							<td>
								{formatDate(new Date(member.joinTimestamp))}
							</td>
							<td>
								{(canEditPermissions || canRemoveMembers) && (
									<Dropdown align='end' className='dropdown'>
										<Dropdown.Toggle
											as={KebabDropdownToggle}
										></Dropdown.Toggle>
										<Dropdown.Menu>
											{canEditPermissions && (
												<Dropdown.Item>
													Edit Permissions
												</Dropdown.Item>
											)}
											{canRemoveMembers && (
												<Dropdown.Item>
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
	);
};

export default MembersSection;
