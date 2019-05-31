import React, {
    Component
} from 'react';
import Slider from "react-slick";
import Menu from './../../components/Menu';
import HomeContent from './../HomePage/HomeContent';
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
        
    <section id="about" class="s-about target-section">

        <div class="row section-header narrower align-center aos-init aos-animate" data-aos="fade-up">
            <div class="col-full">
                <h1 class="display-1">
                    The Most Popular And Number 1 Mail App.
                </h1>
                <p class="lead">
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea.
                </p>
            </div>
        </div> 

        <div class="row about-desc aos-init aos-animate" data-aos="fade-up">
            <div class="col-full slick-slider about-desc__slider slick-initialized slick-dotted" role="toolbar">

                <div aria-live="polite" class="slick-list draggable"><div class="slick-track"  role="listbox">
                <Slider {...settings}>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">User-Friendly.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">Powerful.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" tabindex="-1"  >
                    <h3 class="item-title">Secure.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="0" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide00"  >
                    <h3 class="item-title">Smart.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="1" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide01"  >
                    <h3 class="item-title">User-Friendly.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide02"  >
                    <h3 class="item-title">Powerful.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-current slick-active" data-slick-index="3" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide03" >
                    <h3 class="item-title">Secure.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned slick-active" data-slick-index="4" aria-hidden="false" tabindex="-1" >
                    <h3 class="item-title">Smart.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned slick-active" data-slick-index="5" aria-hidden="false" tabindex="-1" >
                    <h3 class="item-title">User-Friendly.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                <div class="about-desc__slide slick-slide slick-cloned" data-slick-index="6" aria-hidden="true" tabindex="-1" >
                    <h3 class="item-title">Powerful.</h3>

                    <p>
                    Et nihil atque ex. Reiciendis et rerum ut voluptate. Omnis molestiae nemo est. 
                    Ut quis enim rerum quia assumenda repudiandae non cumque qui. Amet repellat 
                    omnis ea aut cumque eos.
                    </p>
                </div>
                </Slider>
                </div></div>

            
            </div> 
        </div>

        <div class="row about-bottom-image aos-init aos-animate" data-aos="fade-up">
            <img src="images/app-screen-1400.png" srcset="images/app-screen-600.png 600w, 
                         images/app-screen-1400.png 1400w, 
                         images/app-screen-2800.png 2800w" sizes="(max-width: 2800px) 100vw, 2800px" alt="App Screenshots"/> 
         </div>

    </section>
  

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
