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
								<a
									href='#'
									className='list-group-item list-group-item-action'
									key={leaderboardRow.accountId}
									onClick={() => {}}
								>
									{leaderboardRow.firstName}{' '}
									{leaderboardRow.lastName} - Points:{' '}
									{leaderboardRow.points}
								</a>
							)
						)
					)}
				</ul>
			</div>
		</>
	);
};

export default LeaderboardTableView;
