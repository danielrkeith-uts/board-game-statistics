import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface UpdateProfileModalProps {
	show: boolean;
	onClose: () => void;
	onConfirm: (password: string) => void;
	error?: string | null;
	isUpdating?: boolean;
	onClearError?: () => void;
	onResetUpdating?: () => void;
}

export default function UpdateProfileModal({
	show,
	onClose,
	onConfirm,
	error,
	isUpdating,
	onClearError,
	onResetUpdating,
}: UpdateProfileModalProps) {
	const [password, setPassword] = useState('');
	const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false);

	useEffect(() => {
		if (show) {
			setPassword('');
			setHasInvalidCredentials(false);
		}
	}, [show]);

	const handleConfirm = (e: React.FormEvent) => {
		e.preventDefault();
		if (!password) {
			setHasInvalidCredentials(true);
			return;
		}
		setHasInvalidCredentials(false);
		onConfirm(password);
	};

	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Update Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleConfirm}>
					<Form.Group className='mb-3' controlId='loginForm.password'>
						<Form.Label>
							Enter Password To Confirm Changes
						</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setHasInvalidCredentials(false);
								if (onClearError) {
									onClearError();
								}
								if (onResetUpdating) {
									onResetUpdating();
								}
							}}
						/>
					</Form.Group>
					{hasInvalidCredentials && (
						<p className='text-danger'>Password is required</p>
					)}
					{error && <p className='text-danger'>{error}</p>}
					<Button type='submit' disabled={isUpdating}>
						{isUpdating ? 'Updating...' : 'Confirm'}
					</Button>
				</form>
			</Modal.Body>
		</Modal>
	);
}
