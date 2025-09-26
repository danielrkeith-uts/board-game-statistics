import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import type { Group } from '../../../utils/types';
import RecordGameModal from './RecordGameModal.tsx';

interface GroupGamesViewProps {
	group: Group;
}

const GroupGamesView = (props: GroupGamesViewProps) => {
	const { group } = props;
	const [showRecordModal, setShowRecordModal] = useState(false);

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
			/>
		</div>
	);
};

export default GroupGamesView;
