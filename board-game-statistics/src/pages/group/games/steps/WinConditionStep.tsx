import Form from 'react-bootstrap/Form';
import type { Dispatch, SetStateAction } from 'react';
import type { WinCondition } from '../../../../utils/types';

interface WinConditionStepProps {
	winCondition: WinCondition;
	onWinConditionChange: (condition: WinCondition) => void;
	numTeams: number | null;
	onNumTeamsChange: Dispatch<SetStateAction<number | null>>;
}

const WinConditionStep = (props: WinConditionStepProps) => {
	const { winCondition, onWinConditionChange, numTeams, onNumTeamsChange } =
		props;

	return (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Win condition</Form.Label>
				<Form.Select
					value={winCondition}
					onChange={(event) =>
						onWinConditionChange(event.target.value as WinCondition)
					}
				>
					<option value='single'>Single winner</option>
					<option value='team'>Team-based</option>
					<option value='coop'>Cooperative</option>
				</Form.Select>
			</Form.Group>
			{winCondition === 'team' && (
				<Form.Group className='mb-3'>
					<Form.Label>Number of teams</Form.Label>
					<Form.Control
						type='number'
						min={2}
						placeholder='e.g. 2'
						value={numTeams ?? 2}
						onChange={(event) => {
							const inputValue = event.target.value;
							onNumTeamsChange(
								inputValue === ''
									? null
									: Math.max(2, Number(inputValue))
							);
						}}
					/>
					{(numTeams === null || numTeams < 2) && (
						<Form.Text className='text-danger'>
							Please enter at least 2 teams.
						</Form.Text>
					)}
				</Form.Group>
			)}
		</Form>
	);
};

export default WinConditionStep;
