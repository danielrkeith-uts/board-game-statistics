import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiDeleteGameRecord } from '../../../utils/api/games-api-utils';
import type { Group } from '../../../utils/types';
import AlertMessage from '../AlertMessage';

type WinCondition = 'single' | 'team';

export interface GameRecordDto {
	recordId: number;
	groupId: number;
	gameId: number;
	dateIso?: string;
	winCondition: WinCondition;
	numTeams?: number;
	notes?: string;
	playerIds?: number[];
	teamAssignments?: number[];
	winner?: string;
	played_at?: string;
}

interface EditRecordedGameModalProps {
	record: GameRecordDto | null;
	group: Group;
	onClose: () => void;
	onDeleted?: (recordId: number) => void;
}

const EditRecordedGameModal = (props: EditRecordedGameModalProps) => {
	const { record, group, onClose, onDeleted } = props;
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleDelete = async () => {
		if (!record) {return;}
		try {
			await apiDeleteGameRecord(record.recordId);
			if (onDeleted) {onDeleted(record.recordId);}
			setSuccess('Game deleted successfully');
			onClose();
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Failed to delete';
			setError(message);
		}
	};

	return (
		<>
			<Modal show={!!record} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{record ? `Game #${record.gameId}` : 'Game details'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{record && (
						<div className='vstack gap-2'>
							<div>
								<strong>Date & time: </strong>
								{new Date(
									record.dateIso ||
										record.played_at ||
										Date.now()
								).toLocaleString()}
							</div>
							{record.winCondition === 'single' &&
								record.winner && (
									<div>
										<strong>Winner: </strong>
										{(() => {
											const m = group.members.find(
												(gm) =>
													String(gm.id) ===
													String(record.winner)
											);
											return m
												? `${m.firstName} ${m.lastName}`
												: record.winner;
										})()}
									</div>
								)}
							{record.winCondition === 'team' &&
								record.winner && (
									<div>
										<strong>Winning team: </strong>
										Team {record.winner}
									</div>
								)}
							<div>
								<strong>Players:</strong>
								<ul className='mb-0'>
									{(record.playerIds || []).map((pid) => {
										const m = group.members.find(
											(gm) => gm.id === pid
										);
										return (
											<li key={pid}>
												{m
													? `${m.firstName} ${m.lastName}`
													: `Player #${pid}`}
												{record.winCondition ===
													'team' &&
												record.teamAssignments &&
												record.teamAssignments
													.length ===
													(record.playerIds || [])
														.length
													? ` (Team ${record.teamAssignments[(record.playerIds || []).indexOf(pid)]})`
													: ''}
											</li>
										);
									})}
								</ul>
							</div>
							{record.notes && (
								<div>
									<strong>Notes:</strong>
									<div className='text-muted'>
										{record.notes}
									</div>
								</div>
							)}
						</div>
					)}
				</Modal.Body>
				<div className='d-flex justify-content-end gap-2 p-3 pt-0'>
					<Button variant='secondary' onClick={onClose}>
						Close
					</Button>
					<Button variant='danger' onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</Modal>
			<AlertMessage
				variant='danger'
				message={error}
				setMessage={setError}
			/>
			<AlertMessage
				variant='success'
				message={success}
				setMessage={setSuccess}
			/>
		</>
	);
};

export default EditRecordedGameModal;
