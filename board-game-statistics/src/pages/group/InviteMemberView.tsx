import {useState, type SetStateAction} from "react";
import {Button, Modal} from "react-bootstrap";

export default function InviteMemberView() {
    const [showInviteNewMemberModal, setShowInviteNewMemberModel] = useState(false);
    const [inviteNewMemberEmailInputValue, setInviteNewMemberEmailInputValue] = useState('');

    const handleOpenInviteNewMemberModal = () => setShowInviteNewMemberModel(true);
    const handleCloseInviteNewMemberModal = () => {
        setInviteNewMemberEmailInputValue('');
        setShowInviteNewMemberModel(false);
    }

    const handleInviteSent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData: FormData = new FormData(e.currentTarget);
        const inviteEmail: string = formData.get("inviteEmailInput") as string;

        alert(`Invitation sent to ${inviteEmail}`);

        handleCloseInviteNewMemberModal()
    }

    function onInviteNewMemberEmailInputValueChange(event: { target: { value: SetStateAction<string>; }; }){
        setInviteNewMemberEmailInputValue(event.target.value);
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
                                value={inviteNewMemberEmailInputValue}
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