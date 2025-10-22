import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import type { WinCondition, Player } from '../../../../utils/types';
import RecordPointsModal from './RecordPointsModal';

interface PlayersStepProps {
	groupPlayers: Player[];
	selectedPlayerIds: number[];
	onTogglePlayer: (playerId: number) => void;
	winCondition: WinCondition;
	numTeams: number | null;
	onNumTeamsChange: (numTeams: number) => void;
	playerIdToTeam: Record<number, string>;
	onPlayerTeamChange: (playerId: number, team: string) => void;
	playerPoints: Record<number, number>;
	onPlayerPointsChange: (playerId: number, points: number) => void;
	singleWinnerId: number | null;
	onSingleWinnerChange: (playerId: number) => void;
	teamWinner: string;
	onTeamWinnerChange: (team: string) => void;
}

const PlayersStep = (props: PlayersStepProps) => {
	const {
		groupPlayers,
		selectedPlayerIds,
		onTogglePlayer,
		winCondition,
		numTeams,
		onNumTeamsChange,
		playerIdToTeam,
		onPlayerTeamChange,
		playerPoints,
		onPlayerPointsChange,
		singleWinnerId,
		onSingleWinnerChange,
		teamWinner,
		onTeamWinnerChange,
	} = props;

	// State for points modal
	const [pointsModalShow, setPointsModalShow] = useState(false);
	const [selectedPlayerForPoints, setSelectedPlayerForPoints] = useState<{
		id: number;
		name: string;
	} | null>(null);

	// Handler functions for points modal
	const handleOpenPointsModal = (playerId: number, playerName: string) => {
		setSelectedPlayerForPoints({ id: playerId, name: playerName });
		setPointsModalShow(true);
	};

	const handleClosePointsModal = () => {
		setPointsModalShow(false);
		setSelectedPlayerForPoints(null);
	};

	const handleSavePoints = (points: number) => {
		if (selectedPlayerForPoints) {
			onPlayerPointsChange(selectedPlayerForPoints.id, points);
		}
	};

	// Helper function to format win condition display text
	const getWinConditionText = (condition: WinCondition): string => {
		switch (condition) {
			case 'COOPERATIVE':
				return 'Cooperative';
			case 'HIGH_SCORE':
				return 'High Score';
			case 'LOW_SCORE':
				return 'Low Score';
			case 'FIRST_TO_FINISH':
				return 'First to Finish';
			default:
				return 'Unknown';
		}
	};

	const getCurrentWinnerId = (): number | null => {
		if (selectedPlayerIds.length === 0) {
			return null;
		}

		if (winCondition === 'COOPERATIVE') {
			return null; // No single winner for cooperative games
		}

		if (winCondition === 'FIRST_TO_FINISH') {
			return singleWinnerId;
		}

		// For HIGH_SCORE and LOW_SCORE, calculate based on points
		const playersWithPoints = selectedPlayerIds
			.map((playerId) => ({
				id: playerId,
				points: playerPoints[playerId] || 0,
			}))
			.filter((player) => player.points > 0);

		if (playersWithPoints.length === 0) {
			return null;
		}

		const winner =
			winCondition === 'HIGH_SCORE'
				? playersWithPoints.reduce((bestPlayer, currentPlayer) =>
						currentPlayer.points > bestPlayer.points
							? currentPlayer
							: bestPlayer
					)
				: playersWithPoints.reduce((bestPlayer, currentPlayer) =>
						currentPlayer.points < bestPlayer.points
							? currentPlayer
							: bestPlayer
					);

		return winner.id;
	};

	const PlayerRow = (args: {
		playerId: number;
		name: string;
		winCondition: WinCondition;
		numTeams: number | null;
		playerIdToTeam: Record<number, string>;
		onPlayerTeamChange: (playerId: number, team: string) => void;
		playerPoints: Record<number, number>;
		isCurrentWinner: boolean;
	}) => {
		const {
			playerId,
			name,
			winCondition,
			numTeams,
			playerIdToTeam,
			onPlayerTeamChange,
			playerPoints,
			isCurrentWinner,
		} = args;
		return (
			<div
				key={playerId}
				className='d-flex align-items-center gap-2 p-2 border rounded'
			>
				<span className='fw-medium'>
					{isCurrentWinner && '🏆 '}
					{name}
				</span>
				{winCondition === 'COOPERATIVE' && (
					<Form.Select
						aria-label='Select team'
						size='sm'
						className='w-auto'
						value={playerIdToTeam[playerId] ?? 'unassigned'}
						onChange={(event) =>
							onPlayerTeamChange(playerId, event.target.value)
						}
					>
						<option value='unassigned'>Unassigned</option>
						{(numTeams ?? 0) >= 2
							? Array.from(
									{ length: numTeams ?? 0 },
									(_ignored, index) => `${index + 1}`
								).map((team) => (
									<option key={team} value={team}>
										{`Team ${team}`}
									</option>
								))
							: [
									<option key='1' value='1'>
										Team 1
									</option>,
									<option key='2' value='2'>
										Team 2
									</option>,
								]}
					</Form.Select>
				)}
				{winCondition !== 'FIRST_TO_FINISH' && (
					<Button
						variant='outline-secondary'
						size='sm'
						className='w-auto'
						onClick={() => handleOpenPointsModal(playerId, name)}
					>
						{playerPoints[playerId]
							? `${playerPoints[playerId]} pts`
							: 'Set Points'}
					</Button>
				)}
			</div>
		);
	};

	const SelectedPlayersList = () => {
		if (selectedPlayerIds.length === 0) {
			return null;
		}
		const currentWinnerId = getCurrentWinnerId();
		return (
			<div className='vstack gap-2'>
				{selectedPlayerIds.map((playerId) => {
					const player = groupPlayers.find(
						(groupPlayer) => groupPlayer.id === playerId
					);
					if (!player) {
						return null;
					}
					return (
						<PlayerRow
							key={playerId}
							playerId={playerId}
							name={player.name}
							winCondition={winCondition}
							numTeams={numTeams}
							playerIdToTeam={playerIdToTeam}
							onPlayerTeamChange={onPlayerTeamChange}
							playerPoints={playerPoints}
							isCurrentWinner={playerId === currentWinnerId}
						/>
					);
				})}
			</div>
		);
	};

	const TeamCountWarning = () => (
		<>
			{winCondition === 'COOPERATIVE' &&
				(numTeams === null || numTeams < 2) && (
					<div className='text-danger small mt-1'>
						Enter number of teams (2 or more).
					</div>
				)}
		</>
	);

	const TeamAssignmentWarning = () => (
		<>
			{winCondition === 'COOPERATIVE' &&
				(numTeams ?? 0) >= 2 &&
				selectedPlayerIds.length > 0 &&
				selectedPlayerIds.some(
					(playerId) => !playerIdToTeam[playerId]
				) && (
					<div className='text-danger small mt-1'>
						Assign a team to all selected players.
					</div>
				)}
		</>
	);

	const TeamEmptinessWarning = () => {
		if (winCondition !== 'COOPERATIVE' || (numTeams ?? 0) < 2) {
			return null;
		}
		const teamPlayerCounts = new Array(numTeams ?? 0).fill(0);
		selectedPlayerIds.forEach((playerId) => {
			const teamNumber = Number(playerIdToTeam[playerId] || '0');
			if (teamNumber >= 1 && teamNumber <= (numTeams ?? 0)) {
				teamPlayerCounts[teamNumber - 1]++;
			}
		});
		const hasEmptyTeam = teamPlayerCounts.some(
			(playerCount) => playerCount === 0
		);
		return hasEmptyTeam ? (
			<div className='text-danger small mt-1'>
				Each team must have at least one player.
			</div>
		) : null;
	};

	const SingleWinnerGroup = () => (
		<>
			{winCondition === 'FIRST_TO_FINISH' &&
				selectedPlayerIds.length > 0 && (
					<Form.Group className='mt-2'>
						<Form.Label>Winning player</Form.Label>
						<div>
							{selectedPlayerIds.map((playerIdOption) => (
								<Form.Check
									key={`singleWinner-${playerIdOption}`}
									inline
									type='radio'
									label={
										groupPlayers.find(
											(player) =>
												player.id === playerIdOption
										)?.name || `Player ${playerIdOption}`
									}
									name='singleWinner'
									id={`singleWinner-${playerIdOption}`}
									checked={singleWinnerId === playerIdOption}
									onChange={() =>
										onSingleWinnerChange(playerIdOption)
									}
								/>
							))}
						</div>
					</Form.Group>
				)}
		</>
	);

	const TeamWinnerGroup = () => (
		<>
			{winCondition === 'COOPERATIVE' && selectedPlayerIds.length > 0 && (
				<Form.Group className='mt-2'>
					<Form.Label>Winning team</Form.Label>
					<div>
						{(numTeams ?? 0) >= 2 &&
							Array.from(
								{ length: numTeams ?? 0 },
								(_, i) => `${i + 1}`
							).map((team) => (
								<Form.Check
									key={`teamWinner-${team}`}
									inline
									type='radio'
									label={`Team ${team}`}
									name='teamWinner'
									id={`teamWinner-${team}`}
									checked={teamWinner === team}
									onChange={() => onTeamWinnerChange(team)}
								/>
							))}
					</div>
				</Form.Group>
			)}
		</>
	);

	return (
		<div className='vstack gap-2'>
			<Form>
				<Form.Group>
					<Form.Label>Select players</Form.Label>
					<div className='mb-2'>
						<small className='text-muted'>
							<strong>Win Condition:</strong>{' '}
							{getWinConditionText(winCondition)}
						</small>
					</div>
					<Select
						isMulti
						options={groupPlayers.map((player) => ({
							value: player.id,
							label: player.name,
						}))}
						value={groupPlayers
							.filter((player) =>
								selectedPlayerIds.includes(player.id)
							)
							.map((player) => ({
								value: player.id,
								label: player.name,
							}))}
						onChange={(selectedOptions) => {
							const newSelectedIds = selectedOptions
								? selectedOptions.map(
										(option) => option.value as number
									)
								: [];

							const addedPlayers = newSelectedIds.filter(
								(playerId) =>
									!selectedPlayerIds.includes(playerId)
							);
							const removedPlayers = selectedPlayerIds.filter(
								(playerId) => !newSelectedIds.includes(playerId)
							);

							[...addedPlayers, ...removedPlayers].forEach(
								(playerId) => onTogglePlayer(playerId)
							);
						}}
						placeholder='Select players...'
						className='mb-3'
					/>

					{winCondition === 'COOPERATIVE' && (
						<Form.Group className='mb-3'>
							<Form.Label>Number of teams</Form.Label>
							<Form.Select
								value={numTeams || 2}
								onChange={(event) =>
									onNumTeamsChange(Number(event.target.value))
								}
							>
								{Array.from({ length: 9 }, (_, index) => (
									<option key={index + 2} value={index + 2}>
										{index + 2} teams
									</option>
								))}
							</Form.Select>
						</Form.Group>
					)}

					<SelectedPlayersList />
				</Form.Group>
				<TeamCountWarning />
				<TeamAssignmentWarning />
				<TeamEmptinessWarning />
				<SingleWinnerGroup />
				<TeamWinnerGroup />
				{winCondition === 'FIRST_TO_FINISH' &&
					selectedPlayerIds.length > 0 &&
					singleWinnerId === null && (
						<div className='text-danger small mt-1'>
							Select a winning player.
						</div>
					)}
				{winCondition === 'COOPERATIVE' &&
					selectedPlayerIds.length > 0 &&
					teamWinner === '' && (
						<div className='text-danger small mt-1'>
							Select a winning team.
						</div>
					)}
			</Form>

			{/* Points Modal */}
			<RecordPointsModal
				show={pointsModalShow}
				onHide={handleClosePointsModal}
				playerName={selectedPlayerForPoints?.name || ''}
				currentPoints={
					selectedPlayerForPoints
						? playerPoints[selectedPlayerForPoints.id] || 0
						: 0
				}
				onSave={handleSavePoints}
			/>
		</div>
	);
};

export default PlayersStep;
