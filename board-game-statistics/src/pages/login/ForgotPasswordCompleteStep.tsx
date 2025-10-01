import { LOGIN_PAGE_URL } from '../../utils/constants';

const ForgotPasswordCompleteStep = () => {
	return (
		<>
			<p>Successfully reset password!</p>
			<p>
				Click <a href={LOGIN_PAGE_URL}>here</a> to login
			</p>
		</>
	);
};

export default ForgotPasswordCompleteStep;
