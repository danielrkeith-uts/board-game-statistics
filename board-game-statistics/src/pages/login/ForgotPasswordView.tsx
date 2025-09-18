import { Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const ForgotPasswordView = () => {
	const [email, setEmail] = useState('');

	return (
		<Container fluid>
			<h1 className='mb-3 text-center'>Forgot Password</h1>
			<Form>
				<Form.Group className='mb-3' controlId='loginForm.email'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='name@example.com'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</Form.Group>
				<p>
					An email will be sent to your address with instructions on
					how to reset your password.
				</p>
				<Button type='submit'>Send email</Button>
			</Form>
		</Container>
	);
};

export default ForgotPasswordView;
