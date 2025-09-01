import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

interface CreateGroupModalProps {
  show: boolean,
  handleClose: () => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const CreateGroupModal = (props: CreateGroupModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <form id="newGroupForm" onSubmit={props.onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="groupNameInput"
                name="groupNameInput"
                placeholder="Group Name"
                required
              />
              <label htmlFor="groupNameInput">Group name</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="success" type='submit'>
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default CreateGroupModal