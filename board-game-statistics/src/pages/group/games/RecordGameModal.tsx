import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import type {
	Group,
	RecordGamePayload,
	WinCondition,
	Game,
} from '../../../utils/types';
import {
	apiRecordGame,
	apiGetOwnedGames,
} from '../../../utils/api/games-api-utils';
import GameSelectionStep from './steps/GameSelectionStep';
import WinConditionStep from './steps/WinConditionStep';
import PlayersStep from './steps/PlayersStep';

interface RecordGameModalProps {
	show: boolean;
	handleClose: () => void;
	group: Group;
	onSuccess?: (message: string) => void;
	onError?: (message: string) => void;
}

const RecordGameModal = (props: RecordGameModalProps) => {
	const { show, handleClose, group, onSuccess, onError } = props;

	// Step management
	const [step, setStep] = useState<number>(1);

	// Games state
	const [ownedGames, setOwnedGames] = useState<Game[]>([]);
	const [gamesLoading, setGamesLoading] = useState<boolean>(false);
	const [gamesError, setGamesError] = useState<string | null>(null);

	const [selectedGameId, setSelectedGameId] = useState<string>('');
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
	const [winCondition, setWinCondition] = useState<WinCondition>('single');
	const [numTeams, setNumTeams] = useState<number | null>(2);
	const [playerIdToTeam, setPlayerIdToTeam] = useState<
		Record<number, string>
	>({});
	const [playerPoints, setPlayerPoints] = useState<Record<number, number>>(
		{}
	);
	const [singleWinnerId, setSingleWinnerId] = useState<number | null>(null);
	const [teamWinner, setTeamWinner] = useState<string>('');
	const [coopWinner, setCoopWinner] = useState<boolean | undefined>(
		undefined
	);

	// Load owned games when modal opens
	useEffect(() => {
		if (show) {
			loadOwnedGames();
		}
	}, [show]);

	const loadOwnedGames = async () => {
		setGamesLoading(true);
		setGamesError(null);
		try {
			const games = await apiGetOwnedGames();
			setOwnedGames(games);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Failed to load owned games';
			setGamesError(message);
			if (onError) {
				onError(message);
			}
		} finally {
			setGamesLoading(false);
		}
	};

	const handleNext = () =>
		setStep((currentStep) => Math.min(currentStep + 1, 3));
	const handleBack = () =>
		setStep((currentStep) => Math.max(currentStep - 1, 1));

	// Handler functions for PlayersStep
	const handlePlayerTeamChange = (playerId: number, team: string) => {
		setPlayerIdToTeam((prev) => ({
			...prev,
			[playerId]: team,
		}));
	};

	const handlePlayerPointsChange = (playerId: number, points: number) => {
		setPlayerPoints((prev) => ({
			...prev,
			[playerId]: points,
		}));
	};

	const resetAndClose = () => {
		setStep(1);
		setSelectedGameId('');
		setSelectedPlayerIds([]);
		setWinCondition('single');
		setNumTeams(2);
		setPlayerIdToTeam({});
		setPlayerPoints({});
		setSingleWinnerId(null);
		setTeamWinner('');
		setCoopWinner(undefined);
		setOwnedGames([]);
		setGamesError(null);
		handleClose();
	};

	const togglePlayer = (id: number) => {
		setSelectedPlayerIds((previousSelected) =>
			previousSelected.includes(id)
				? previousSelected.filter((playerId) => playerId !== id)
				: [...previousSelected, id]
		);

		// If enabling player in team mode, default to Team 1
		setPlayerIdToTeam((prev) => {
			const newMap = { ...prev };
			if (selectedPlayerIds.includes(id)) {
				delete newMap[id];
			} else if (winCondition === 'team') {
				newMap[id] = newMap[id] ?? '1';
			}
			return newMap;
		});

		// Clear winner when deselecting
		setSingleWinnerId((prev) => (prev === id ? null : prev));
	};

	// Use members from group as selectable players
	const groupPlayers = group.members.map((member) => ({
		id: member.id,
		name: `${member.firstName} ${member.lastName}`.trim(),
	}));

	const renderGameStep = () => {
		if (gamesLoading) {
			return <div>Loading games...</div>;
		}

		if (gamesError) {
			return (
				<div className='text-danger'>
					Error loading games: {gamesError}
				</div>
			);
		}

		return (
			<GameSelectionStep
				selectedGameId={selectedGameId}
				onGameChange={setSelectedGameId}
				games={ownedGames}
			/>
		);
	};

	const renderPlayersStep = () => (
		<PlayersStep
			groupPlayers={groupPlayers}
			selectedPlayerIds={selectedPlayerIds}
			onTogglePlayer={togglePlayer}
			winCondition={winCondition}
			numTeams={numTeams}
			playerIdToTeam={playerIdToTeam}
			onPlayerTeamChange={handlePlayerTeamChange}
			playerPoints={playerPoints}
			onPlayerPointsChange={handlePlayerPointsChange}
			singleWinnerId={singleWinnerId}
			onSingleWinnerChange={setSingleWinnerId}
			teamWinner={teamWinner}
			onTeamWinnerChange={setTeamWinner}
			coopWinner={coopWinner}
			onCoopWinnerChange={setCoopWinner}
		/>
	);

	const renderWinConditionStep = () => (
		<WinConditionStep
			winCondition={winCondition}
			onWinConditionChange={setWinCondition}
			numTeams={numTeams}
			onNumTeamsChange={setNumTeams}
		/>
	);

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return renderGameStep();
			case 2:
				return renderWinConditionStep();
			case 3:
				return renderPlayersStep();
			default:
				return null;
		}
	};

	const isNumTeamsValid =
		winCondition !== 'team' || (numTeams !== null && numTeams >= 2);

	const doAllPlayersHaveTeam =
		winCondition !== 'team' ||
		(selectedPlayerIds.length > 0 &&
			selectedPlayerIds.every((playerId) => {
				const teamNumber = Number(playerIdToTeam[playerId] || '0');
				return (
					teamNumber >= 1 &&
					(numTeams === null ? true : teamNumber <= numTeams)
				);
			}));

	const areAllTeamsNonEmpty =
		winCondition !== 'team' ||
		(() => {
			if (!isNumTeamsValid) {
				return false;
			}
			const teamPlayerCounts = new Array(numTeams ?? 0).fill(0);
			selectedPlayerIds.forEach((playerId) => {
				const teamNumber = Number(playerIdToTeam[playerId] || '0');
				if (teamNumber >= 1 && teamNumber <= (numTeams ?? 0)) {
					teamPlayerCounts[teamNumber - 1]++;
				}
			});
			return teamPlayerCounts.every((playerCount) => playerCount > 0);
		})();

	const isWinnerSelected =
		winCondition === 'single'
			? singleWinnerId !== null
			: winCondition === 'team'
				? teamWinner !== ''
				: coopWinner !== undefined;

	const handleSave = async () => {
		try {
			const playerIds = selectedPlayerIds;
			const points = selectedPlayerIds.map(
				(playerId) => playerPoints[playerId] || 0
			);
			const playerTeams = selectedPlayerIds.map((playerId) => {
				if (winCondition === 'team') {
					return Number(playerIdToTeam[playerId] || '1');
				} else {
					return null; // Solo or cooperative games
				}
			});
			const hasWon = selectedPlayerIds.map((playerId) => {
				if (winCondition === 'single') {
					return playerId === singleWinnerId;
				} else if (winCondition === 'team') {
					return (
						String(playerIdToTeam[playerId] || '1') === teamWinner
					);
				} else {
					// coop: all players have the same win status
					return coopWinner === true;
				}
			});

			const payload: RecordGamePayload = {
				groupId: group.id,
				gameId: Number(selectedGameId || 0),
				datePlayed: new Date().toISOString().split('T')[0],
				playerIds,
				points,
				playerTeams,
				hasWon,
			};
			await apiRecordGame(payload);
			if (onSuccess) {
				onSuccess('Game recorded successfully');
			}
			resetAndClose();
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to record game';
			if (onError) {
				onError(message);
			}
		}
	};

	return (
		<Modal show={show} onHide={resetAndClose} size='lg'>
			<Modal.Header closeButton>
				<Modal.Title>Record game</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='mb-3'>Step {step} of 3</div>
				{renderStepContent()}
			</Modal.Body>
			<Modal.Footer>
				{step > 1 && (
					<Button variant='secondary' onClick={handleBack}>
						Back
					</Button>
				)}
				{step < 3 ? (
					<Button
						variant='primary'
						onClick={handleNext}
						disabled={
							(step === 1 && !selectedGameId) ||
							(step === 2 &&
								winCondition === 'team' &&
								!isNumTeamsValid)
						}
					>
						Next
					</Button>
				) : (
					<Button
						variant='success'
						onClick={handleSave}
						disabled={
							(winCondition === 'team' &&
								(!isNumTeamsValid ||
									!doAllPlayersHaveTeam ||
									!areAllTeamsNonEmpty)) ||
							!isWinnerSelected
						}
					>
						Save
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default RecordGameModal;
