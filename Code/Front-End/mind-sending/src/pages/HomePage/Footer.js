import React, {Component} from 'react';
import Menu from './../../components/Menu';
import HomeContent from './../HomePage/HomeContent';
class Home extends Component {

	
  render(){
     return (
      
	   <footer className="s-footer footer wow fadeInUp">

        <div className="row footer__top">
            <div className="col-six md-full">
                <h1 className="display-2">
                    Let's Stay In Touch.
                </h1>
                <p className="lead">
                    Subscribe for updates, special offers and more.
                </p>
            </div>
            <div className="col-six md-full footer__subscribe end">
                <div className="subscribe-form">
                    <form id="mc-form" className="group" novalidate="true">

                        <input type="email" value="" name="EMAIL" className="email" id="mc-email" placeholder="Email Address" required=""/>
            
                        <input type="submit" name="subscribe" value="Sign Up"/>
            
                        <label for="mc-email" className="subscribe-message"></label>
            
                    </form>
                </div>
            </div>
        </div>

        <div className="row footer__bottom wide_footer wow fadeInUp">
            <div className="col-five tab-full">
                <div className="footer__logo">
                    <a href="#home"> MINDSENDING
                        
                    </a>
                </div>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
                do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam.
                </p>
                <br></br>
                <ul className="footer__social">
                    <li><a href="#0"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                    <li><a href="#0"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#0"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                </ul>
            </div>

            <div className="col-six tab-full end wow fadeInUp">
                <ul className="footer__site-links">
                    <li><a className="smoothscroll" href="#home" title="intro">Intro</a></li>
                    <li><a className="smoothscroll" href="#about" title="about">About</a></li>
                    <li><a className="smoothscroll" href="#features" title="features">Features</a></li>
                    <li><a className="smoothscroll" href="#pricing" title="pricing">Pricing</a></li>
                    <li><a href="blog.html" title="blog">Blog</a></li>	
                </ul>
 
                <p className="footer__contact wow fadeInUp">
                    Do you have a question? Send us a word: <br/>
                    <a href="mailto:#0" className="footer__mail-link">support@mindsending@fpt.edu.vn</a>
                </p>

                
            </div>

        </div>

        <div className="go-top">
            <a className="smoothscroll" title="Back to Top" href="#top">hello</a>
        </div>
         <div className="go-top">
            <a className="smoothscroll" title="Back to Top" href="#top"></a>
        </div>

    </footer> 

      );
  }
}

export default Home;
