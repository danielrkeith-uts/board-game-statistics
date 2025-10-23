import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiCreateOrAddOwnedCustom } from '../../utils/api/games-api-utils';
import type { Game, WinCondition } from '../../utils/types';

interface Props {
	show: boolean;
	onClose: () => void;
	onAdded?: (game: Game) => void;
}

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	}
	if (typeof err === 'string') {
		return err;
	}
	return 'Failed to add game.';
}

export default function AddCustomGameModal({ show, onClose, onAdded }: Props) {
	const [name, setName] = useState('');
	const [publisher, setPublisher] = useState('');
	const [winCondition, setWinCondition] =
		useState<WinCondition>('HIGH_SCORE');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (show) {
			setName('');
			setPublisher('');
			setWinCondition('HIGH_SCORE');
			setSubmitting(false);
			setError(null);
		}
	}, [show]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!name.trim()) {
			setError('Please enter a game name.');
			return;
		}

		setSubmitting(true);
		try {
			const game = await apiCreateOrAddOwnedCustom({
				name: name.trim(),
				publisher: publisher.trim() || null,
				winCondition,
			});
			onAdded?.(game);
			onClose();
		} catch (err: unknown) {
			setError(getErrorMessage(err));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal show={show} onHide={onClose} centered>
			<Form onSubmit={onSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Add a game</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <div className='alert alert-danger'>{error}</div>}

					<div className='form-floating mb-3'>
						<input
							id='customGameName'
							className='form-control'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<label htmlFor='customGameName'>Game name</label>
					</div>

					<div className='form-floating mb-3'>
						<input
							id='customGamePublisher'
							className='form-control'
							placeholder='Publisher (optional)'
							value={publisher}
							onChange={(e) => setPublisher(e.target.value)}
						/>
						<label htmlFor='customGamePublisher'>
							Publisher (optional)
						</label>
					</div>

					<Form.Group className='mb-2'>
						<Form.Label className='mb-1'>Win condition</Form.Label>
						<Form.Select
							value={winCondition}
							onChange={(e) =>
								setWinCondition(e.target.value as WinCondition)
							}
						>
							<option value='HIGH_SCORE'>
								Highest score wins
							</option>
							<option value='LOW_SCORE'>Lowest score wins</option>
							<option value='FIRST_TO_FINISH'>
								First to finish
							</option>
							<option value='COOPERATIVE'>
								Co-operative / team success
							</option>
						</Form.Select>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={onClose}
						disabled={submitting}
					>
						Cancel
					</Button>
					<Button
						variant='success'
						type='submit'
						disabled={submitting}
					>
						{submitting ? 'Adding…' : 'Add game'}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
