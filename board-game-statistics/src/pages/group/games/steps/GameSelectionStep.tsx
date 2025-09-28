import Form from 'react-bootstrap/Form';
import type { Game } from '../../../../utils/types';

interface GameSelectionStepProps {
	selectedGameId: string;
	onGameChange: (gameId: string) => void;
	games: Game[];
}

const GameSelectionStep = (props: GameSelectionStepProps) => {
	const { selectedGameId, onGameChange, games } = props;

	return (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Select game</Form.Label>
				<Form.Select
					value={selectedGameId}
					onChange={(e) => onGameChange(e.target.value)}
				>
					<option value=''>Choose…</option>
					{games.map((game) => (
						<option key={game.id} value={game.id}>
							{game.name}
						</option>
					))}
				</Form.Select>
			</Form.Group>
		</Form>
	);
};

export default GameSelectionStep;
