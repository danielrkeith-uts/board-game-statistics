import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteAccountModal() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const handleOpenDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const handleCloseDeleteAccountModal = () => setShowDeleteAccountModal(false);

  const handleConfirmDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    handleCloseDeleteAccountModal();
  };

  return (
    <>
      <Button className="btn btn-danger" onClick={handleOpenDeleteAccountModal}>
        DELETE ACCOUNT
      </Button>

      <Modal
        show={showDeleteAccountModal}
        onHide={handleCloseDeleteAccountModal}
        centered
      >
        <form id="deleteAccountForm" onSubmit={handleConfirmDelete}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Confirm Account Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-warning" role="alert">
              <strong>Warning:</strong> This action is permanent and cannot be undone.
            </div>
            <p>Are you absolutely sure you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteAccountModal}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Yes, Delete My Account
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
