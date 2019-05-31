import React, {Component} from 'react';
import Menu from './../../components/Menu';
import HomeContent from './../HomePage/HomeContent';
import Footer from './../HomePage/Footer';
import About from './../HomePage/About';
import Features from './../HomePage/Features';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true,
      homeY: 0,
      aboutY: 0,
      featuresY: 0,
      homevi: true,
      aboutvi: false,
      featuresvi: false
    };
  }

getHeight = () => {

}

componentDidMount() {
  window.addEventListener("scroll", this.handleScroll);
  this.getHeight();
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}

	
  render(){
     return (
      
	  <div className = "" >
    <body data-spy = "scroll" data-target = ".fixed-menu"
    data-offset = "50" >
        <header id="s-header" className={"s-header " + (this.state.visible ? "" : "s-header-black")}> 
          <Menu /> 
        </header>
       <HomeContent />
       <About  />
       <Features />
       <Footer />
       </body>
    </div>






      );
  }

hadleCLickMenu = () => {
  const {
    prevScrollpos
  } = this.state;
  const currentScrollPos = window.pageYOffset;
  const visible = prevScrollpos < 120;
  if (currentScrollPos > 120 || window.pageYOffset > 120) {
    this.setState({
      prevScrollpos: currentScrollPos,
      visible: true
    });
  } else {
    this.setState({
      prevScrollpos: currentScrollPos,
      visible: false
    });
  }
}
  handleScroll = () => {
    var home = document.getElementById("home");
    var about = document.getElementById("about");
    var features = document.getElementById("features");
    var homepart = document.getElementById("homepart");
    var aboutpart = document.getElementById("aboutpart");
    var featurespart = document.getElementById("featurespart");
    var homeY = home.offsetTop - 140;
    var aboutY = about.offsetTop - 140;
    var featuresY = features.offsetTop - 140;
    this.state.setState = {
      homeY: homeY,
      aboutY: aboutY,
      featuresY: featuresY,
    }
    const {
      prevScrollpos
    } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos < 120;
    if(currentScrollPos > 120 || window.pageYOffset > 120){
      this.setState({
        prevScrollpos: currentScrollPos,
        visible: true
      });
    } else {
      this.setState({
        prevScrollpos: currentScrollPos,
        visible: false
      });
    }
if(window.pageYOffset< aboutY && window.pageYOffset > homeY ){
homepart.classList.add('menu-active');
featurespart.classList.remove('menu-active');
aboutpart.classList.remove('menu-active');
} else if (window.pageYOffset < featuresY && window.pageYOffset > aboutY) {
aboutpart.classList.add('menu-active');
featurespart.classList.remove('menu-active');
homepart.classList.remove('menu-active');
} else if (window.pageYOffset > featuresY) {
featurespart.classList.add('menu-active');
homepart.classList.remove('menu-active');
aboutpart.classList.remove('menu-active');
}

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };
}

export default Home;
