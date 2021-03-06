import React, { Component } from 'react';
import Menu from './../../components/Menu';
import {Link} from 'react-router-dom';
// import SideBar from './SideBar';
class Home extends Component {


    render() {
        return (
            <section id="home" className="s-home target-section">

        <div className="home-image-part"></div>

        <div className="home-content">

            <div className="row home-content__main wide">

                <h1>
                An Amazing App <br/>
                That Does It All.
                </h1>

                <h3>
                Grow your audience, promote services and sell products with MindSending-a marketing software that does the job for you. 
                </h3>

               

            </div> 

            <a href="#features" className="home-scroll smoothscroll">
                <span className="home-scroll__text">Scroll Down</span>
                <span className="home-scroll__icon"></span>
            </a>

        </div> 

    </section> 
        );
    }
}

export default Home;
