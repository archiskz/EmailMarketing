import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import img from '../access/img/icons8-idea-64.png';



const menus = [
{
	name:  'Home',
	to: '/',
	exact: true
},
{
	name: 'About',
	to: '/about',
	exact: false
},
{
	name: 'Features',
	to: '/make-campaign',
	exact: false
},
{
	name: 'Contact',
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
    < div className = "fixed-menu" >
        <div className="header-logo">
            <a className="site-logo" href="index.html">
                <img className= "img-header" src="images/logo.png" alt="Homepage"/>
            </a>
        </div>

        <nav className="row header-nav-wrap wide">
            <ul className="header-main-nav">
                <li className="current"><a className="smoothscroll" href="#home" title="intro">Intro</a></li>
                <li><a className="smoothscroll" href="#about" title="about">About</a></li>
                <li><a className="smoothscroll" href="#features" title="features">Features</a></li>
                <li><a className="smoothscroll" href="#pricing" title="pricing">Pricing</a></li>
                <li><a href="blog.html" title="blog">Blog</a></li>	
            </ul>

            <ul className="header-social mr-50">
                <li><a href="#0"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                
            </ul>
            
            

        </nav>

        <a className="header-menu-toggle" href="#"><span>Menu</span></a>
    
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
