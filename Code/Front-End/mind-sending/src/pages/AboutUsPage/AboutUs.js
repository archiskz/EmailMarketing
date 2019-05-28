import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

class Register extends Component {
	render(){
		 return (
		 		<div>
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar" data-aos="fade-down" data-aos-delay={500}>
          <div className="container">
            <a className="navbar-brand" href="index.html"><span className="flaticon-gavel" /> theOrder</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="oi oi-menu" /> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><a href="Home.js" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="practice.html" className="nav-link">Practice Areas</a></li>
                <li className="nav-item"><a href="won.html" className="nav-link">Won Cases</a></li>
                <li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>
                <li className="nav-item active"><a href="about.html" className="nav-link">About</a></li>
                <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* END nav */}
        <section className="ftco-cover overlay" style={{backgroundImage: 'url(images/bg_3.jpg)'}} id="section-home" data-aos="fade" data-stellar-background-ratio="0.5">
          <div className="overlay" />
          <div className="container">
            <div className="row align-items-center justify-content-center ftco-vh-100">
              <div className="col-md-9 text-center">
                <h1 className="ftco-heading mb-4" data-aos="fade-up" data-aos-delay={500}>About Us</h1>
                <h2 className="h5 ftco-subheading mb-5" data-aos="fade-up" data-aos-delay={600}>A free template for Law Firm Websites by <a href="https://colorlib.com/" target="_blank">Colorlib</a></h2>
              </div>
            </div>
          </div>
        </section>
        {/* END section */}
        <section className="ftco-section-2">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-12 text-center mb-5 pt-5" data-aos="fade-up">
                <h1 className="ftco-heading heading-thin mb-5">In our long history of helping people and businesses, we’ve accumulated a 98% of positive verdicts rate, which beats any of our local competitor’s margins by double digits... </h1>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="section-2-blocks-wrapper row no-gutters">
              <div className="img col-sm-12 col-md-6" style={{backgroundImage: 'url("images/image_4.jpg")'}} data-aos="fade-right">
                <a href="https://vimeo.com/45830194" className="button popup-vimeo" data-aos="fade-right" data-aos-delay={700}><span className="ion-ios-play" /></a>
              </div>
              <div className="text col-md-6">
                <div className="text-inner align-self-start" data-aos="fade-up">
                  <h3>Founder in 1856, Our Agency has over 175 lawyers</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ftco-section bg-light">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-5">
              <div className="col-md-7 text-center" data-aos="fade-up">
                <h2>Our Attorneys</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Myla Smith</span>
                    <span className="position">Counsel</span>
                  </div>
                  <img src="images/person_1.jpg" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Aldin Powell</span>
                    <span className="position">Head of International Practice</span>
                  </div>
                  <img src="images/person_3.jpg" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Clarice Clark</span>
                    <span className="position">Managing Partner, Attorney</span>
                  </div>
                  <img src="images/person_2.jpg" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Myla Smith</span>
                    <span className="position">Counsel</span>
                  </div>
                  <img src="images/person_1.jpg" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Aldin Powell</span>
                    <span className="position">Head of International Practice</span>
                  </div>
                  <img src="images/person_3.jpg" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 col-md-4 mb-4" data-aos="fade-up">
                <div className="block-10">
                  <div className="person-info mb-3">
                    <span className="name">Clarice Clark</span>
                    <span className="position">Managing Partner, Attorney</span>
                  </div>
                  <img src="images/person_2.jpg" alt className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="ftco-footer ftco-bg-dark ftco-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">About theOrder</h2>
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block">About Us</a></li>
                    <li><a href="#" className="py-2 d-block">Lawyers</a></li>
                    <li><a href="#" className="py-2 d-block">Blog</a></li>
                    <li><a href="#" className="py-2 d-block">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Communities</h2>
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block">Support</a></li>
                    <li><a href="#" className="py-2 d-block">Practice Areas</a></li>
                    <li><a href="#" className="py-2 d-block">Won Cases</a></li>
                    <li><a href="#" className="py-2 d-block">Privacy</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Contact Information</h2>
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block">198 West 21th Street, Suite 721 New York NY 10016</a></li>
                    <li><a href="#" className="py-2 d-block">+ 1235 2355 98</a></li>
                    <li><a href="#" className="py-2 d-block">info@yoursite.com</a></li>
                    <li><a href="#" className="py-2 d-block">email@email.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md">
                <div className="ftco-footer-widget mb-4">
                  <h2 className="ftco-heading-2">Opening Hours</h2>
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block">Mon - Thu: 9:00 - 21 00</a></li>
                    <li><a href="#" className="py-2 d-block">Fri 8:00 - 21 00</a></li>
                    <li><a href="#" className="py-2 d-block">Sat 9:30 - 15: 00</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div></footer></div>
		 	);
		 	}
		 }

		 export default AboutUs;