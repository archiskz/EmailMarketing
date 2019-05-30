import React, {Component} from 'react';
import Menu from './../../components/Menu';
import HomeContent from './../HomePage/HomeContent';
import Footer from './../HomePage/Footer';
import About from './../HomePage/About';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }
componentDidMount() {
  window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}
	
  render(){
     return (
      
	  <div className = "" >
        <header id="s-header" className={"s-header " + (this.state.visible ? "" : "s-header-black")}> 
          <Menu /> 
        </header>
       <HomeContent />
       <About  />
       <Footer />
    </div>

      );
  }


  handleScroll = () => {
    const {
      prevScrollpos
    } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };
}



export default Home;
