import { Link } from 'react-router-dom'
import { GAMES_PAGE_URL, GROUPS_PAGE_URL, HOME_PAGE_URL, LOGIN_PAGE_URL, MANAGE_ACCOUNT_PAGE_URL } from '../utils/constants'
import '../css/custom.css'
import './styles.css'

const Header = () => {
    return (
			<nav className='navbar navbar-expand bg-primary-subtle'>
				<div className="container">
					<span className='navbar-brand'>Logo</span>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className='nav-item'><Link className='nav-link' to={HOME_PAGE_URL}>Home</Link></li>
							{/* Manage account should be dynamic based on if user is logged in */}
							{/* <li className='nav-item'><Link className='nav-link btn-primary' to={MANAGE_ACCOUNT_PAGE_URL}>Manage Account</Link></li> */}
							<li className='nav-item'><Link className='nav-link' to={GAMES_PAGE_URL}>Games</Link></li>
							<li className='nav-item'><Link className='nav-link' to={GROUPS_PAGE_URL}>Groups</Link></li>
						</ul>
					</div>
					<ul className='navbar-nav'>
						<li className='nav-item'><Link className='nav-link' to={LOGIN_PAGE_URL}>Login</Link></li>
					</ul>
				</div>
			</nav>
    )
}

export default Header