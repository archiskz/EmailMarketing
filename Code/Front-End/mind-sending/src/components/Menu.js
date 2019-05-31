import React, {Component} from 'react';
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

            <ul className="header-social mr-50">
                <li><a href="#0"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                
            </ul>
            
            

        </nav>

        <a className="header-menu-toggle" href="#"><span>Menu</span></a>
    
    </nav>
  );
  }
}

export default Menu;
