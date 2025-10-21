import type { TableData } from '../../utils/types';

interface WinRateTableProps {
	tableData: TableData;
}

const WinRateTable = (props: WinRateTableProps) => {
	const { tableData } = props;

	return (
		<table className='table'>
			<tbody>
				<tr>
					<td>Games Played</td>
					<td className='text-end'>{tableData.numOfGamesPlayed}</td>
				</tr>
				<tr>
					<td>Win Rate</td>
					<td className='text-end'>{tableData.winRate}%</td>
				</tr>
			</tbody>
		</table>
	);
};
export default WinRateTable;
