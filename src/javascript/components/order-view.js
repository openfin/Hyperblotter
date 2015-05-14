var React = require('react'),
		fin = require('../vendor/openfin.js');

module.exports = React.createClass({
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
	render: function(){
		return <div className="child">
			<div className="top-bar">
				<span className="title">Orders </span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
				<div className="order-book"><table className="order-table">
		
	<thead>
	<tr>
			<th>Action</th>
			<th>Side</th>
			<th>Quantity</th>
			<th>Symbol</th>
			<th>Price</th>
			<th>Account</th>
			<th>Options</th>
			<th>Status</th>
			<th>Portfolio</th>
		</tr>
	</thead>
	<tbody>

	<tr>
			<td>Action</td>
			<td>Side</td>
			<td>Quantity</td>
			<td>Symbol</td>
			<td>Price</td>
			<td>Account</td>
			<td>Options</td>
			<td>Status</td>
			<td>Portfolio</td>
		</tr>
		

	</tbody>
</table></div>
			</div>
<div className="footer"></div>
		</div>;

	}
});