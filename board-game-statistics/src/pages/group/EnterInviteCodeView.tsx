import {useState, type FormEvent, type SetStateAction} from "react";
import {Button, Modal, ModalBody} from "react-bootstrap";
import {apiJoinGroup} from "../../utils/api/invitation-api-utils.ts";

export default function EnterInviteCodeView() {

    const [showInviteCodeEntryModal, setShowInviteCodeEntryModal] = useState(false);
    const [inviteCode, setInviteCode] = useState("");

    const handleOpenInviteCodeEntryModal = () => setShowInviteCodeEntryModal(true);
    const handleCloseInviteCodeEntryModal = () => {
        setShowInviteCodeEntryModal(false);
    }

    function onInviteCodeUpdate(event: { target: { value: SetStateAction<string>; }; }){
        setInviteCode(event.target.value);
    }

    const handleInviteCodeEntered= (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinGroup();
    }

    const joinGroup = () => {
        apiJoinGroup(inviteCode).then((joined) => {
                if(joined){
                    alert('You have been added to your new group.');
                    handleCloseInviteCodeEntryModal();
                }
                else{
                    alert('Join group failed. Please try again.');
                }
            }
        );
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
                                onChange={onInviteCodeUpdate}
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