import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface RecordPointsModalProps {
	show: boolean;
	onHide: () => void;
	playerName: string;
	currentPoints: number;
	onSave: (points: number) => void;
}

const RecordPointsModal = (props: RecordPointsModalProps) => {
	const { show, onHide, playerName, currentPoints, onSave } = props;
	const [points, setPoints] = useState<string>(currentPoints.toString());
	const [error, setError] = useState<string>('');

	// Update local state when currentPoints changes
	useEffect(() => {
		setPoints(currentPoints.toString());
		setError(''); // Clear error when points change
	}, [currentPoints]);

	const handleSave = () => {
		const pointsNumber = Number(points) || 0;

		// Clear previous error
		setError('');

		// Validate points range
		if (pointsNumber < 0) {
			setError('Points cannot be negative');
			return;
		}

		if (pointsNumber > 99999) {
			setError('Points cannot exceed 99,999');
			return;
		}

		onSave(pointsNumber);
		onHide();
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSave();
		}
	};

	return (
		<Modal show={show} onHide={onHide} size='sm' centered>
			<Modal.Header closeButton>
				<Modal.Title>Record Points</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label>Points for {playerName}</Form.Label>
					<Form.Control
						type='number'
						value={points}
						onChange={(e) => {
							setPoints(e.target.value);
							setError(''); // Clear error when user types
						}}
						onKeyPress={handleKeyPress}
						placeholder='Enter points'
						autoFocus
						isInvalid={!!error}
					/>
					{error && (
						<Form.Control.Feedback type='invalid'>
							{error}
						</Form.Control.Feedback>
					)}
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RecordPointsModal;
