import GroupHomeView from './GroupHomeView'
import GroupDropDown from './GroupDropDown'
import { useState } from 'react'
import CreateGroupModal from './CreateGroupModal'
import LeaveGroupModal from './LeaveGroupModal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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

  const handleLeaveGroup = (e: React.FormEvent<HTMLFormElement>) => {
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

      <CreateGroupModal
        show={showCreateGroupModal}
        handleClose={handleCloseCreateGroupModal}
        onSubmit={handleCreateGroup}
      />

      <LeaveGroupModal
        show={showLeaveGroupModal}
        handleClose={handleCloseLeaveGroupModal}
        onSubmit={handleLeaveGroup}
      />

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
            Members list
          </Tab>
          <Tab eventKey="games" title="Games">
            Games
          </Tab>
          <Tab eventKey="invite" title="Invite">
            Invite
          </Tab>
          <Tab eventKey="manage" title="Manage">
            Manage perms and kick users?
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default GroupView