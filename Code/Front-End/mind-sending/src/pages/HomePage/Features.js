import React, {
    Component
} from 'react';
import Menu from '../../components/Menu';
import HomeContent from './HomeContent';
import Slider from "react-slick";
class About extends Component {


    render() {
        const settings = {
            arrows: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        return ( 
        
    <section id="features" class="s-features target-section">

        <div class="row section-header narrower align-center has-bottom-sep aos-init aos-animate wow fadeInUp" data-aos="fade-up">
            <div class="col-full">
                <h1 class="display-1">
                    Loaded With Features You Would Surely Love.
                </h1>
                <hr></hr>
                <p class="lead">
                     We wanted to make sure this was the feature our users dreamed of. ... our beta for us, telling us how much they love it and what we can do to 
                </p>
            </div>
        </div> 

        <div class="row bit-narrow features block-1-2 block-mob-full">

            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-upload"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Cloud Based</h3>
                    <p>Cloud-based applications, services or resources made available to users on demand via the Internet from a cloud computing provider's servers.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-video-camera"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Voice &amp; Video</h3>
                    <p>Voice & Video Rentals focuses on serving the Corporate, Academic, Non-Profit, and Hospitality communities in San Diego with audio/visual equipment.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-shield"></i>
                </div>  
                <div class="item-feature__text">
                    <h3 class="item-title">Always Secure</h3>
                    <p>Always Secure Alarm Protection, located in Long Island, NY, provides alarm, data, networking, communication, and video surveillance/CCTV services.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-lego-block"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Play Games</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-chat"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Group Chat</h3>
                    <p>GroupMe brings group text messaging to every phone. Group message with the ... The best way to chat with everyone you know.
                    </p>
                </div>
            </div>
    
            <div class="col-block item-feature aos-init aos-animate wow fadeInUp" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-wallet"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Payments</h3>
                    <p>Community ForumCommunity · Resolution CenterResolution. Common Questions. PayPal Mobile App · Payments · Products and Services · Merchant Services.
                    </p>
                </div>
            </div>

        </div> 

        <div class="testimonials-wrap aos-init aos-animate wow fadeInUp" data-aos="fade-up">

            <div class="row wow fadeInUp">
                <div class="col-full testimonials-header">
                    <h2 class="display-2">1 Million+ Users Can't Be Wrong.</h2>
                </div>
            </div>

            <div class="row testimonials wow fadeInUp">

                <div class="col-full slick-slider testimonials__slider slick-initialized slick-dotted" role="toolbar">

                    <div aria-live="polite" class="slick-list draggable">
                        <div class="slick-track"  role="listbox">
                        <Slider {...settings}>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" tabindex="-1"   >
                                <img src="images/avatars/user-02.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                <span class="testimonials__name">Sasuke Uchiha</span>
                                <a href="#0" class="testimonials__link" tabindex="-1">@sasukeuchiha</a>
                                </div>
                                <p>what really won me over is Mindsending Customer support. It differs in the sense that you guys are pleased to talk to us. I know you actually care about us. You tend to reach out and make sure we are happy, and quite often. When I see an email from you guys. 
I smile :)</p>                        
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1"   >
                                <img src="images/avatars/user-03.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                <span class="testimonials__name">Shikamaru Nara</span>
                                <a href="#0" class="testimonials__link" tabindex="-1">@shikamarunara</a>
                                </div>
                                <p>After a glittering career racing cars, Kim turned to selling them. Vintage Race Car Sales became the first business of its kind to market online. As others continued advertising in vintage racing magazines, Kim saw it as a waste of time and money – especially as it took 60 days to see an ad in print.

So his team went online. After a false start with another provider, they moved to Mindsending and haven’t looked back.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide10"   >
                                <img src="images/avatars/user-01.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Naruto Uzumaki</span>
                                    <a href="#0" class="testimonials__link" tabindex="0">@narutouzumaki</a>
                                </div>
                                <p>With Mindsending, I can target my audience and get information to them in minutes – rather than weeks or months.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-active" data-slick-index="1" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide11"   >
                                <img src="images/avatars/user-02.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Sasuke Uchiha</span>
                                    <a href="#0" class="testimonials__link" tabindex="0">@sasukeuchiha</a>
                                </div>
                                <p>It’s a simple to use, affordable alternative to old-fashioned conventional advertising. In just a few minutes, anyone can create a professional-looking newsletter to proudly send to their clients.</p>                        
                            </div>
                            <div class="testimonials__slide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide12"   >
                                <img src="images/avatars/user-03.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Shikamaru Nara</span>
                                    <a href="#0" class="testimonials__link" tabindex="-1">@shikamarunara</a>
                                </div>
                                <p>Success means being able to go to bed every day feeling proud of what I’ve accomplished, and then being able to wake up the next morning excited about what’s to come.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="3" aria-hidden="true" tabindex="-1"   >
                                <img src="images/avatars/user-01.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Naruto Uzumaki</span>
                                    <a href="#0" class="testimonials__link" tabindex="-1">@narutouzumaki</a>
                                </div>
                                <p>My email campaigns bring in more business than any other form of marketing. Every time a monthly email goes out, I get multiple signups for my photo workshops, and it continues into the following weeks.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="4" aria-hidden="true" tabindex="-1"   >
                            <img src="images/avatars/user-02.jpg" alt="Author image" class="testimonials__avatar"/>
                            <div class="testimonials__author">
                                <span class="testimonials__name">Sasuke Uchiha</span>
                                <a href="#0" class="testimonials__link" tabindex="-1">@sasukeuchiha</a>
                            </div>
                            <p>The result? A higher-than-average open rate – and many more new customers.</p>                        
                        </div>
    
                        </Slider>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <a href="#home" className="home-scroll smoothscroll">
                
                <span className="home-scroll__icon_up"></span>
                <span className = "home-scroll__text" > Scroll Up </span>
            </a>
  </section>

        );
    }
}

export default About;
