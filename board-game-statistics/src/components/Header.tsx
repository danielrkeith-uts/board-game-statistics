import { Link } from 'react-router-dom'
import { CREATE_ACCOUNT_PAGE_URL, GAMES_PAGE_URL, GROUPS_PAGE_URL, HOME_PAGE_URL, LOGIN_PAGE_URL, MANAGE_ACCOUNT_PAGE_URL } from '../utils/constants'
import './styles.css'

const Header = () => {
    return (
        <div className='nav'>
            <div className="logoContainer headerContainer">
                Logo
                <li className='active navLink'><Link to={HOME_PAGE_URL}>Home</Link></li>
            </div>

            <ul className='headerContainer'>
                {/* Manage account should be dynamic based on if user is logged in */}
                <li className='navLink'><Link to={MANAGE_ACCOUNT_PAGE_URL}>Manage Account</Link></li>
                <li className='navLink'><Link to={GAMES_PAGE_URL}>Games</Link></li>
                <li className='navLink'><Link to={GROUPS_PAGE_URL}>Groups</Link></li>
                <li className='navLink'><Link to={LOGIN_PAGE_URL}>Login</Link></li>
                <li className='navLink'><Link to={CREATE_ACCOUNT_PAGE_URL}>Create Account</Link></li>
            </ul>
        </div>
    )
}

export default Header