import { type ChangeEvent, useEffect, useState } from 'react';
import type { Group, LeaderboardRow, OwnedGame } from '../../../utils/types.ts';
import {
	apiGetLeaderboardRows,
	apiGetOwnedGames,
} from '../../../utils/api/leaderboard-api-utils.ts';
import OwnedGamesDropDown from './OwnedGamesDropDown.tsx';
import LeaderboardTableView from './LeaderboardTableView.tsx';

interface GameLeaderboardViewProps {
	currentGroup: Group;
}

const GameLeaderboardView = (props: GameLeaderboardViewProps) => {
	const [games, setGames] = useState<OwnedGame[]>([]);
	const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>(
		[]
	);
	const [currentGameId, setCurrentGameId] = useState<number>(0);

	const onSelectedGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentGameId(
			games.filter(
				(game: OwnedGame) => game.gameId === Number(e.target.value)
			)[0].gameId
		);
	};

	const onSelectedGroupChange = () => {
		apiGetOwnedGames(props.currentGroup.id)
			.then((games) => setGames(games))
			.catch((err: Error) => console.log(err));
		if (games.length > 0) {
			setCurrentGameId(games[0].gameId);
		}
	};

	useEffect(() => {
		onSelectedGroupChange();
	}, [props.currentGroup.id]);

	useEffect(() => {
		apiGetLeaderboardRows(props.currentGroup.id, currentGameId)
			.then((leaderboardRows) => setLeaderboardRows(leaderboardRows))
			.catch((err: Error) => console.log(err));
	}, [currentGameId]);

	return (
		<>
			{currentGameId}
			<OwnedGamesDropDown
				games={games}
				onSelectedGameChange={onSelectedGameChange}
			/>
			<LeaderboardTableView leaderboardRows={leaderboardRows} />
		</>
	);
};

export default GameLeaderboardView;
