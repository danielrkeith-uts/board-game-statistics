import Form from 'react-bootstrap/Form';

type WinCondition = 'single' | 'team' | 'coop';

interface WinConditionStepProps {
	winCondition: WinCondition;
	onWinConditionChange: (condition: WinCondition) => void;
	numTeams: number | '';
	onNumTeamsChange: (numTeams: number | '') => void;
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
					onChange={(e) =>
						onWinConditionChange(e.target.value as WinCondition)
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
						value={numTeams}
						onChange={(e) => {
							const v = e.target.value;
							onNumTeamsChange(
								v === '' ? '' : Math.max(2, Number(v))
							);
						}}
					/>
					{(numTeams === '' || Number(numTeams) < 2) && (
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
