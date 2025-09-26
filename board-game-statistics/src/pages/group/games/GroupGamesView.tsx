import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import type { Group } from '../../../utils/types';
import RecordGameModal from './RecordGameModal.tsx';
import AlertMessage from '../AlertMessage';
import { apiGetGroupGames } from '../../../utils/api/games-api-utils';
import Spinner from 'react-bootstrap/Spinner';
import EditRecordedGameModal, {
	type GameRecordDto,
} from './EditRecordedGameModal';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [group.id]);

	return (
		<div className='container vstack gap-3'>
			<div className='d-flex justify-content-between align-items-center mt-2'>
				<h5 className='mb-0'>Games</h5>
				<Button variant='success' onClick={handleOpenRecordModal}>
					Record game
				</Button>
			</div>

			<div className='text-muted'>
				Use the button to record a game played in {group.groupName}.
			</div>

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
						{records.map((r) => {
							const displayDate = new Date(
								r.dateIso || r.played_at || Date.now()
							).toLocaleDateString();
							const gameName = `Game #${r.gameId}`; // TODO: replace with real name
							const winnerText =
								r.winCondition === 'single'
									? r.winner
										? `Winner: ${(() => {
												const m = group.members.find(
													(m) =>
														String(m.id) ===
														String(r.winner)
												);
												return m
													? `${m.firstName} ${m.lastName}`
													: r.winner;
											})()}`
										: ''
									: r.winner
										? `Winning team: Team ${r.winner}`
										: '';
							return (
								<li
									key={r.recordId}
									className='list-group-item d-flex justify-content-between align-items-center'
									role='button'
									onClick={() => setSelected(r)}
								>
									<span>
										{gameName}
										{winnerText ? ` • ${winnerText}` : ''}
									</span>
									<span className='text-muted'>
										{displayDate}
									</span>
								</li>
							);
						})}
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
