import { useEffect, useState } from 'react';
import { apiGetGroupGames } from '../../../utils/api/games-api-utils';
import type { Group, GameRecordDto } from '../../../utils/types';
import EditRecordedGameModal from '../games/EditRecordedGameModal';
import StatsSection from './StatsSection';

interface Props {
	group: Group;
}

const GameResultsSection = (props: Props) => {
	const { group } = props;
	const [recent, setRecent] = useState<GameRecordDto[]>([]);
	const [selected, setSelected] = useState<GameRecordDto | null>(null);

	const fetchAndSetRecentGames = () => {
		apiGetGroupGames(group.id)
			.then((gameRecords) => {
				const gameRecordsArray = Array.isArray(gameRecords)
					? gameRecords
					: [];
				gameRecordsArray.sort(
					(firstGame, secondGame) =>
						new Date(secondGame.datePlayed).getTime() -
						new Date(firstGame.datePlayed).getTime()
				);
				setRecent(gameRecordsArray.slice(0, 3));
			})
			.catch(() => setRecent([]));
	};

	useEffect(() => {
		fetchAndSetRecentGames();
	}, [group.id]);

	return (
		<div className='d-flex flex-column justify-content-space-between'>
			<div className='gameResultsSection'>
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
							{recent.map((record) => (
								<a
									key={record.playedGameId}
									href='#'
									className='list-group-item list-group-item-action d-flex justify-content-between'
									onClick={(e) => {
										e.preventDefault();
										setSelected(record);
									}}
								>
									<span>{`Game #${record.gameId}`}</span>
									<span className='text-muted'>
										{new Date(
											record.datePlayed
										).toLocaleDateString()}
									</span>
								</a>
							))}
						</>
					)}
				</div>
			</div>

			<hr />

			<StatsSection group={group} />

			<EditRecordedGameModal
				record={selected}
				group={group}
				onClose={() => setSelected(null)}
				onDeleted={() => {
					setSelected(null);
					fetchAndSetRecentGames();
				}}
			/>
		</div>
	);
};

export default GameResultsSection;
