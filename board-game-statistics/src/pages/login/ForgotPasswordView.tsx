import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { apiSendPasswordReset } from '../../utils/api/account-api-utils';

const ForgotPasswordView = () => {
	const [email, setEmail] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const handleSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		setIsSending(true);

		apiSendPasswordReset(email)
			.then((res) => {
				if (res.ok) {
					setSent(true);
					setError('');
				} else if (res.message) {
					setError(res.message);
				}
			})
			.finally(() => setIsSending(false));
	};

	return (
		<Container fluid>
			<h1 className='mb-3 text-center'>Forgot Password</h1>
			<Form onSubmit={handleSubmission}>
				<Form.Group className='mb-3'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='name@example.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Row>
						<Col>
							<Button
								type='submit'
								variant={sent ? 'secondary' : 'primary'}
							>
								{sent ? 'Resend code' : 'Send code'}
							</Button>
						</Col>
						<Col>{isSending && <Spinner />}</Col>
					</Row>
				</Form.Group>
			</Form>
			{sent && (
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Code</Form.Label>
						<Form.Control
							placeholder='XXXXXX'
							value={code}
							onChange={(e) => setCode(e.target.value)}
							maxLength={6}
						/>
					</Form.Group>
					<Form.Group>
						<Button type='submit'>Submit code</Button>
					</Form.Group>
				</Form>
			)}
			{error && <p className='text-danger'>{error}</p>}
		</Container>
	);
};

export default ForgotPasswordView;
