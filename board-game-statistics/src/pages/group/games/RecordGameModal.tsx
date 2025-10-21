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
import PlayersStep from './steps/PlayersStep';

interface RecordGameModalProps {
	show: boolean;
	handleClose: () => void;
	group: Group;
	onSuccess?: (message: string) => void;
	onError?: (message: string) => void;
}

const mapWinCondition = (winCondition: WinCondition): WinCondition => {
	switch (winCondition) {
		case 'HIGH_SCORE':
		case 'LOW_SCORE':
		case 'FIRST_TO_FINISH':
		case 'COOPERATIVE':
		default:
			return winCondition;
	}
};

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
	const [winCondition, setWinCondition] =
		useState<WinCondition>('HIGH_SCORE');
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
		setStep((currentStep) => Math.min(currentStep + 1, 2));
	const handleBack = () =>
		setStep((currentStep) => Math.max(currentStep - 1, 1));

	// Handler for game selection - automatically set win condition
	const handleGameChange = (gameId: string) => {
		setSelectedGameId(gameId);
		if (gameId) {
			const selectedGame = ownedGames.find(
				(game) => game.id === Number(gameId)
			);
			if (selectedGame) {
				const mappedWinCondition = mapWinCondition(
					selectedGame.winCondition
				);
				setWinCondition(mappedWinCondition);
			}
		}
	};

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
		setWinCondition('HIGH_SCORE');
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

		// Clear team assignments when deselecting players
		setPlayerIdToTeam((prev) => {
			const newMap = { ...prev };
			if (selectedPlayerIds.includes(id)) {
				delete newMap[id];
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
				onGameChange={handleGameChange}
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

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return renderGameStep();
			case 2:
				return renderPlayersStep();
			default:
				return null;
		}
	};

	const isWinnerSelected =
		winCondition === 'COOPERATIVE'
			? coopWinner !== undefined
			: winCondition === 'FIRST_TO_FINISH'
				? singleWinnerId !== null
				: selectedPlayerIds.length > 0; // HIGH/LOW score only need players and points

	const handleSave = async () => {
		try {
			const playerIds = selectedPlayerIds;
			const points = selectedPlayerIds.map(
				(playerId) => playerPoints[playerId] || 0
			);
			const playerTeams = selectedPlayerIds.map(() => {
				return null;
			});

			let getSingleWinnerId: number | null = singleWinnerId;

			if (winCondition === 'HIGH_SCORE' && selectedPlayerIds.length > 0) {
				getSingleWinnerId = selectedPlayerIds.reduce(
					(bestId, playerId) => {
						const currentBest = playerPoints[bestId] || 0;
						const candidate = playerPoints[playerId] || 0;
						return candidate > currentBest ? playerId : bestId;
					},
					selectedPlayerIds[0]
				);
			} else if (
				winCondition === 'LOW_SCORE' &&
				selectedPlayerIds.length > 0
			) {
				getSingleWinnerId = selectedPlayerIds.reduce(
					(bestId, playerId) => {
						const currentBest = playerPoints[bestId] || 0;
						const candidate = playerPoints[playerId] || 0;
						return candidate < currentBest ? playerId : bestId;
					},
					selectedPlayerIds[0]
				);
			}

			const hasWon = selectedPlayerIds.map((playerId) => {
				if (winCondition === 'COOPERATIVE') {
					return coopWinner === true;
				} else {
					return playerId === getSingleWinnerId;
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
				<div className='mb-3'>Step {step} of 2</div>
				{renderStepContent()}
			</Modal.Body>
			<Modal.Footer>
				{step > 1 && (
					<Button variant='secondary' onClick={handleBack}>
						Back
					</Button>
				)}
				{step < 2 ? (
					<Button
						variant='primary'
						onClick={handleNext}
						disabled={step === 1 && !selectedGameId}
					>
						Next
					</Button>
				) : (
					<Button
						variant='success'
						onClick={handleSave}
						disabled={!isWinnerSelected}
					>
						Save
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default RecordGameModal;
