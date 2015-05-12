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
				<span className="title">Order </span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
				<table className="row-display">
		
	<thead>
	<tr>
			<th>Company</th>
			<th>Buy</th>
			<th>Sell</th>
		</tr>
	</thead>
	<tbody>
		
		<tr>
			<td>This is some Company </td>
			<td> <span className="buy"> Buy </span> </td>
			<td> <span className="sell">Sell </span> </td>
		</tr>
		<tr>
			<td>This is some Company </td>
			<td> <span className="buy"> Buy </span> </td>
			<td> <span className="sell">Sell </span> </td>
		</tr>
		<tr>
			<td>This is some Company </td>
			<td> <span className="buy"> Buy </span> </td>
			<td> <span className="sell">Sell </span> </td>
		</tr>
		<tr>
			<td>This is some Company </td>
			<td> <span className="buy"> Buy </span> </td>
			<td> <span className="sell">Sell </span> </td>
		</tr>
		<tr>
			<td>This is some Company </td>
			<td> <span className="buy"> Buy </span> </td>
			<td> <span className="sell">Sell </span> </td>
		</tr>
	</tbody>
</table>
			</div>
<div className="footer"></div>
		</div>;


		;
	}
});