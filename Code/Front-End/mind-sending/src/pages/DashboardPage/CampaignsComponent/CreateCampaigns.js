import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";

class CreateCampaign extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: true,
       dropdown_visible: false,
     };
   }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }


	
  render(){
     return (
	  <div></div>
      );
  }

}
export default CreateCampaign;
