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

        <div class="row section-header narrower align-center has-bottom-sep aos-init aos-animate" data-aos="fade-up">
            <div class="col-full">
                <h1 class="display-1">
                    Loaded With Features You Would Surely Love.
                </h1>
                <hr></hr>
                <p class="lead">
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea.
                </p>
            </div>
        </div> 

        <div class="row bit-narrow features block-1-2 block-mob-full">

            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-upload"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Cloud Based</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-video-camera"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Voice &amp; Video</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-shield"></i>
                </div>  
                <div class="item-feature__text">
                    <h3 class="item-title">Always Secure</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>

            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
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

            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-chat"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Group Chat</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>
    
            <div class="col-block item-feature aos-init aos-animate" data-aos="fade-up">
                <div class="item-feature__icon">
                    <i class="icon-wallet"></i>
                </div>
                <div class="item-feature__text">
                    <h3 class="item-title">Payments</h3>
                    <p>Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. 
                    Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis.
                    Sunt suscipit voluptas ipsa in tempora esse soluta sint.
                    </p>
                </div>
            </div>

        </div> 

        <div class="testimonials-wrap aos-init aos-animate" data-aos="fade-up">

            <div class="row">
                <div class="col-full testimonials-header">
                    <h2 class="display-2">1 Million+ Users Can't Be Wrong.</h2>
                </div>
            </div>

            <div class="row testimonials">

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
                                <p>Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.
                            Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.</p>                        
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1"   >
                                <img src="images/avatars/user-03.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                <span class="testimonials__name">Shikamaru Nara</span>
                                <a href="#0" class="testimonials__link" tabindex="-1">@shikamarunara</a>
                                </div>
                                <p>Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.  
                            Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide10"   >
                                <img src="images/avatars/user-01.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Naruto Uzumaki</span>
                                    <a href="#0" class="testimonials__link" tabindex="0">@narutouzumaki</a>
                                </div>
                                <p>Qui ipsam temporibus quisquam velMaiores eos cumque distinctio nam accusantium ipsum. 
                                Laudantium quia consequatur molestias delectus culpa facere hic dolores aperiam. Accusantium praesentium corpori.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-active" data-slick-index="1" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide11"   >
                                <img src="images/avatars/user-02.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Sasuke Uchiha</span>
                                    <a href="#0" class="testimonials__link" tabindex="0">@sasukeuchiha</a>
                                </div>
                                <p>Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.
                                Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.</p>                        
                            </div>
                            <div class="testimonials__slide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide12"   >
                                <img src="images/avatars/user-03.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Shikamaru Nara</span>
                                    <a href="#0" class="testimonials__link" tabindex="-1">@shikamarunara</a>
                                </div>
                                <p>Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.  
                                Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="3" aria-hidden="true" tabindex="-1"   >
                                <img src="images/avatars/user-01.jpg" alt="Author image" class="testimonials__avatar"/>
                                <div class="testimonials__author">
                                    <span class="testimonials__name">Naruto Uzumaki</span>
                                    <a href="#0" class="testimonials__link" tabindex="-1">@narutouzumaki</a>
                                </div>
                                <p>Qui ipsam temporibus quisquam velMaiores eos cumque distinctio nam accusantium ipsum. 
                                Laudantium quia consequatur molestias delectus culpa facere hic dolores aperiam. Accusantium praesentium corpori.</p>
                            </div>
                            <div class="testimonials__slide slick-slide slick-cloned" data-slick-index="4" aria-hidden="true" tabindex="-1"   >
                            <img src="images/avatars/user-02.jpg" alt="Author image" class="testimonials__avatar"/>
                            <div class="testimonials__author">
                                <span class="testimonials__name">Sasuke Uchiha</span>
                                <a href="#0" class="testimonials__link" tabindex="-1">@sasukeuchiha</a>
                            </div>
                            <p>Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.
                            Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.</p>                        
                        </div>
    
                        </Slider>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
  </section>

        );
    }
}

export default About;
