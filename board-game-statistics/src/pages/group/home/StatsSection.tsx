import { useContext, useEffect, useState } from 'react';
import type { Group, PlayerStatistic } from '../../../utils/types';
import { apiGetPlayerStatsByGroupId } from '../../../utils/api/stats-api-utils';
import { AlertContext } from '../../../context/AlertContext';

interface StatsSectionProps {
	group: Group;
}

const StatsSection = (props: StatsSectionProps) => {
	const { group } = props;

	const { setError } = useContext(AlertContext);

	const [playerStats, setPlayerStats] = useState<PlayerStatistic | null>(
		null
	);

	useEffect(() => {
		apiGetPlayerStatsByGroupId(group.id)
			.then((res) => {
				setPlayerStats(res);
			})
			.catch((err: Error) => setError(err.message));
	}, [group]);

	return (
		<>
			{playerStats ? (
				<table className='table'>
					<tbody>
						<tr>
							<td>Wins</td>
							<td>{playerStats.wins}</td>
						</tr>
						<tr>
							<td>Losses</td>
							<td>{playerStats.losses}</td>
						</tr>
						<tr>
							<td>Win Rate</td>
							<td>
								{(playerStats.wins === 0
									? 0
									: (playerStats.wins /
											playerStats.numOfGamesPlayed) *
										100
								).toFixed(2)}
								%
							</td>
						</tr>
					</tbody>
				</table>
			) : (
				"Yo ass ain't play no games"
			)}
		</>
	);
};

export default StatsSection;
