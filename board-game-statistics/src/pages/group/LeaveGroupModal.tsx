import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

interface LeaveGroupModalProps {
  show: boolean,
  handleClose: () => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LeaveGroupModal = (props: LeaveGroupModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <form id="newGroupForm" onSubmit={props.onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Leave group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to leave *INSERT GROUP NAME HERE*?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" type='submit'>
            Leave
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default LeaveGroupModal