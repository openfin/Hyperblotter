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
				<span className="title">Trade </span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
				<table className="row-display">
		
	<thead>
	<tr>
			<th>Some</th>
			<th>Data</th>
			<th>Will</th>
			<th>Go</th>
			<th>Here</th>
		</tr>
	</thead>
	<tbody>
		
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>
		<tr>
			<td>12</td>
			<td>32</td>
			<td>34</td>
			<td>54</td>
			<td>23</td>
		</tr>

	</tbody>
</table>
			</div>
<div className="footer"></div>
		</div>;


		;
	}
});