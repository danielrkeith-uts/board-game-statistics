import type { OwnedGame } from '../../../utils/types.ts';
import type { ChangeEvent } from 'react';

interface OwnedGamesDropDownProps {
	games: OwnedGame[];
	onSelectedGameChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const OwnedGamedDropDown = (props: OwnedGamesDropDownProps) => {
	const { games } = props;
	return (
		<select
			className='form-select mt-3'
			onChange={props.onSelectedGameChange}
			defaultValue={0}
		>
			<option disabled value={0}>
				Please select a game
			</option>
			{games.map((game) => (
				<option value={game.gameId} key={game.gameId}>
					{game.gameName}
				</option>
			))}
		</select>
	);
};

export default OwnedGamedDropDown;
