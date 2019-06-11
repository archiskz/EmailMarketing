import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CampaignPopUp extends Component {
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
         <div className="popup" id="popup">
    <div className="popup-inner">
      <div className="popupphoto">
        <img src="https://images.pexels.com/photos/193349/pexels-photo-193349.jpeg?cs=srgb&dl=access-algorithm-binary-193349.jpg&fm" alt="">
        </img>
      </div>

        <div className="popuptext">
        <div>
        <img className="img-pop-up padding-right--lv2" src="https://img.icons8.com/cool-color/64/000000/upload-mail.png"/>
        <h1>CAMPAIGN NAME</h1>
        <p>Keep your subscribers engaged by sharing your latest news, promoting a line of products, or announcing an event.</p>
        </div>
        <input className="iput_pop_up" placeholder="Ahihi" autocomplete="off"/> 
      </div>
      <a class="closepopup" href="#">X</a>
    </div>
    </div>
      );
  }

}
export default CampaignPopUp;
