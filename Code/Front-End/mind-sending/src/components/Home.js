import React, {Component} from 'react';
import Menu from './Menu';
import SideBar from './SideBar';
class Home extends Component {

	
  render(){
     return (
    <div className="App">
      <Menu />
	  <SideBar className="sidebar mt60" />
    </div>
  );
  }
}

export default Home;
