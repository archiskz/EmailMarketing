import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';


class AccountDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdowns: false,
		};
	}
componentWillMount(){
	document.addEventListener('mousedown', this.handleClick, false);
}
componentWillUnmount(){
	document.removeEventListener('mousedown', this.handleClick, false);
}



	
  render(){
     return (
         
    <div>
        
		<div ref={btn => this.btn = btn} className="dropdown-div">
			<img src = "images/avatars/user-01.jpg"  className="avatar-small" />
        <span className="username">
		Son NLH
		</span>
		</div>
		
		<div ref={node => this.node = node} id="myDropdown" className= {"dropdown-content " + (this.state.dropdowns ? "show" : "")}>
    <a href="/profile">Profile</a>
    <a href="/dashboard">Account</a>
    <a href="/dashboard">Log Out</a>
  </div>
    
    </div>
  );
  }



handleClick = (e) => {
	if (this.state.dropdowns == true && this.btn.contains(e.target)) {
		this.setState({
			dropdowns: false
		});
		return;
	} else if (!this.node.contains(e.target) && this.state.dropdowns == true && !this.btn.contains(e.target)) {
		console.log("handle" + this.state.dropdowns);
		this.setState({
			dropdowns: false
		});

		return;
	} else if (this.state.dropdowns == false && this.btn.contains(e.target)) {
		this.setState({
			dropdowns: true
		});
	}

	return;
}



}

export default AccountDropdown;
