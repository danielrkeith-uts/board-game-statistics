import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import type { Group, GameRecordDto } from '../../../utils/types';
import RecordGameModal from './RecordGameModal.tsx';
import AlertMessage from '../AlertMessage';
import { apiGetGroupGames } from '../../../utils/api/games-api-utils';
import Spinner from 'react-bootstrap/Spinner';
import EditRecordedGameModal from './EditRecordedGameModal';
import { PermissionsContext } from '../../../context/PermissionsContext.tsx';

interface GroupGamesViewProps {
	group: Group;
}

const GroupGamesView = (props: GroupGamesViewProps) => {
	const { group } = props;
	const [showRecordModal, setShowRecordModal] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [records, setRecords] = useState<GameRecordDto[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selected, setSelected] = useState<GameRecordDto | null>(null);

	const { permissions } = useContext(PermissionsContext);
	const thisGroupsPermissions = permissions?.find(
		(groupPermissions) => groupPermissions.groupId === group.id
	)?.permissions;

	const handleOpenRecordModal = () => setShowRecordModal(true);
	const handleCloseRecordModal = () => setShowRecordModal(false);

	const fetchRecords = async () => {
		setLoading(true);
		try {
			const data = await apiGetGroupGames(group.id);
			setRecords(Array.isArray(data) ? (data as GameRecordDto[]) : []);
		} catch (e: unknown) {
			const message =
				e instanceof Error
					? e.message
					: 'Failed to load recorded games';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRecords();
	}, [group.id]);

	const renderRecordItem = (record: GameRecordDto) => {
		const displayDate = new Date(record.datePlayed).toLocaleDateString();
		const gameName = `Game #${record.gameId}`; // TODO: replace with real name

		// Find winners
		const winners = record.playerIds
			.filter((_ignored, index) => record.hasWon[index])
			.map((playerId) => {
				const member = group.members.find(
					(groupMember) => groupMember.id === playerId
				);
				return member
					? `${member.firstName} ${member.lastName}`
					: `Player ${playerId}`;
			});

		const winnerText =
			winners.length > 0 ? `Winners: ${winners.join(', ')}` : '';

		return (
			<li
				key={record.playedGameId}
				className='list-group-item d-flex justify-content-between align-items-center'
				role='button'
				onClick={() => setSelected(record)}
			>
				<span>
					{gameName}
					{winnerText ? ` • ${winnerText}` : ''}
				</span>
				<span className='text-muted'>{displayDate}</span>
			</li>
		);
	};

	return (
		<div className='container vstack gap-3'>
			<div className='d-flex justify-content-between align-items-center mt-2'>
				<h5 className='mb-0'>Games</h5>
				{thisGroupsPermissions?.includes('MANAGE_GAMES_PLAYED') && (
					<Button variant='success' onClick={handleOpenRecordModal}>
						Record game
					</Button>
				)}
			</div>

			{thisGroupsPermissions?.includes('MANAGE_GAMES_PLAYED') && (
				<div className='text-muted'>
					Use the button to record a game played in {group.groupName}.
				</div>
			)}

			<div className='mt-2'>
				<h6 className='mb-2'>Recorded games</h6>
				{loading ? (
					<div className='d-flex align-items-center gap-2'>
						<Spinner size='sm' /> Loading…
					</div>
				) : records.length === 0 ? (
					<div className='text-muted'>No games recorded yet.</div>
				) : (
					<ul className='list-group'>
						{records.map(renderRecordItem)}
					</ul>
				)}
			</div>

			<RecordGameModal
				show={showRecordModal}
				handleClose={handleCloseRecordModal}
				group={group}
				onSuccess={(msg) => {
					setSuccess(msg);
					fetchRecords();
				}}
				onError={(msg) => setError(msg)}
			/>

			<AlertMessage
				variant='success'
				message={success}
				setMessage={setSuccess}
			/>
			<AlertMessage
				variant='danger'
				message={error}
				setMessage={setError}
			/>

			<EditRecordedGameModal
				record={selected}
				group={group}
				onClose={() => setSelected(null)}
				onDeleted={() => fetchRecords()}
			/>
		</div>
	);
};

export default GroupGamesView;
