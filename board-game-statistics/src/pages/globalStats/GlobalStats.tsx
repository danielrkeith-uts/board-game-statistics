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

const GlobalStats = () => {
	const { account } = useContext(AccountContext);

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
						<div className='overflow-y-auto overflow-x-hidden'>
							<div className='row'>
								<div className='col'>
									<div
										style={{
											position: 'relative',
										}}
									>
										<BarChart />
									</div>
									<table className='table'>
										<tbody>
											<tr>
												<td>Games Played</td>
												<td>1</td>
											</tr>
											<tr>
												<td>Win Rate</td>
												<td>1</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col justify-center'>
									<div
										style={{
											position: 'relative',
											width: '90%',
										}}
									>
										<PieChart />
									</div>
								</div>
							</div>
						</div>{' '}
					</>
				) : (
					<>Yo ass ain't logged in</>
				)}
			</div>
		</>
	);
};

export default GlobalStats;
