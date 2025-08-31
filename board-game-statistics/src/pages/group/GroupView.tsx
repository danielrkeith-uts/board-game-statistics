import { Tabs, Tab } from 'react-bootstrap'
import './styles.css'
import GroupHomeView from './GroupHomeView'

const GroupView = () => {
  return (
    <>
      <div className="container mt-4 px-0 d-flex justify-content-end gap-3">
        <button className='btn btn-sm btn-success'>Create new group</button>
        <button className='btn btn-sm btn-danger'>Leave group</button>
      </div>

      <div className="container">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
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
          <Tab eventKey="invite" title="Invite">
            Members list
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