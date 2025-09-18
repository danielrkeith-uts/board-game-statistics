import {useState, type SetStateAction} from "react";
import {Button, Modal} from "react-bootstrap";
import {apiInvite} from "../../utils/api/invitation-api-utils.ts";

export default function InviteMemberView() {
    const [showInviteNewMemberModal, setShowInviteNewMemberModel] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    //const [inviteError, setInviteError] = useState(null);

    const handleOpenInviteNewMemberModal = () => setShowInviteNewMemberModel(true);
    const handleCloseInviteNewMemberModal = () => {
        setInviteEmail('');
        setShowInviteNewMemberModel(false);
    }

    const sendInvitation = () => {

        apiInvite(inviteEmail, 23).then((sent) => {
            if (sent) {
                alert(`Invitation sent to ${inviteEmail}`);
            }
            else {
                alert('Failed to send invitation. Please try again.')
            }
        });
    }

    const handleInviteSent =  (event: React.FormEvent) => {
        event.preventDefault();
        sendInvitation();
    }

    function onInviteNewMemberEmailInputValueChange(event: { target: { value: SetStateAction<string>; }; }){
        setInviteEmail(event.target.value);
    }

    return(
        <>
            <Button className={"btn btn-sm btn-success"} onClick={handleOpenInviteNewMemberModal}>Invite New Member</Button>
            <Modal show={showInviteNewMemberModal} onHide={handleCloseInviteNewMemberModal}>
                <form id={"inviteNewMemberForm"} onSubmit={handleInviteSent}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite New Group Member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"form-floating"}>
                            <input
                                type={"email"}
                                value={inviteEmail}
                                onChange={onInviteNewMemberEmailInputValueChange}
                                className={"form-control"}
                                id={"inviteEmailInput"}
                                name={"inviteEmailInput"}
                                placeholder={"Enter Email..."}
                                required={true}
                            />
                            <label htmlFor={"inviteEmailInput"}>Invite Email</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"secondary"} onClick={handleCloseInviteNewMemberModal}>Cancel</Button>
                        <Button variant={"success"} type={"submit"}>Send</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}