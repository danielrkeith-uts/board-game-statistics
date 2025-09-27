import { useEffect, useState } from 'react';
import { apiGetGroupGames } from '../../../utils/api/games-api-utils';
import type { Group } from '../../../utils/types';
import EditRecordedGameModal, {
	type GameRecordDto,
} from '../games/EditRecordedGameModal';

interface Props {
	group: Group;
}

const GameResultsSection = (props: Props) => {
	const { group } = props;
	const [recent, setRecent] = useState<GameRecordDto[]>([]);
	const [selected, setSelected] = useState<GameRecordDto | null>(null);

	useEffect(() => {
		apiGetGroupGames(group.id)
			.then((data) => {
				const arr = Array.isArray(data) ? data : [];
				arr.sort(
					(a, b) =>
						new Date(b.datePlayed).getTime() -
						new Date(a.datePlayed).getTime()
				);
				setRecent(arr.slice(0, 3));
			})
			.catch(() => setRecent([]));
	}, [group.id]);

	return (
		<>
			<div className='list-group mt-3'>
				<h6>Game results</h6>
				{recent.length === 0 ? (
					<a
						href='#'
						className='list-group-item list-group-item-action'
					>
						No recent games
					</a>
				) : (
					<>
						{recent.map((r) => (
							<a
								key={r.playedGameId}
								href='#'
								className='list-group-item list-group-item-action d-flex justify-content-between'
								onClick={(e) => {
									e.preventDefault();
									setSelected(r);
								}}
							>
								<span>{`Game #${r.gameId}`}</span>
								<span className='text-muted'>
									{new Date(
										r.datePlayed
									).toLocaleDateString()}
								</span>
							</a>
						))}
					</>
				)}
			</div>

			<hr />

			<table className='table'>
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

			<EditRecordedGameModal
				record={selected}
				group={group}
				onClose={() => setSelected(null)}
				onDeleted={() => {
					setSelected(null);
					// Refresh recent list after delete
					apiGetGroupGames(group.id)
						.then((data) => {
							const arr = Array.isArray(data) ? data : [];
							arr.sort(
								(a, b) =>
									new Date(b.datePlayed).getTime() -
									new Date(a.datePlayed).getTime()
							);
							setRecent(arr.slice(0, 3));
						})
						.catch(() => {});
				}}
			/>
		</>
	);
};

export default GameResultsSection;
