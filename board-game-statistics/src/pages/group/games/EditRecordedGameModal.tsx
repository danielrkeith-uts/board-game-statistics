import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiDeleteGameRecord } from '../../../utils/api/games-api-utils';
import type { Group, GameRecordDto } from '../../../utils/types';
import { PermissionsContext } from '../../../context/PermissionsContext';
import { AlertContext } from '../../../context/AlertContext';

interface EditRecordedGameModalProps {
	record: GameRecordDto | null;
	group: Group;
	onClose: () => void;
	onDeleted?: (recordId: number) => void;
}

const EditRecordedGameModal = (props: EditRecordedGameModalProps) => {
	const { record, group, onClose, onDeleted } = props;

	const { setSuccess, setError } = useContext(AlertContext);

	const [visibleRecord, setVisibleRecord] = useState<GameRecordDto | null>(
		null
	);

	const { getGroupPermissions, loading: permissionsLoading } =
		useContext(PermissionsContext);
	const thisGroupsPermissions = getGroupPermissions(group.id);

	useEffect(() => {
		if (record) {
			setVisibleRecord(record);
		}
	}, [record]);

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
			<Modal
				show={!!record}
				onHide={onClose}
				onExited={() => setVisibleRecord(null)}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{visibleRecord
							? visibleRecord.gameName ||
								`Game #${visibleRecord.gameId}`
							: 'Game details'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{visibleRecord && (
						<div className='vstack gap-2'>
							<div>
								<strong>Date: </strong>
								{new Date(
									visibleRecord.datePlayed
								).toLocaleDateString()}
							</div>
							<div>
								<strong>Players:</strong>
								<ul className='mb-0'>
									{visibleRecord.playerIds.map(
										(playerId, index) => {
											const member = group.members.find(
												(member) =>
													member.id === playerId
											);
											const playerName = member
												? `${member.firstName} ${member.lastName}`
												: `Player ${playerId}`;
											const points =
												visibleRecord.points[index] ||
												0;
											const team = `Team ${visibleRecord.playerTeams[index] || 1}`;
											const isWinner =
												visibleRecord.hasWon[index];
											return (
												<li key={playerId}>
													{playerName}
													{visibleRecord.winCondition !==
														'FIRST_TO_FINISH' &&
														` - ${points} points`}
													{` (${team})`}
													{isWinner ? ' 🏆' : ''}
												</li>
											);
										}
									)}
								</ul>
							</div>
						</div>
					)}
				</Modal.Body>
				<div className='d-flex justify-content-end gap-2 p-3 pt-0'>
					<Button variant='secondary' onClick={onClose}>
						Close
					</Button>
					{(permissionsLoading ||
						thisGroupsPermissions?.includes(
							'MANAGE_GAMES_PLAYED'
						)) && (
						<Button variant='danger' onClick={handleDelete}>
							Delete
						</Button>
					)}
				</div>
			</Modal>
		</>
	);
};

export default EditRecordedGameModal;
