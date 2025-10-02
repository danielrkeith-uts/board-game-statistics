import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { apiResetPassword } from '../../utils/api/account-api-utils';

interface ForgotPasswordNewPasswordStepProps {
	code: number;
	email: string;
	nextStep: () => void;
}

const ForgotPasswordNewPasswordStep = ({
	code,
	email,
	nextStep,
}: ForgotPasswordNewPasswordStepProps) => {
	const [passwordA, setPasswordA] = useState('');
	const [passwordB, setPasswordB] = useState('');
	const [error, setError] = useState('');

	const clearPasswords = () => {
		setPasswordA('');
		setPasswordB('');
	};

	const handleSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		if (passwordA !== passwordB) {
			setError('Passwords do not match');
			clearPasswords();
			return;
		}

		apiResetPassword(code, email, passwordA).then((res) => {
			if (res.ok) {
				nextStep();
			} else {
				setError(res.message || 'Could not reset password');
				clearPasswords();
			}
		});
	};

	return (
		<Container fluid>
			<h1 className='mb-3 text-center'>Reset Password</h1>
			<Form onSubmit={handleSubmission}>
				<Form.Group
					className='mb-3'
					controlId='resetPassword.passwordA'
				>
					<Form.Label>New password</Form.Label>
					<Form.Control
						type='password'
						value={passwordA}
						onChange={(e) => {
							setPasswordA(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group
					className='mb-3'
					controlId='resetPassword.passwordB'
				>
					<Form.Label>Confirm new password</Form.Label>
					<Form.Control
						type='password'
						value={passwordB}
						onChange={(e) => {
							setPasswordB(e.target.value);
						}}
					/>
				</Form.Group>
				<Button type='submit'>Reset Password</Button>
			</Form>
			{error && <p className='text-danger mt-3'>{error}</p>}
		</Container>
	);
};

export default ForgotPasswordNewPasswordStep;
