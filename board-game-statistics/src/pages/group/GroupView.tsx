import GroupDropDown from './GroupDropDown'
import './styles.css'

const GroupView = () => {
  return (
    <>
      <div className="gridContainer">
        <div className="leftPanel">
          {/* Group drop down */}
          <GroupDropDown />
          {/* Game list */}
          <ul>
            <li>Game</li>
            <li>Game</li>
            <li>Game</li>
          </ul>
        </div>
        {/* Members list */}
        <div className="memberList">
          <ul>
            <li>Member</li>
            <li>Member</li>
            <li>Member</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default GroupView