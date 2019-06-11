import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
	  <div className = "" >
  CreateCampaign
    </div>
      );
  }

}
export default CreateCampaign;
