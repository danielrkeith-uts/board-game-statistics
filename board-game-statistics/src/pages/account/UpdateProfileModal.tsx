import { apiLogin } from "../../utils/api/account-api-utils";
import {useState} from "react";
import { Modal, Form, Button} from "react-bootstrap";

interface UpdateProfileModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    email: string;
};
  
export default function UpdateProfileModal({ show, onClose, onConfirm, email }: UpdateProfileModalProps) {
const [password, setPassword] = useState("");
const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false);

const login = (e: React.FormEvent) => {
    e.preventDefault();
    apiLogin(email as string, password).then(isLoggedIn => {
        if (isLoggedIn) {
            onConfirm();
            window.location.reload();
        } else {
            setHasInvalidCredentials(true);
            setPassword("");
        }
    })
}

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={login}>
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