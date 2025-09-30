import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
	const chartData: ChartData<'pie', number[], string> = {
		labels: [
			'Name of board game 1',
			'Name of board game 2',
			'Name of board game 3',
		],
		datasets: [
			{
				data: [1, 3, 2],
				backgroundColor: ['#ff0000ff', '#00ff1eff', '#1100ffff'],
			},
		],
	};

	const chartOptions: ChartOptions<'pie'> = {
		plugins: {
			title: {
				display: true,
				text: 'Global Win Loss Stats',
			},
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				callbacks: {
					title: (context: TooltipItem<'pie'>[]) =>
						context[0].label || '',
					label: (context: TooltipItem<'pie'>) => {
						const numOfGames = context.parsed;
						const totalNumOfGames = context.dataset.data.reduce(
							(sum: number, val) => sum + val,
							0
						);
						const percentageOfTotalGames = (
							(numOfGames / totalNumOfGames) *
							100
						).toFixed(1);

						return ` ${numOfGames} games (${percentageOfTotalGames}%)`;
					},
				},
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				titleColor: 'white',
				bodyColor: 'white',
				borderColor: 'rgba(255, 255, 255, 0.2)',
				borderWidth: 1,
				cornerRadius: 6,
				displayColors: true,
			},
		},
		responsive: true,
		scales: {
			x: {
				display: false,
			},
		},
	};

	return <Pie options={chartOptions} data={chartData} />;
};
export default PieChart;
