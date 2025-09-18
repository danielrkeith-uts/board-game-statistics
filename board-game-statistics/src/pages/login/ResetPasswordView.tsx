import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const ResetPasswordView = () => {
	const [passwordA, setPasswordA] = useState('');
	const [passwordB, setPasswordB] = useState('');

	return (
		<Container fluid>
			<h1 className='mb-3 text-center'>Reset Password</h1>
			<Form>
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
		</Container>
	);
};

export default ResetPasswordView;
