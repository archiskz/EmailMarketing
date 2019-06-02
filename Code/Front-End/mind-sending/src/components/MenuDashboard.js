import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
// import AccountDropdown from './dropdowns/AccountDropdown';


const menus = [
{
	name:  'Campaigns',
	to: '/dashboard',
	exact: true
},
{
	name: 'Templates',
	to: '/dashboard/templates',
	exact: false
},
{
	name: 'Lists',
	to: '/dashboard/lists',
	exact: false
},
{
	name: 'Reports',
	to: '/dashboard/reports',
	exact: false
},
{
    name: 'Automations',
    to: '/dashboard/automations',
    exact: false
}
]


const MenuLink = ({ label, to, activeOnlyWhenExact}) =>{
return(
<Route path={to} exact = {activeOnlyWhenExact} children= {({ match }) => {
var active = match ? 'active menu-active' : '';
        return(
            <li className={active}>
            	<Link className={active} to={to} >{label}</Link>
           
            </li>
        ) 
}} />
    )
}

class Menu extends Component {
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
         
    <nav className = "fixed-menu menu-dashboard" >
        <div className="header-logo">
            <a className="site-logo" href="/">
                <img className= "img-header" src="images/logo.png" alt="Homepage"/>
            </a>
        </div>

        <nav className="row header-nav-wrap wide">
            <ul className="header-main-nav">
                {this.showMenu(menus)}
            </ul>

            

        </nav>
		<div ref={btn => this.btn = btn} className="dropdown-div">
			<img src = "images/avatars/user-01.jpg"  className="avatar-small" />
        <span className="username">
		Son NLH
		</span>
		</div>
		
		<div ref={node => this.node = node} id="myDropdown" className= {"dropdown-content " + (this.state.dropdowns ? "show" : "")}>
    <a href="/dashboard">Profile</a>
    <a href="/dashboard/dashboard">Account</a>
    <a href="/dashboard">Log Out</a>
  </div>
    
    </nav>
  );
  }

  showMenu = (menus) => {
	var result = null;
	if(menus.length > 0){
		result = menus.map((menu, index) => {
			return (
			<MenuLink 
				key={index} 
				label = {menu.name} 
				to= {menu.to} 
				activeOnlyWhenExact = {menu.exact} 
			/>
			)
		});
	}
	return result;
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

export default Menu;
