import {
	BarController,
	BarElement,
	Chart as ChartJS,
	Legend,
	CategoryScale,
	LinearScale,
	Title,
	ArcElement,
	Tooltip,
} from 'chart.js';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountContext';
import type { GlobalPlayerStats } from '../../utils/types';
import { apiGetGlobalPlayerStats } from '../../utils/api/stats-api-utils';
import { AlertContext } from '../../context/AlertContext';
import WinRateTable from './WinRateTable';

const GlobalStats = () => {
	const { account } = useContext(AccountContext);
	const { setError } = useContext(AlertContext);

	const [globalStats, setGlobalStats] = useState<GlobalPlayerStats>();

	useEffect(() => {
		apiGetGlobalPlayerStats()
			.then((res) => setGlobalStats(res))
			.catch((err: Error) => setError(err.message));
	}, []);

	ChartJS.register(
		ArcElement,
		BarController,
		BarElement,
		CategoryScale,
		Legend,
		LinearScale,
		Title,
		Tooltip
	);

	return (
		<>
			<div className='container'>
				{account && globalStats ? (
					<>
						<h1>{`${account.firstName} ${account.lastName}`}</h1>
						<div className='d-flex flex-wrap justify-content-center overflow-y-auto overflow-x-hidden'>
							<div className='flex-shrink-1 flex-fill flex-column d-flex'>
								<div className='flex-grow-1'>
									<BarChart
										barChartData={globalStats.barChartData}
									/>
								</div>
								<WinRateTable
									tableData={globalStats.tableData}
								/>
							</div>
							<div className='flex-lg-fill'>
								<PieChart
									pieChartData={globalStats.pieChartData}
								/>
							</div>
						</div>
					</>
				) : (
					<>
						Error fetching global statistic data. Try refreshing the
						page, or logging in again.
					</>
				)}
			</div>
		</>
	);
};

export default GlobalStats;
