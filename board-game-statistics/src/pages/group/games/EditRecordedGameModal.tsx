import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiDeleteGameRecord } from '../../../utils/api/games-api-utils';
import type { Group } from '../../../utils/types';
import AlertMessage from '../AlertMessage';

export interface GameRecordDto {
	playedGameId: number;
	groupId: number;
	gameId: number;
	datePlayed: string;
	playerIds: number[];
	points: number[];
	playerTeams: string[];
	hasWon: boolean[];
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
		if (!record) {
			return;
		}
		try {
			await apiDeleteGameRecord(record.playedGameId);
			if (onDeleted) {
				onDeleted(record.playedGameId);
			}
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
								<strong>Date: </strong>
								{new Date(
									record.datePlayed
								).toLocaleDateString()}
							</div>
							<div>
								<strong>Players:</strong>
								<ul className='mb-0'>
									{record.playerIds.map((playerId, index) => {
										const member = group.members.find(
											(m) => m.id === playerId
										);
										const playerName = member
											? `${member.firstName} ${member.lastName}`
											: `Player ${playerId}`;
										const points =
											record.points[index] || 0;
										const team =
											record.playerTeams[index] ||
											'No team';
										const isWinner = record.hasWon[index];
										return (
											<li key={playerId}>
												{playerName} - {points} points (
												{team}) {isWinner ? '🏆' : ''}
											</li>
										);
									})}
								</ul>
							</div>
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
