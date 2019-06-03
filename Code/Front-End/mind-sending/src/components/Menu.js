import React, {Component} from 'react';
import AccountDropdown from './dropdowns/AccountDropdown';
class Menu extends Component {
  render(){
     return (
         
    <nav className = "fixed-menu" >
        <div className="header-logo">
            <a className="site-logo" href="/">
                <img className= "img-header" src="images/logo.png" alt="Homepage"/>
            </a>
        </div>

        <nav className="row header-nav-wrap wide">
            <ul className="header-main-nav">
                <li className="current"><a id="homepart" className="smoothscroll" href="#home" title="intro">Intro</a></li>
                <li><a id="aboutpart" className="smoothscroll" href="#about" title="about">About</a></li>
                <li><a id="featurespart" className="smoothscroll" href="#features" title="features">Features</a></li>
                <li><a href="/dashboard" title="Email Marketing">Email Marketing</a></li>	
            </ul>

            <AccountDropdown/>
            
            

        </nav>

        {/* <a className="header-menu-toggle" href="#"><span>Menu</span></a> */}
    
    </nav>
  );
  }
}

export default Menu;
