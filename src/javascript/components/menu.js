var React = require('react'),
  user = require('../streams/user.js'),
  WatchList = require('./watchlist.js'),
  WatchListDetails = require('./watchlist-details.js'),
  TeamView = require('./team-view.js'),
  TeamActions = require('./team-actions.js'),
  fin = require('../vendor/openfin.js');

var Menu = React.createClass({
	getInitialState: function() {
    return {
    	menuShowing: false,
      currentUser: {},
      menuClass: 'menu-page'
    };
  },
	onClick: function(){
		this.setState({
    	menuShowing: !this.state.menuShowing,
    	menuClass: this.state.menuShowing ? 'menu-page' : 'menu-page showing' 
    });
	},
  render: function() {
    var that = this;
    user.on('data', function (data) {
      that.state.currentUser = data;
      that.setState(that.state);
    });
    return <div className="menu-contain" >
	    <div onClick={this.onClick} className="menu">
        <span className="menu-title">Menu <i className="fa fa-bars"></i></span>
        <span className="menu-user">Hello {this.state.currentUser.name}</span>
      </div>
	    <div className={this.state.menuClass}>
        <WatchList />
        <WatchListDetails />
        <TeamView />
        <TeamActions />
      </div>
    </div>
  }
});

module.exports = Menu;