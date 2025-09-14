import { Link } from 'react-router-dom'
import { GAMES_PAGE_URL, GROUPS_PAGE_URL, HOME_PAGE_URL, LOGIN_PAGE_URL, MANAGE_ACCOUNT_PAGE_URL } from '../utils/constants'
import '../css/custom.css'
import './styles.css'
import { useContext } from 'react'
import { AccountContext } from '../context/AccountContext'
import { apiLogout } from '../utils/api/account-api-utils'

const logout = () => 
	apiLogout()
		.then(() => window.location.replace("/"));


const Header = () => {
	const account = useContext(AccountContext);

	return (
		<nav className='navbar navbar-expand bg-primary-subtle'>
			<div className="container">
				<span className='navbar-brand'>Logo</span>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'><Link className='nav-link' to={HOME_PAGE_URL}>Home</Link></li>
						{account && (
							<li className='nav-item'><Link className='nav-link' to={MANAGE_ACCOUNT_PAGE_URL}>Account</Link></li>
						)}
						<li className='nav-item'><Link className='nav-link' to={GAMES_PAGE_URL}>Games</Link></li>
						<li className='nav-item'><Link className='nav-link' to={GROUPS_PAGE_URL}>Groups</Link></li>
					</ul>
				</div>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						{account ? (
							<Link className='nav-link' to="#" onClick={logout}>Logout</Link>
						) : (
							<Link className='nav-link' to={LOGIN_PAGE_URL}>Login</Link>
						)}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header