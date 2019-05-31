import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';


const menus = [
{
	name:  'Campaigns',
	to: '/campaigns',
	exact: true
},
{
	name: 'Templates',
	to: '/templates',
	exact: false
},
{
	name: 'Lists',
	to: '/lists',
	exact: false
},
{
	name: 'Reports',
	to: '/reports',
	exact: false
},
{
    name: 'Automations',
    to: '/automations',
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

        <a className="header-menu-toggle" href="#"><span>Menu</span></a>
    
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




}

export default Menu;
