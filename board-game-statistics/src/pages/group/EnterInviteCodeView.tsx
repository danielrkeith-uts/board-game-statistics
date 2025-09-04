import {useState, type FormEvent} from "react";
import {Button, Modal, ModalBody} from "react-bootstrap";

export default function EnterInviteCodeView() {

    const [showInviteCodeEntryModal, setShowInviteCodeEntryModal] = useState(false);

    const handleOpenInviteCodeEntryModal = () => setShowInviteCodeEntryModal(true);
    const handleCloseInviteCodeEntryModal = () => {
        setShowInviteCodeEntryModal(false);
    }

    const handleInviteCodeEntered= (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert('You have been added to your new group.');

        handleCloseInviteCodeEntryModal();
    }

    return(
        <>
            <Button className={"btn btn-sm btn-success"} onClick={handleOpenInviteCodeEntryModal}>Enter Invite Code</Button>
            <Modal show={showInviteCodeEntryModal} onHide={handleCloseInviteCodeEntryModal}>
                <form id={"inviteCodeEntryForm"} onSubmit={handleInviteCodeEntered}>
                    <Modal.Header closeButton>
                        <Modal.Title>Group Invite Code</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <div className={"form-floating"}>
                            <input
                                className={"form-control"}
                                id={"inviteCodeEntry"}
                                name={"inviteCodeEntry"}
                                placeholder={""}
                                required={true}
                            />
                            <label htmlFor={"inviteCodeInput"}>Please enter invite code...</label>
                        </div>
                    </ModalBody>
                    <Modal.Footer>
                        <Button variant={"secondary"} onClick={handleCloseInviteCodeEntryModal}>Cancel</Button>
                        <Button variant={"success"} type={"submit"}>Join</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}