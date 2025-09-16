import { Link } from 'react-router-dom';
import { CREATE_ACCOUNT_PAGE_URL } from '../../utils/constants';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

const HomeView = () => {
	const account = useContext(AccountContext);

	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center mb-3'>
				<h1>Board Games Statistics</h1>
				<h4 className='mt-0'>Track games with your friends!</h4>
				<Link to={CREATE_ACCOUNT_PAGE_URL}>
					<button className='btn btn-primary mt-3'>
						Create account
					</button>
				</Link>
				{account &&
					(account.firstName ? (
						<p className='mt-3'>Welcome, {account?.firstName}!</p>
					) : (
						<p className='mt-3'>Welcome!</p>
					))}
			</div>
		</>
	);
};

export default HomeView;
