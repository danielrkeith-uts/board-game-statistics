import {useState} from "react";
import { Modal, Form, Button} from "react-bootstrap";

interface UpdateProfileModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
};
  
export default function UpdateProfileModal({ show, onClose, onConfirm }: UpdateProfileModalProps) {
const [password, setPassword] = useState("");
const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false);

const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
        setHasInvalidCredentials(true);
        return;
    }
    onConfirm(password);
}

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleConfirm}>
            <Form.Group className="mb-3" controlId="loginForm.password">
                    <Form.Label>Enter Password To Confirm Changes</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setHasInvalidCredentials(false);
                        
                    }}/>
                </Form.Group>
                {hasInvalidCredentials && (
                    <p className="text-danger">Your password is incorrect</p>
                )}
                <Button type="submit">Confirm</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}