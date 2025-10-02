import { useState } from 'react';
import ForgotPasswordSendCodeStep from './ForgotPasswordSendCodeStep';
import ForgotPasswordNewPasswordStep from './ForgotPasswordNewPasswordStep';
import ForgotPasswordCompleteStep from './ForgotPasswordCompleteStep';

type Step = 'SEND_CODE' | 'NEW_PASSWORD' | 'COMPLETE';

const ForgotPasswordView = () => {
	const [step, setStep] = useState<Step>('SEND_CODE');
	const [email, setEmail] = useState('');
	const [code, setCode] = useState(0);

	switch (step) {
		case 'SEND_CODE':
			return (
				<ForgotPasswordSendCodeStep
					nextStep={(email: string, code: number) => {
						setEmail(email);
						setCode(code);
						setStep('NEW_PASSWORD');
					}}
				/>
			);
		case 'NEW_PASSWORD':
			return (
				<ForgotPasswordNewPasswordStep
					code={code}
					email={email}
					nextStep={() => {
						setStep('COMPLETE');
					}}
				/>
			);
		case 'COMPLETE':
			return <ForgotPasswordCompleteStep />;
		default:
			throw new Error('Unreachable default case');
	}
};

export default ForgotPasswordView;
