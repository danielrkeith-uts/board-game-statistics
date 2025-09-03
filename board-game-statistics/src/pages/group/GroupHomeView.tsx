
const GroupHomeView = () => {
  return (
    <div className="container mt-3">
		  <div className="row">
				<div
					className="col-3 border"
				>
					<div className="container vstack">
						<div className="list-group mt-3">
							<h6>Available games</h6>
							<a href="#" className="list-group-item list-group-item-action">Game 1</a>
							<a href="#" className="list-group-item list-group-item-action">Game 2</a>
							<a href="#" className="list-group-item list-group-item-action">Game 3</a>
						</div>
					</div>
				</div>
				<div className="col border">
					<table className='table mt-1'>
						<thead>
							<tr>
                <th scope="col">Name</th>
                <th scope="col">Date joined</th>
							</tr>
							</thead>
							<tbody>
							<tr>
                <td>Mark Otto</td>
                <td>03/08/2025</td>
							</tr>
							<tr>
                <td>Jacob Thornton</td>
                <td>05/08/2025</td>
							</tr>
							<tr>
                <td>John Doe</td>
                <td>03/08/2025</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-3 border">
					<div className="list-group mt-3">
						<h6>Game results</h6>
						<a href="#" className="list-group-item list-group-item-action">Last game</a>
						<a href="#" className="list-group-item list-group-item-action">Second last game</a>
						<a href="#" className="list-group-item list-group-item-action">Third last game</a>
					</div>

					<hr />

					<table className='table'>
						<tbody>
							<tr>
								<td>Wins</td>
								<td>3</td>
							</tr>
							<tr>
								<td>Losses</td>
								<td>2</td>
							</tr>
							<tr>
								<td>Points</td>
								<td>-</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
  )
}

export default GroupHomeView