var React = require('react');

module.exports = React.createClass({
	
	render: function(){
		return <table className="row-display">
		
	<thead>
	</thead>
	<tbody>
		<tr>
			<th>Ask</th>
			<td>{this.props.row.Ask}</td>
			<th>Ask Quantity</th>
			<td>{this.props.row.AskQuantity}</td>
		</tr>
		<tr>
			<th>Bid</th>
			<td>{this.props.row.Bid}</td>
			<th>Bid Quantity</th>
			<td>{this.props.row.BidQuantity}</td>
		</tr>
		<tr>
			<th>High</th>
			<td>{this.props.row.High}</td>
			<th>Low</th>
			<td>{this.props.row.Low}</td>
		</tr>
		<tr>
			<th>Spread</th>
			<td>{this.props.row.Spread}</td>
			<th>Percent Change</th>
			<td>{this.props.row.PercentChange}</td>
		</tr>
		<tr>
			<th>Last</th>
			<td>{this.props.row.Last}</td>
			<th>Previous Close</th>
			<td>{this.props.row.PreviousClose}</td>
		</tr>
	</tbody>
</table>;
	}
});

