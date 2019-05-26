import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import img from '../access/img/icons8-idea-64.png';



const menus = [
{
	name:  'MindSending',
	to: '/',
	exact: true
},
{
	name: 'What is MindSending',
	to: '/about',
	exact: false
},
{
	name: 'Make your campaigns',
	to: '/make-campaign',
	exact: false
}
]


const MenuLink = ({ label, to, activeOnlyWhenExact}) =>{
return(
<Route path={to} exact = {activeOnlyWhenExact} children= {({ match }) => {
var active = match ? 'active menuactive' : '';
        return(
            <li className={active}>
            	<Link to={to} className="my-link mt15">{label}</Link>
           
            </li>
        ) 
}} />
    )
}

class Menu extends Component {
  render(){
     return (
    <div className="bar">
      <nav className="bar">
        <div className="container-fluid pd-top10 pd-bot10">
        <div id="logo">
        	<img alt="" className="mt10" src={img}/> 
        </div>
          <ul className="nav navbar-nav menu" >  

          {this.showMenu(menus)}      
          <div className = "mg-right50">
				<button type="button" className="btn btn-warning btn-menu btn-sign">Sign Up Free</button>
          		<Link to="/login"  className="btn btn-menu no-bg">Login</Link>
          </div>
          
	  	  
          </ul>
        </div>
      </nav>
    </div>
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
