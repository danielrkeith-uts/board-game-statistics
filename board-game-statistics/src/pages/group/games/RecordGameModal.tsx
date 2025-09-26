import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { Group } from '../../../utils/types';

type WinCondition = 'single' | 'team';

interface RecordGameModalProps {
	show: boolean;
	handleClose: () => void;
	group: Group;
}

const RecordGameModal = (props: RecordGameModalProps) => {
	const { show, handleClose } = props;

	// Step management
	const [step, setStep] = useState<number>(1);

	const [selectedGameId, setSelectedGameId] = useState<string>('');
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
	const [winCondition, setWinCondition] = useState<WinCondition>('single');
	const [numTeams, setNumTeams] = useState<number | ''>('');
	const [playerIdToTeam, setPlayerIdToTeam] = useState<
		Record<string, string>
	>({});
	const [singleWinnerId, setSingleWinnerId] = useState<string>('');
	const [teamWinner, setTeamWinner] = useState<string>('');
	const [notes, setNotes] = useState<string>('');

	const handleNext = () => setStep((s) => Math.min(s + 1, 3));
	const handleBack = () => setStep((s) => Math.max(s - 1, 1));

	const resetAndClose = () => {
		setStep(1);
		setSelectedGameId('');
		setSelectedPlayerIds([]);
		setWinCondition('single');
		setNumTeams('');
		setPlayerIdToTeam({});
		setSingleWinnerId('');
		setTeamWinner('');
		setNotes('');
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

	// Placeholder data; will be wired later
	const placeholderGames = [
		{ id: '1', name: 'Sample game 1' },
		{ id: '2', name: 'Sample game 2' },
	];
	const placeholderPlayers = [
		{ id: 'u1', name: 'Alice' },
		{ id: 'u2', name: 'Bob' },
		{ id: 'u3', name: 'Charlie' },
	];

	const renderGameStep = () => (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Select game</Form.Label>
				<Form.Select
					value={selectedGameId}
					onChange={(e) => setSelectedGameId(e.target.value)}
				>
					<option value=''>Choose…</option>
					{placeholderGames.map((g) => (
						<option key={g.id} value={g.id}>
							{g.name}
						</option>
					))}
				</Form.Select>
			</Form.Group>
		</Form>
	);

	const renderPlayersStep = () => (
		<div className='vstack gap-2'>
			<Form>
				<Form.Group>
					<Form.Label>Select players</Form.Label>
					<div className='d-flex flex-column'>
						{placeholderPlayers.map((p) => (
							<div
								key={p.id}
								className='d-flex align-items-center gap-2 mb-1'
							>
								<Form.Check
									type='checkbox'
									label={p.name}
									checked={selectedPlayerIds.includes(p.id)}
									onChange={() => togglePlayer(p.id)}
								/>
								{winCondition === 'team' &&
									selectedPlayerIds.includes(p.id) && (
										<Form.Select
											aria-label='Select team'
											size='sm'
											className='w-auto'
											value={playerIdToTeam[p.id] ?? '1'}
											onChange={(e) =>
												setPlayerIdToTeam((prev) => ({
													...prev,
													[p.id]: e.target.value,
												}))
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
														>{`Team ${t}`}</option>
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
							</div>
						))}
					</div>
				</Form.Group>
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
										placeholderPlayers.find(
											(p) => p.id === pid
										)?.name || pid
									}
									name='singleWinner'
									id={`singleWinner-${pid}`}
									checked={singleWinnerId === pid}
									onChange={() => setSingleWinnerId(pid)}
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
										onChange={() => setTeamWinner(t)}
									/>
								))}
						</div>
					</Form.Group>
				)}
				<Form.Group className='mt-3'>
					<Form.Label>Notes (optional)</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
				</Form.Group>
			</Form>
		</div>
	);

	const renderWinConditionStep = () => (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Win condition</Form.Label>
				<Form.Select
					value={winCondition}
					onChange={(e) =>
						setWinCondition(e.target.value as WinCondition)
					}
				>
					<option value='single'>Single winner</option>
					<option value='team'>Team-based</option>
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
							setNumTeams(v === '' ? '' : Math.max(2, Number(v)));
						}}
					/>
				</Form.Group>
			)}
		</Form>
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
					<Button variant='primary' onClick={handleNext}>
						Next
					</Button>
				) : (
					<Button variant='success' onClick={resetAndClose}>
						Save
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default RecordGameModal;
