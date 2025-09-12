import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import type { Group } from '../../utils/types';

interface LeaveGroupModalProps {
	show: boolean;
	handleClose: () => void;
	handleSubmit: (e: React.FormEvent) => void;
	currentGroup: Group | undefined;
}

const LeaveGroupModal = (props: LeaveGroupModalProps) => {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<form id="newGroupForm" onSubmit={props.handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Leave group</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to leave {props.currentGroup?.groupName}?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Cancel
					</Button>
					<Button variant="danger" type="submit">
						Leave
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default LeaveGroupModal;
