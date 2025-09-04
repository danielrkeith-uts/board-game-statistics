import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { apiDeleteAccount } from "../../utils/api/account-api-utils";

interface DeleteAccountModalProps {
  show: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export default function DeleteAccountModal({ show, onClose, onDeleteSuccess }: DeleteAccountModalProps) {
  const [error, setError] = useState<string | null>(null);

  const handleConfirmDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const success = await apiDeleteAccount();
      if (success) {
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
        onClose();
        window.location.href = '/';
      } else {
        setError('Failed to delete account. Please try again.');
      }
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={() => { setError(null); onClose(); }} centered>
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
          <Button variant="secondary" onClick={() => { setError(null); onClose(); }}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Yes, Delete My Account
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
