var React = require('react'),
  user = require('../streams/user.js');

var Login = React.createClass({
	getInitialState: function() {
    return {
      loginClass: 'login',
      userName : ''
    };
  },  
  onChange: function (e) {
    this.setState({userName:e.target.value});
  },
	onClick: function(){
		this.setState({
      userName:this.state.text,
    	loginClass: 'login logged-in'
    });
    console.log(this.state);
    user.login(this.state.userName);
	},
  render: function() {
    return <div className={this.state.loginClass} >
	    <div className="modal login-form">
        <img className="logo" src="http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/logo.png" alt="openfin logo"></img>
        <br />
        <input className="text-box" placeholder="pick a name" onChange={this.onChange} value={this.state.userName} />
        <button className="button" onClick={this.onClick}>Log In</button>
      </div>
    </div>
  }
});

module.exports = Login;