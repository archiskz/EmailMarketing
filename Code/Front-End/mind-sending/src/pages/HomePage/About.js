import React, {
    Component
} from 'react';
import Slider from "react-slick";
class About extends Component {


    render() {
const settings = {
    arrows: true,
      dots: false,
      infinite: true,
      speed: 700,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true
    };

        return ( 
        <div>
    <section id="about" class="s-about target-section ">

        <div class="row section-header narrower align-center aos-init aos-animate" data-aos="fade-up">
            <div class="col-full">
                <h1 class="display-1 wow fadeInUp">
                    The Most Popular And Number 1 Email marketing App.
                </h1>
                <br></br>
                <br></br>
                <p class="lead wow fadeInUp">
                    MindSending is a comprehensive marketing software platform that helps you create content, boost sales, and increase traffic to your website. Integrated email marketing, autoresponders, and landing pages let you automate essential tasks and launch effective marketing campaigns.
                </p>
            </div>
        </div> 

        <div class="row about-desc aos-init aos-animate wow fadeInUp" data-aos="fade-up ">
            <div class="col-full slick-slider about-desc__slider slick-initialized slick-dotted" role="toolbar">

                <div aria-live="polite" class="slick-list draggable"><div class="slick-track"  role="listbox">
                <Slider {...settings}>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">Put your audience first.</h3>

                    <p>
                    Know who you’re talking to so you can say the right things. The more you know about your people, the smarter you can be with your campaigns. Our Marketing CRM tools help you turn audience data into insights that guide your campaigns—every step of the way.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">Bring your brand to life.</h3>

                    <p>
                    Look like a pro with elegant, easy-to-use design tools. Our deceptively simple design tools will help bring your ideas to life in professional‑looking marketing campaigns that look and feel like you.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1"  >
                    <h3 class="item-title">Create integrated campaigns.</h3>

                    <p>
                    Spread the word with social, email, ads, and more. In just a few easy steps
                    you can have an entire campaign up and
                    running, whether you’re an experienced
                    marketer, or just starting out.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="0" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide00"  >
                    <h3 class="item-title">Turn data into insights.</h3>

                    <p>
                    Our recommendations get smarter as you go. Powered by 11 million users and 4 billion contacts, our platform helps you turn valuable insights and analytics into winning campaigns.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="1" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide01"  >
                    <h3 class="item-title">Marketing Automation.</h3>

                    <p>
                    Use marketing automation tools to react to the actions your contacts take, in ways that help you reach your goals. Apply tagging and scoring for even more precise segments. Create a conversion path that’s educational, enjoyable, and compelling. Marketing automation cuts big goals down to a manageable size.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide02"  >
                    <h3 class="item-title">Embed Form.</h3>

                    <p>
                    Capture Subscribers from your Website Automatically. Tell us a little about yourself, and we’ll give you tips and insights to help you grow your business faster and get smarter as you go.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-current slick-active" data-slick-index="3" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide03" >
                    <h3 class="item-title">Drag and Drop Drip Automation.</h3>

                    <p>
                    Use marketing automation tools to react to the actions your contacts take, in ways that help you reach your goals. Apply tagging and scoring for even more precise segments. Create a conversion path that’s educational, enjoyable, and compelling. Marketing automation cuts big goals down to a manageable size.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned slick-active" data-slick-index="4" aria-hidden="false" tabindex="-1" >
                    <h3 class="item-title">Turn data into insights.</h3>

                    <p>
                    Our recommendations get smarter as you go. Powered by 11 million users and 4 billion contacts, our platform helps you turn valuable insights and analytics into winning campaigns.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned slick-active" data-slick-index="5" aria-hidden="false" tabindex="-1" >
                    <h3 class="item-title">Marketing Automation.</h3>

                    <p>
                    Use marketing automation tools to react to the actions your contacts take, in ways that help you reach your goals. Apply tagging and scoring for even more precise segments. Create a conversion path that’s educational, enjoyable, and compelling. Marketing automation cuts big goals down to a manageable size.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="6" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">Embed Form.</h3>

                    <p>
                    Capture Subscribers from your Website Automatically.
                    </p>
                </div>
                </Slider>
                </div></div>

            
            </div> 
        </div>

        <div class="row about-bottom-image aos-init aos-animate wow fadeInUp" data-aos="fade-up">
            <img src="images/dashboard.png" sizes="(max-width: 2800px) 100vw, 2800px" alt="App Screenshots"/> 
         </div>

    </section>
  <section id="process" class="s-process">

        <div class="row">
            <div class="col-full text-center aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <h2 class="display-2">How The App Works?</h2>
                <hr></hr>
            </div>
        </div>

        <div class="row process block-1-4 block-m-1-2 block-tab-full">
            <div class="col-block item-process aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-process__text about_align">
                    <h3>Sign Up</h3>
                    <p>
                    By clicking on Sign up, you agree to MindSending's Terms and Conditions of Use. To learn more about how MindSending collects, uses, shares and protects your personal.
                    </p>
                </div>
            </div>
            <div class="col-block item-process aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-process__text about_align">
                    <h3>Create</h3>
                    <p>
                    To create a regular email campaign, follow these steps. Navigate to the Campaigns page. Click Create Campaign. Click Email. On the Regular tab, enter a campaign name and click Begin.
                    </p>
                </div>
            </div>
            <div class="col-block item-process aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-process__text about_align">
                    <h3>Compose</h3>
                    <p>
                    Whether you're an expert or a novice in email marketing, MindSending gives you tools to easily design beautiful campaigns. Choose one of our template options to sell products, promote your brand, or boost audience engagement.
                    </p>
                </div>
            </div>
            <div class="col-block item-process aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-process__text about_align">
                    <h3>Send</h3>
                    <p>
                    There are four main things to do before you can send. Add your recipients in the To section. Add your from name and from email address in the From section. Add your subject line in the Subject section. Design your email in the Content section.
                    </p>
                </div>
            </div>
        </div> 

        <div class="row process-bottom-image aos-init aos-animate wow fadeInUp" data-aos="fade-up">
            <img src="images/phone-app-screens-1000.png" srcset="images/phone-app-screens-600.png 600w, 
                         images/phone-app-screens-1000.png 1000w, 
                         images/phone-app-screens-2000.png 2000w" sizes="(max-width: 2000px) 100vw, 2000px" alt="App Screenshots"/> 
         </div>
        
    </section>
    </div>

        );
    }
}
 
  
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


export default About;
