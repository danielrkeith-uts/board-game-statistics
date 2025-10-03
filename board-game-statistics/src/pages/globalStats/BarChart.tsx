import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { BarChartData } from '../../utils/types';

interface BarChartProps {
	barChartData: BarChartData;
}

const BarChart = (props: BarChartProps) => {
	const { winData, lossData } = props.barChartData;

	const maxBarThickness = 200;

	const chartData: ChartData<'bar', number[], string> = {
		labels: ['Single Player', 'Team Based', 'Co-op'],
		datasets: [
			{
				label: 'Wins',
				data: winData,
				order: 2,
				borderColor: '#3dd078ff',
				backgroundColor: '#4eec8dff',
				maxBarThickness,
			},
			{
				label: 'Losses',
				data: lossData,
				order: 1,
				borderColor: '#e14e6eff',
				backgroundColor: '#FF6285',
				maxBarThickness,
			},
		],
	};

	const chartOptions: ChartOptions<'bar'> = {
		plugins: {
			title: {
				display: true,
				text: 'Global Win Loss Data',
			},
			legend: {
				display: true,
				position: 'bottom',
				reverse: true,
			},
			tooltip: {
				enabled: true,
				callbacks: {
					title: (context: TooltipItem<'bar'>[]) =>
						`${context[0].label} ${context[0].dataset.label}`,
				},
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				titleColor: 'white',
				bodyColor: 'white',
				borderColor: 'rgba(255, 255, 255, 0.2)',
				borderWidth: 1,
				cornerRadius: 6,
				displayColors: false,
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
		elements: {
			bar: {
				inflateAmount: 0,
				borderWidth: 2,
			},
		},
	};

	return <Bar className='w-100' options={chartOptions} data={chartData} />;
};

export default BarChart;
