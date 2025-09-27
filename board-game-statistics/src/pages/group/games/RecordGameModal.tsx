import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import type { Group } from '../../../utils/types';
import {
	apiRecordGame,
	type RecordGamePayload,
} from '../../../utils/api/games-api-utils';
import GameSelectionStep from './steps/GameSelectionStep';
import WinConditionStep from './steps/WinConditionStep';
import PlayersStep from './steps/PlayersStep';

type WinCondition = 'single' | 'team' | 'coop';

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

	const [selectedGameId, setSelectedGameId] = useState<string>('');
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
	const [winCondition, setWinCondition] = useState<WinCondition>('single');
	const [numTeams, setNumTeams] = useState<number | ''>('');
	const [playerIdToTeam, setPlayerIdToTeam] = useState<
		Record<string, string>
	>({});
	const [playerPoints, setPlayerPoints] = useState<Record<string, number>>(
		{}
	);
	const [singleWinnerId, setSingleWinnerId] = useState<string>('');
	const [teamWinner, setTeamWinner] = useState<string>('');
	const [coopWinner, setCoopWinner] = useState<boolean | undefined>(
		undefined
	);

	const handleNext = () => setStep((s) => Math.min(s + 1, 3));
	const handleBack = () => setStep((s) => Math.max(s - 1, 1));

	// Handler functions for PlayersStep
	const handlePlayerTeamChange = (playerId: string, team: string) => {
		setPlayerIdToTeam((prev) => ({
			...prev,
			[playerId]: team,
		}));
	};

	const handlePlayerPointsChange = (playerId: string, points: number) => {
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
		setNumTeams('');
		setPlayerIdToTeam({});
		setPlayerPoints({});
		setSingleWinnerId('');
		setTeamWinner('');
		setCoopWinner(undefined);
		handleClose();
	};

	const togglePlayer = (id: string) => {
		setSelectedPlayerIds((prev) =>
			prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
		);

		// If enabling player in team mode, default to Team 1
		setPlayerIdToTeam((prev) => {
			const next = { ...prev };
			if (selectedPlayerIds.includes(id)) {
				delete next[id];
			} else if (winCondition === 'team') {
				next[id] = next[id] ?? '1';
			}
			return next;
		});

		// Clear winner when deselecting
		setSingleWinnerId((prev) => (prev === id ? '' : prev));
	};

	// Placeholder games list; TODO: replace with owned games
	const placeholderGames = [
		{ id: String(1), name: 'Sample game 1' },
		{ id: String(2), name: 'Sample game 2' },
	];

	// Use members from group as selectable players
	const groupPlayers = group.members.map((m) => ({
		id: String(m.id),
		name: `${m.firstName} ${m.lastName}`.trim(),
	}));

	const renderGameStep = () => (
		<GameSelectionStep
			selectedGameId={selectedGameId}
			onGameChange={setSelectedGameId}
			games={placeholderGames}
		/>
	);

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

	const numTeamsValid =
		winCondition !== 'team' || (numTeams !== '' && Number(numTeams) >= 2);
	const allPlayersHaveTeam =
		winCondition !== 'team' ||
		(selectedPlayerIds.length > 0 &&
			selectedPlayerIds.every((pid) => {
				const t = Number(playerIdToTeam[pid] || '0');
				return (
					t >= 1 && (numTeams === '' ? true : t <= Number(numTeams))
				);
			}));
	const allTeamsNonEmpty =
		winCondition !== 'team' ||
		(() => {
			if (!numTeamsValid) {
				return false;
			}
			const totals = new Array(Number(numTeams)).fill(0);
			selectedPlayerIds.forEach((pid) => {
				const t = Number(playerIdToTeam[pid] || '0');
				if (t >= 1 && t <= Number(numTeams)) {
					totals[t - 1]++;
				}
			});
			return totals.every((c) => c > 0);
		})();
	const winnerSelected =
		winCondition === 'single'
			? singleWinnerId !== ''
			: winCondition === 'team'
				? teamWinner !== ''
				: coopWinner !== undefined;

	const handleSave = async () => {
		try {
			const playerIds = selectedPlayerIds.map(
				(pid) => Number(pid.replace(/\D/g, '')) || 0
			);
			const points = selectedPlayerIds.map(
				(pid) => playerPoints[pid] || 0
			);
			const playerTeams = selectedPlayerIds.map((pid) => {
				if (winCondition === 'team') {
					return `Team ${playerIdToTeam[pid] || '1'}`;
				} else if (winCondition === 'coop') {
					return 'Cooperative';
				}
				return 'Solo';
			});
			const hasWon = selectedPlayerIds.map((pid) => {
				if (winCondition === 'single') {
					return String(pid) === singleWinnerId;
				} else if (winCondition === 'team') {
					return String(playerIdToTeam[pid] || '1') === teamWinner;
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
							step === 2 &&
							winCondition === 'team' &&
							!numTeamsValid
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
								(!numTeamsValid ||
									!allPlayersHaveTeam ||
									!allTeamsNonEmpty)) ||
							!winnerSelected
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
