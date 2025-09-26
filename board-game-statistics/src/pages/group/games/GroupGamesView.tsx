import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import type { Group } from '../../../utils/types';
import RecordGameModal from './RecordGameModal.tsx';
import AlertMessage from '../AlertMessage';

interface GroupGamesViewProps {
	group: Group;
}

const GroupGamesView = (props: GroupGamesViewProps) => {
	const { group } = props;
	const [showRecordModal, setShowRecordModal] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleOpenRecordModal = () => setShowRecordModal(true);
	const handleCloseRecordModal = () => setShowRecordModal(false);

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

			<RecordGameModal
				show={showRecordModal}
				handleClose={handleCloseRecordModal}
				group={group}
				onSuccess={(msg) => setSuccess(msg)}
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
		</div>
	);
};

export default GroupGamesView;
