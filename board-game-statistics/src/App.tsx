import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import {
	CREATE_ACCOUNT_PAGE_URL,
	FORGOT_PASSWORD_PAGE_URL,
	GAMES_PAGE_URL,
	GROUPS_PAGE_URL,
	HOME_PAGE_URL,
	LOGIN_PAGE_URL,
	MANAGE_ACCOUNT_PAGE_URL,
	RESET_PASSWORD_PAGE_URL,
} from './utils/constants';
import HomeView from './pages/home/HomeView';
import GroupView from './pages/group/GroupView';
import { AccountContextProvider } from './context/AccountContext';
import GamesView from './pages/games/GamesView';
import LoginView from './pages/login/LoginView';
import ForgotPasswordView from './pages/login/ForgotPasswordView';
import ResetPasswordView from './pages/login/ResetPasswordView';

function App() {
	return (
		<AccountContextProvider>
			<Header />
			<div className='m-4'>
				<Routes>
					{/* PLEASE PLUG IN YOUR PAGE VIEW AS AN ELEMENT INTO YOUR ROUTE */}
					<Route path={HOME_PAGE_URL} element={<HomeView />} />
					<Route path={MANAGE_ACCOUNT_PAGE_URL} />
					<Route path={GAMES_PAGE_URL} element={<GamesView />} />
					<Route path={GROUPS_PAGE_URL} element={<GroupView />} />
					<Route path={LOGIN_PAGE_URL} element={<LoginView />} />
					<Route
						path={FORGOT_PASSWORD_PAGE_URL}
						element={<ForgotPasswordView />}
					/>
					<Route
						path={RESET_PASSWORD_PAGE_URL}
						element={<ResetPasswordView />}
					/>
					<Route path={CREATE_ACCOUNT_PAGE_URL} />
				</Routes>
			</div>
		</AccountContextProvider>
	);
}

export default App;
