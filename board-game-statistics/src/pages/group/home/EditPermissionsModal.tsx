import { Button, Form, Modal } from 'react-bootstrap';

interface EditPermissionsModalProps {
	name: string;
	show: boolean;
	handleClose: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditPermissionsModal = ({
	name,
	show,
	handleClose,
	handleSubmit,
}: EditPermissionsModalProps) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit permissions for {name}</Modal.Title>
			</Modal.Header>
			<form id='editPermissionsForm' onSubmit={handleSubmit}>
				<Modal.Body>
					<div className='form-floating'>
						{[
							'Manage members',
							'Manage member permissions',
							'Manage board games',
							'Manage games played',
						].map((permission) => (
							<Form.Check type='checkbox' label={permission} />
						))}
					</div>
				</Modal.Body>
			</form>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='success' type='submit'>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditPermissionsModal;
