import Alert from 'react-bootstrap/esm/Alert';

interface ErrorAlert {
	variant: string;
	message: string | null;
	setMessage: (error: string | null) => void;
}

const AlertMessage = (props: ErrorAlert) => {
	const { message, setMessage, variant } = props;

	return (
		<Alert
			variant={variant}
			className='position-fixed bottom-0 end-0 z-3 me-5 mb-4'
			onClose={() => setMessage(null)}
			show={!!message}
			dismissible
		>
			<Alert.Heading className='h5'>
				{variant === 'danger' ? 'Error' : 'Success'}
			</Alert.Heading>
			<hr />
			<p className='mb-0'>{message}</p>
		</Alert>
	);
};

export default AlertMessage;
