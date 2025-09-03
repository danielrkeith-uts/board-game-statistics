import { Tabs, Tab, Modal, Button } from 'react-bootstrap'
import GroupHomeView from './GroupHomeView'
import GroupDropDown from './GroupDropDown'
import { useState } from 'react'
import MembersListView from "./MembersListView.tsx";

const GroupView = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);

  const handleOpenCreateGroupModal = () => setShowCreateGroupModal(true);
  const handleCloseCreateGroupModal = () => setShowCreateGroupModal(false);

  const handleOpenLeaveGroupModal = () => setShowLeaveGroupModal(true);
  const handleCloseLeaveGroupModal = () => setShowLeaveGroupModal(false);

  const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const groupName: string = formData.get("groupNameInput") as string;

    alert(`New group name: ${groupName}`);

    handleCloseCreateGroupModal();
  }

  const handleLeaveGroup = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Leaving currently selected group`);

    handleCloseLeaveGroupModal();
  }

  return (
    <>
    	<div className="container mb-3">
        <div className="row">
            <div className="col-3">
                <GroupDropDown />
            </div>
            <div className="col">
                <div className="container mt-4 px-0 d-flex justify-content-end gap-3">
                    <button className='btn btn-sm btn-success' onClick={handleOpenCreateGroupModal}>Create new group</button>
                    <button className='btn btn-sm btn-danger' onClick={handleOpenLeaveGroupModal}>Leave group</button>
                </div>
            </div>
        </div>
      </div>

      <Modal show={showCreateGroupModal} onHide={handleCloseCreateGroupModal}>
        <form id="newGroupForm" onSubmit={handleCreateGroup}>
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
            <Button variant="secondary" onClick={handleCloseCreateGroupModal}>
              Cancel
            </Button>
            <Button variant="success" type='submit'>
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showLeaveGroupModal} onHide={handleCloseLeaveGroupModal}>
        <form id="newGroupForm" onSubmit={handleLeaveGroup}>
          <Modal.Header closeButton>
            <Modal.Title>Leave group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Are you sure you want to leave *INSERT GROUP NAME HERE*?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLeaveGroupModal}>
              Cancel
            </Button>
            <Button variant="danger" type='submit'>
              Leave
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="container">
        <Tabs
          defaultActiveKey="home"
          id="group-view-tabs"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <GroupHomeView />
          </Tab>
          <Tab eventKey="leaderboard" title="Leaderboard">
            Leaderboard
          </Tab>
          <Tab eventKey="members" title="Members">
              <MembersListView/>
          </Tab>
          <Tab eventKey="games" title="Games">
            Games
          </Tab>
          {/*<Tab eventKey="invite" title="Invite">*/}
          {/*  Invite*/}
          {/*</Tab>*/}
          <Tab eventKey="manage" title="Manage">
            Manage perms and kick users?
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default GroupView