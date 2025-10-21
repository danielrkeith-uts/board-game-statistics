import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { PieChartData } from '../../utils/types';

interface PieChartProps {
	pieChartData: PieChartData;
}

const PieChart = (props: PieChartProps) => {
	const { pieChartData } = props;

	const getRandomColour = () => {
		return '#000000'.replace(/0/g, () =>
			(~~(Math.random() * 16)).toString(16)
		);
	};

	const colors = Array.from(Array(pieChartData.gameNames.length)).map(() =>
		getRandomColour()
	);

	const chartData: ChartData<'pie', number[], string> = {
		labels: pieChartData.gameNames,
		datasets: [
			{
				data: pieChartData.numOfGames,
				backgroundColor: colors,
			},
		],
	};

	const chartOptions: ChartOptions<'pie'> = {
		plugins: {
			title: {
				display: true,
				text: 'Your Favourite Board Games',
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
