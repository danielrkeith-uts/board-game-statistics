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
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import tempData from './temp.json';
import type { BarChartData } from '../../utils/types';

const GlobalStats = () => {
	const { account } = useContext(AccountContext);

	const winData = tempData.map((gameData) => gameData.wins);
	const lossData = tempData.map((gameData) => gameData.losses);
	const numOfGamesPlayed = tempData.reduce(
		(sum, currentValue) =>
			sum +
			currentValue.games.reduce(
				(sum, currentValue) => sum + currentValue.numOfGamesPlayed,
				0
			),
		0
	);

	const barChartData: BarChartData = { winData, lossData };

	// const pieChartData = {};

	const tableData = {
		numOfGamesPlayed,
		winRate: (
			(winData.reduce((sum, currentValue) => sum + currentValue, 0) /
				numOfGamesPlayed) *
			100
		).toFixed(1),
	};

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
				{account ? (
					<>
						<h1>{`${account.firstName} ${account.lastName}`}</h1>
						<div className='d-flex flex-wrap justify-content-center overflow-y-auto overflow-x-hidden'>
							<div className='flex-shrink-1 flex-fill flex-column d-flex'>
								<div className='flex-grow-1'>
									<BarChart barChartData={barChartData} />
								</div>
								<table className='table'>
									<tbody>
										<tr>
											<td>Games Played</td>
											<td className='text-end'>
												{tableData.numOfGamesPlayed}
											</td>
										</tr>
										<tr>
											<td>Win Rate</td>
											<td className='text-end'>
												{tableData.winRate}%
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className='flex-lg-fill'>
								<PieChart />
							</div>
						</div>
					</>
				) : (
					<>Yo ass ain't logged in</>
				)}
			</div>
		</>
	);
};

export default GlobalStats;
