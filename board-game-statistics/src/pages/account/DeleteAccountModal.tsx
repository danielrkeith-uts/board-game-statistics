import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { apiDeleteAccount } from "../../utils/api/account-api-utils";

interface DeleteAccountModalProps {
  onDeleteSuccess?: () => void;
}

export default function DeleteAccountModal({ onDeleteSuccess }: DeleteAccountModalProps) {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDeleteAccountModal = () => {
    setShowDeleteAccountModal(true);
    setError(null);
  };
  
  const handleCloseDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
    setError(null);
  };

  const handleConfirmDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const success = await apiDeleteAccount();
      if (success) {
        handleCloseDeleteAccountModal();
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
        window.location.href = '/';
      } else {
        setError('Failed to delete account. Please try again.');
      }
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    }
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
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="alert alert-warning" role="alert">
              <strong>Warning:</strong> This action is permanent and cannot be undone.
            </div>
            <p>Are you absolutely sure you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={handleCloseDeleteAccountModal}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              type="submit"
            >
              Yes, Delete My Account
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
