import { useEffect, useState } from 'react';
import type { OwnedGame } from '../../../utils/types.ts';
import { apiOwnedGames } from '../../../utils/api/leaderboard-api-utils.ts';
import OwnedGamesDropDown from './OwnedGamesDropDown.tsx';

const GameLeaderboardView = () => {
	const [games, setGames] = useState<OwnedGame[]>([]);

	useEffect(() => {
		apiOwnedGames(1)
			.then((games) => setGames(games))
			.catch((err: Error) => console.log(err));
	}, []);

	return (
		<>
			<OwnedGamesDropDown games={games} />
		</>
	);
};

export default GameLeaderboardView;
