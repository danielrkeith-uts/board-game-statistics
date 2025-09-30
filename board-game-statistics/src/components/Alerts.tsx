import { useContext, useEffect, useRef } from 'react';
import AlertMessage from './AlertMessage';
import { AlertContext } from '../context/AlertContext';

const Alerts = () => {
	const { success, setSuccess, error, setError } = useContext(AlertContext);

	const minErrorPopupTime: number = 8000;
	const minSuccessPopupTime: number = 5000;

	const successTimeout = useRef<number | undefined>(undefined);
	const errorTimeout = useRef<number | undefined>(undefined);

	// Hide alert popups after set delay. If the user closes the alert, cancel the timeout
	useEffect(() => {
		if (success) {
			successTimeout.current = setTimeout(
				() => setSuccess(null),
				minSuccessPopupTime
			);
		} else {
			clearTimeout(successTimeout.current);
		}
	}, [success]);

	useEffect(() => {
		if (error) {
			errorTimeout.current = setTimeout(
				() => setError(null),
				minErrorPopupTime
			);
		} else {
			clearTimeout(errorTimeout.current);
		}
	}, [error]);

	return (
		<>
			<AlertMessage
				variant='danger'
				message={error}
				setMessage={setError}
			/>
			<AlertMessage
				variant='success'
				message={success}
				setMessage={setSuccess}
			/>
		</>
	);
};

export default Alerts;
