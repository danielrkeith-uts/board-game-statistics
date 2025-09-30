import type { OwnedGame } from '../../../utils/types.ts';

interface OwnedGamesDropDownProps {
	games: OwnedGame[];
}

const OwnedGamedDropDown = (props: OwnedGamesDropDownProps) => {
	const { games } = props;
	return (
		<select className='form-select mt-3'>
			{games.map((game) => (
				<option value={game.gameId} key={game.gameId}>
					{game.gameName}
				</option>
			))}
		</select>
	);
};

export default OwnedGamedDropDown;
