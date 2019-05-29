import React, {
    Component
} from 'react';
import Menu from './../../components/Menu';
class About extends Component {


    render() {
        return ( 
        <div className = "" >

    <header className="s-header">

        <div className="header-logo">
            <a className="site-logo" href="index.html">
                <img src="images/logo.svg" alt="Homepage"/>
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

            <ul className="header-social">
                <li><a href="#0"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#0"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
            </ul>
        </nav>

        <a className="header-menu-toggle" href="#"><span>Menu</span></a>
    
    </header> 

    
    <section id="home" className="s-home target-section">

        <div className="home-image-part"></div>

        <div className="home-content">

            <div className="row home-content__main wide">

                <h1>
                An Amazing App <br/>
                That Does It All.
                </h1>

                <h3>
                Voluptatem ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia. 
                </h3>

                <div className="home-content__button">
                   
                    <a href="#download" className="smoothscroll btn btn--primary btn--large">
                        Get Started
                    </a>
                </div>

            </div> 

            <a href="#about" className="home-scroll smoothscroll">
                <span className="home-scroll__text">Scroll Down</span>
                <span className="home-scroll__icon"></span>
            </a>

        </div> 

    </section> 

    <section id="about" className="s-about target-section">

      

    </section> 


    
    <section id="process" className="s-process">

    </section> 


    
    <section id="features" className="s-features target-section">

      

    </section> 


   
    <section id="pricing" className="s-pricing target-section">

    

    </section> 


    
    <section id="download" className="s-download">

      

    </section> 


   
    <footer className="s-footer footer">

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

        <div className="row footer__bottom wide">
            <div className="col-five tab-full">
                <div className="footer__logo">
                    <a href="index.html">
                        <img src="images/logo.svg" alt="Homepage"/>
                    </a>
                </div>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
                do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <ul className="footer__social">
                    <li><a href="#0"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                    <li><a href="#0"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#0"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                </ul>
            </div>

            <div className="col-six tab-full end">
                <ul className="footer__site-links">
                    <li><a className="smoothscroll" href="#home" title="intro">Intro</a></li>
                    <li><a className="smoothscroll" href="#about" title="about">About</a></li>
                    <li><a className="smoothscroll" href="#features" title="features">Features</a></li>
                    <li><a className="smoothscroll" href="#pricing" title="pricing">Pricing</a></li>
                    <li><a href="blog.html" title="blog">Blog</a></li>	
                </ul>

                <p className="footer__contact">
                    Do you have a question? Send us a word: <br/>
                    <a href="mailto:#0" className="footer__mail-link">support@standout.com</a>
                </p>

                <div className="cl-copyright">
                    <span>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>

</span>
                </div>
            </div>

        </div>

        <div className="go-top">
            <a className="smoothscroll" title="Back to Top" href="#top"></a>
        </div>

    </footer> 

            </div>

        );
    }
}

export default About;
