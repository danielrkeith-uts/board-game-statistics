import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import {
	CREATE_ACCOUNT_PAGE_URL,
	GAMES_PAGE_URL,
	GROUPS_PAGE_URL,
	HOME_PAGE_URL,
	LOGIN_PAGE_URL,
	MANAGE_ACCOUNT_PAGE_URL,
} from './utils/constants';
import HomeView from './pages/home/HomeView';
import GroupView from './pages/group/GroupView';

function App() {
	return (
		<>
			<Header />
			<Routes>
				{/* PLEASE PLUG IN YOUR PAGE VIEW AS AN ELEMENT INTO YOUR ROUTE */}
				<Route path={HOME_PAGE_URL} element={<HomeView />} />
				<Route path={MANAGE_ACCOUNT_PAGE_URL} />
				<Route path={GAMES_PAGE_URL} />
				<Route path={GROUPS_PAGE_URL} element={<GroupView />} />
				<Route path={LOGIN_PAGE_URL} />
				<Route path={CREATE_ACCOUNT_PAGE_URL} />
			</Routes>
		</>
	);
}

export default App;
