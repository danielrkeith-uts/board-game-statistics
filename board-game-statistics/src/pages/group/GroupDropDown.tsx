import type { ChangeEvent } from 'react';
import type { Group } from '../../utils/types';

interface GroupDropDownProps {
	groups: Group[];
	currentGroup: Group;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const GroupDropDown = (props: GroupDropDownProps) => {
	return (
		<select
			className="form-select mt-3"
			name=""
			id=""
			onChange={props.onChange}
			value={props.currentGroup.id}
		>
			{props.groups.map((group) => (
				<option value={group.id} key={group.id}>
					{group.groupName}
				</option>
			))}
		</select>
	);
};

export default GroupDropDown;
