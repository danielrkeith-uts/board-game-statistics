import type { GroupMember } from '../../../utils/types';
import { formatDate, getAccountFullName } from '../../../utils/util-methods';

interface MembersSectionProps {
	members: GroupMember[];
}

const MembersSection = (props: MembersSectionProps) => {
	const members = props.members;

	// Change later to draw from permissions
	const ownerEmail = 'matthew@adler.id.au';

	return (
		<div className='scrollable-table mt-1'>
			<table id='memberTable' className='table'>
				<thead className='position-sticky'>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Date joined</th>
					</tr>
				</thead>
				<tbody>
					{members.map((member) => (
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
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MembersSection;
