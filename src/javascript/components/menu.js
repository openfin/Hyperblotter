import React, { Component } from 'react';
import user from '../streams/user';
import WatchList from './watchlist';
import WatchListDetails from './watchlist-details';
import TeamView from './team-view';
import TeamActions from './team-actions';
import fin from '../vendor/openfin';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuShowing: false,
      currentUser: {},
      menuClass: 'menu-page'
    }

    /* Initiatialise watching the user stream
     * this used to be in the render method
     * I've moved it here because I don't think
     * it needs to be called everytime it renders
     * move this back if it causes a problem 
     */
    user.on('data', (data) => {
      this.state.currentUser = data;
      that.setState(that.state);
    });
  }

  onClick = () => {
    this.setState({
    	menuShowing: !this.state.menuShowing,
    	menuClass: !this.state.menuShowing ? 'menu-page' : 'menu-page showing' 
    });
  }

  render = () => {
    return (
      <div className="menu-contain" >
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
    );
  }
}

export default Menu;
