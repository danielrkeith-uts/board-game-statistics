import { useState } from 'react';
import ForgotPasswordSendCodeStep from './ForgotPasswordSendCodeStep';
import ForgotPasswordNewPasswordStep from './ForgotPasswordNewPasswordStep';

type Step = 'SEND_CODE' | 'NEW_PASSWORD';

const ForgotPasswordView = () => {
	const [step, setStep] = useState<Step>('SEND_CODE');
	const [code, setCode] = useState(0);

	switch (step) {
		case 'SEND_CODE':
			return (
				<ForgotPasswordSendCodeStep
					nextStep={(code: number) => {
						setCode(code);
						setStep('NEW_PASSWORD');
					}}
				/>
			);
		case 'NEW_PASSWORD':
			return (
				<ForgotPasswordNewPasswordStep
					nextStep={(password: string) => {
						// TODO - reset password
						console.log(`Code: ${code}; Password: ${password}`);
					}}
				/>
			);
		default:
			throw new Error('Unreachable default case');
	}
};

export default ForgotPasswordView;
