import React, { Component } from 'react';
import fin from '../vendor/openfin';

const jsonGrid = window.opener.document.querySelector('#stock-example');
const jsonModel = jsonGrid.getBehavior();

const configureDisplayState = () => {
	const book = window.opener.orderBook;
	let len = book.length || 0;
	let state = [];
	let row;

	while(len--){
		row = jsonModel.getRow(book[len].rowNum);
		state.push({
			rowInfo: row,
			bidAsk: book[len]
		});
	}
	return state;
}

class OrderView extends Component{
	constructor(props){
		super(props);
		this.state = {
			orderBook: window.opener.orderBook
		}
	}

	closeWindow = () => {
		fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent().close();
		});
	}

	removeBidOffer = () => {
		const book = window.opener.orderBook;
		const index = book.indexOf(item);
		if (index !== -1){
			book.splice(index, 1);
		}
	}

	randBool = () => {
		return parseInt(Math.random() * 10) % 2 ? true : false;
	}

	componentDidMount = () => {
    console.log("MOUNTED", window.opener);
    this.setState({
			orderBook: window.opener.orderBook
		});
	}

	render = () => {
		return (
			<div className="child">
				<div className="top-bar">
					<span className="title">Orders </span>
					<i className="fa fa-unlock-alt unlocked"></i>
					<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
				</div>
				<div className="contents">
					<div className="order-book">
						<table className="order-table">
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
							</tbody>
						</table>
					</div>
				</div>
				<div className="footer"></div>
			</div>
		);
	}

}

export default OrderView;
