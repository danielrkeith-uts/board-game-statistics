import type { Group } from '../../utils/types';
import { formatDate, getAccountFullName } from '../../utils/util-methods';

interface GroupHomeViewProps {
	currentGroup: Group;
}

const GroupHomeView = (props: GroupHomeViewProps) => {
	const { members } = props.currentGroup;

	return (
		<div className="container mt-3 mh-70">
			<div className="row">
				<div className="col-3 border">
					<div className="container vstack">
						<div className="list-group mt-3">
							<h6>Available games</h6>
							<a href="#" className="list-group-item list-group-item-action">
								Sample game
							</a>
							<a href="#" className="list-group-item list-group-item-action">
								Sample game
							</a>
							<a href="#" className="list-group-item list-group-item-action">
								Sample game
							</a>
						</div>
					</div>
				</div>
				<div className="col border">
					<table className="table mt-1">
						{/* Populate members table */}
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Date joined</th>
							</tr>
						</thead>
						<tbody>
							{members.map((member) => (
								<tr key={member.email}>
									<td>{getAccountFullName(member)}</td>
									<td>{formatDate(new Date(member.joinTimestamp))}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="col-3 border">
					<div className="list-group mt-3">
						<h6>Game results</h6>
						<a href="#" className="list-group-item list-group-item-action">
							Sample game
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							Sample game
						</a>
						<a href="#" className="list-group-item list-group-item-action">
							Sample game
						</a>
					</div>

					<hr />

					<table className="table">
						<tbody>
							<tr>
								<td>Sample Wins</td>
								<td>3</td>
							</tr>
							<tr>
								<td>Sample Losses</td>
								<td>2</td>
							</tr>
							<tr>
								<td>Sample Points</td>
								<td>-</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default GroupHomeView;
