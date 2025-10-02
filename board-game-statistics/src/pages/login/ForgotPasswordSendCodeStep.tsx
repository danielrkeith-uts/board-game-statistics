import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import {
	apiCheckPasswordResetCode,
	apiSendPasswordReset,
} from '../../utils/api/account-api-utils';

interface ForgotPasswordSendCodeStepProps {
	nextStep: (email: string, code: number) => void;
}

const ForgotPasswordSendCodeStep = ({
	nextStep,
}: ForgotPasswordSendCodeStepProps) => {
	const [email, setEmail] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const handleSendCodeSubmission = (e: React.FormEvent) => {
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

	const handleSubmitCodeSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		const numericCode = +code;

		apiCheckPasswordResetCode(numericCode, email).then((success) => {
			if (success) {
				nextStep(email, numericCode);
			} else {
				setError('Invalid code');
			}
		});
	};

	return (
		<Container fluid>
			<h1 className='mb-3 text-center'>Forgot Password</h1>
			<Form onSubmit={handleSendCodeSubmission}>
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
				<Form onSubmit={handleSubmitCodeSubmission}>
					<Form.Group className='mb-3'>
						<Form.Label>Code</Form.Label>
						<Form.Control
							placeholder='XXXXXX'
							value={code}
							onChange={(e) => {
								const { value } = e.target;

								if (!value) {
									setCode('');
								}

								if (/^[0-9]+$/.test(value)) {
									setCode(value);
								}
							}}
							maxLength={6}
						/>
					</Form.Group>
					<Form.Group>
						<Button type='submit'>Submit code</Button>
					</Form.Group>
				</Form>
			)}
			{error && <p className='text-danger mt-3'>{error}</p>}
		</Container>
	);
};

export default ForgotPasswordSendCodeStep;
