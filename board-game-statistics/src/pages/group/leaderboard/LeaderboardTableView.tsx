import type { LeaderboardRow } from '../../../utils/types.ts';

interface LeaderboardTableViewProps {
	leaderboardRows: LeaderboardRow[];
}

const LeaderboardTableView = (props: LeaderboardTableViewProps) => {
	return (
		<>
			<div className='list-group mt-3'>
				<h3>Leaderboard:</h3>
				<ul>
					{props.leaderboardRows.length === 0 ? (
						<h4>No entries found for game.</h4>
					) : (
						props.leaderboardRows.map(
							(leaderboardRow: LeaderboardRow) => (
								<li key={leaderboardRow.accountId}>
									{leaderboardRow.firstName}{' '}
									{leaderboardRow.lastName} - Points:{' '}
									{leaderboardRow.points}
								</li>
							)
						)
					)}
				</ul>
			</div>
		</>
	);
};

export default LeaderboardTableView;
