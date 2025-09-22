const GameResultsSection = () => {
	return (
		<>
			<div className='list-group mt-3'>
				<h6>Game results</h6>
				<a href='#' className='list-group-item list-group-item-action'>
					Sample game
				</a>
				<a href='#' className='list-group-item list-group-item-action'>
					Sample game
				</a>
				<a href='#' className='list-group-item list-group-item-action'>
					Sample game
				</a>
			</div>

			<hr />

			<table className='table'>
				<tbody>
					<tr>
						<td>Sample Wins</td>
						<td>3</td>
					</tr>
					<tr>
						<td>Sample Losses</td>
						<td>2</td>
					</tr>
					<tr>
						<td>Sample Points</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default GameResultsSection;
