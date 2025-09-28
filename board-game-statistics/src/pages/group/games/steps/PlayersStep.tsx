import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import type { WinCondition, Player } from '../../../../utils/types';

interface PlayersStepProps {
	groupPlayers: Player[];
	selectedPlayerIds: number[];
	onTogglePlayer: (playerId: number) => void;
	winCondition: WinCondition;
	numTeams: number | '';
	playerIdToTeam: Record<number, string>;
	onPlayerTeamChange: (playerId: number, team: string) => void;
	playerPoints: Record<number, number>;
	onPlayerPointsChange: (playerId: number, points: number) => void;
	singleWinnerId: number | null;
	onSingleWinnerChange: (playerId: number) => void;
	teamWinner: string;
	onTeamWinnerChange: (team: string) => void;
	coopWinner: boolean | undefined;
	onCoopWinnerChange: (won: boolean) => void;
}

const PlayersStep = (props: PlayersStepProps) => {
	const {
		groupPlayers,
		selectedPlayerIds,
		onTogglePlayer,
		winCondition,
		numTeams,
		playerIdToTeam,
		onPlayerTeamChange,
		playerPoints,
		onPlayerPointsChange,
		singleWinnerId,
		onSingleWinnerChange,
		teamWinner,
		onTeamWinnerChange,
		coopWinner,
		onCoopWinnerChange,
	} = props;

	return (
		<div className='vstack gap-2'>
			<Form>
				<Form.Group>
					<Form.Label>Select players</Form.Label>
					<Select
						isMulti
						options={groupPlayers.map((p) => ({
							value: p.id,
							label: p.name,
						}))}
						value={groupPlayers
							.filter((p) => selectedPlayerIds.includes(p.id))
							.map((p) => ({
								value: p.id,
								label: p.name,
							}))}
						onChange={(selectedOptions) => {
							const newSelectedIds = selectedOptions
								? selectedOptions.map(
										(option) => option.value as number
									)
								: [];

							const addedPlayers = newSelectedIds.filter(
								(id) => !selectedPlayerIds.includes(id)
							);
							const removedPlayers = selectedPlayerIds.filter(
								(id) => !newSelectedIds.includes(id)
							);

							[...addedPlayers, ...removedPlayers].forEach((id) =>
								onTogglePlayer(id)
							);
						}}
						placeholder='Select players...'
						className='mb-3'
					/>

					{selectedPlayerIds.length > 0 && (
						<div className='vstack gap-2'>
							{selectedPlayerIds.map((playerId) => {
								const player = groupPlayers.find(
									(p) => p.id === playerId
								);
								if (!player) {
									return null;
								}

								return (
									<div
										key={playerId}
										className='d-flex align-items-center gap-2 p-2 border rounded'
									>
										<span className='fw-medium'>
											{player.name}
										</span>
										{winCondition === 'team' && (
											<Form.Select
												aria-label='Select team'
												size='sm'
												className='w-auto'
												value={
													playerIdToTeam[playerId] ??
													'1'
												}
												onChange={(e) =>
													onPlayerTeamChange(
														playerId,
														e.target.value
													)
												}
											>
												{(numTeams || 0) >= 2
													? Array.from(
															{
																length: Number(
																	numTeams
																),
															},
															(_, i) => `${i + 1}`
														).map((t) => (
															<option
																key={t}
																value={t}
															>
																{`Team ${t}`}
															</option>
														))
													: [
															<option
																key='1'
																value='1'
															>
																Team 1
															</option>,
															<option
																key='2'
																value='2'
															>
																Team 2
															</option>,
														]}
											</Form.Select>
										)}
										<Form.Control
											type='number'
											size='sm'
											className='w-auto'
											placeholder='Points'
											value={playerPoints[playerId] || ''}
											onChange={(e) =>
												onPlayerPointsChange(
													playerId,
													Number(e.target.value) || 0
												)
											}
										/>
									</div>
								);
							})}
						</div>
					)}
				</Form.Group>
				{winCondition === 'team' &&
					(numTeams === '' || Number(numTeams) < 2) && (
						<div className='text-danger small mt-1'>
							Enter number of teams (2 or more).
						</div>
					)}
				{winCondition === 'team' &&
					Number(numTeams) >= 2 &&
					selectedPlayerIds.length > 0 &&
					selectedPlayerIds.some((pid) => !playerIdToTeam[pid]) && (
						<div className='text-danger small mt-1'>
							Assign a team to all selected players.
						</div>
					)}
				{winCondition === 'team' &&
					Number(numTeams) >= 2 &&
					(() => {
						const totals = new Array(Number(numTeams)).fill(0);
						selectedPlayerIds.forEach((pid) => {
							const t = Number(playerIdToTeam[pid] || '0');
							if (t >= 1 && t <= Number(numTeams)) {
								totals[t - 1]++;
							}
						});
						return totals.some((c) => c === 0);
					})() && (
						<div className='text-danger small mt-1'>
							Each team must have at least one player.
						</div>
					)}
				{winCondition === 'single' && selectedPlayerIds.length > 0 && (
					<Form.Group className='mt-2'>
						<Form.Label>Winning player</Form.Label>
						<div>
							{selectedPlayerIds.map((pid) => (
								<Form.Check
									key={`singleWinner-${pid}`}
									inline
									type='radio'
									label={
										groupPlayers.find((p) => p.id === pid)
											?.name || `Player ${pid}`
									}
									name='singleWinner'
									id={`singleWinner-${pid}`}
									checked={singleWinnerId === pid}
									onChange={() => onSingleWinnerChange(pid)}
								/>
							))}
						</div>
					</Form.Group>
				)}
				{winCondition === 'team' && selectedPlayerIds.length > 0 && (
					<Form.Group className='mt-2'>
						<Form.Label>Winning team</Form.Label>
						<div>
							{(numTeams || 0) >= 2 &&
								Array.from(
									{ length: Number(numTeams) },
									(_, i) => `${i + 1}`
								).map((t) => (
									<Form.Check
										key={`teamWinner-${t}`}
										inline
										type='radio'
										label={`Team ${t}`}
										name='teamWinner'
										id={`teamWinner-${t}`}
										checked={teamWinner === t}
										onChange={() => onTeamWinnerChange(t)}
									/>
								))}
						</div>
					</Form.Group>
				)}
				{winCondition === 'coop' && selectedPlayerIds.length > 0 && (
					<Form.Group className='mt-2'>
						<Form.Label>Game outcome</Form.Label>
						<div>
							<Form.Check
								inline
								type='radio'
								label='Win'
								name='coopWinner'
								id='coopWinner-true'
								checked={coopWinner === true}
								onChange={() => onCoopWinnerChange(true)}
							/>
							<Form.Check
								inline
								type='radio'
								label='Lose'
								name='coopWinner'
								id='coopWinner-false'
								checked={coopWinner === false}
								onChange={() => onCoopWinnerChange(false)}
							/>
						</div>
					</Form.Group>
				)}
				{winCondition === 'single' &&
					selectedPlayerIds.length > 0 &&
					singleWinnerId === null && (
						<div className='text-danger small mt-1'>
							Select a winning player.
						</div>
					)}
				{winCondition === 'team' &&
					selectedPlayerIds.length > 0 &&
					teamWinner === '' && (
						<div className='text-danger small mt-1'>
							Select a winning team.
						</div>
					)}
				{winCondition === 'coop' &&
					selectedPlayerIds.length > 0 &&
					coopWinner === undefined && (
						<div className='text-danger small mt-1'>
							Select whether the team won or lost.
						</div>
					)}
			</Form>
		</div>
	);
};

export default PlayersStep;
