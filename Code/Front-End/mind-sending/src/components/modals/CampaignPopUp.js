import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CreateCampaign from './../../pages/DashboardPage/CampaignsComponent/CreateCampaigns';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';

class CampaignPopUp extends Component {
  
   constructor(props) {
     super(props);

     this.state = {
       campaignName: "",
       visible: true,
       dropdown_visible: false,
     };
   }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }

   onChange = (event) => {
    this.setState({campaignName: event.target.value});
    console.log(this.state.campaignName);
  }
  onCreateName=()=>{
    this.props.onCreateCampaign(this.state.campaignName);
  }
  
  render(){
    var campaign = this.state.campaignName
     return (
       
         <div className="popup" id="popup">
    <div className="popup-inner">
      <div className="popupphoto">
        <img src="https://images.pexels.com/photos/193349/pexels-photo-193349.jpeg?cs=srgb&dl=access-algorithm-binary-193349.jpg&fm" alt="">
        </img>
      </div>

        <div className="popuptext">
        <div className="popup-header">
        {/* <img className="img-pop-up" src="https://img.icons8.com/cool-color/64/000000/upload-mail.png"/> */}
        <h1>CAMPAIGN NAME</h1>
        </div>
        <p>Keep your subscribers engaged by sharing your latest news, promoting a line of products, or announcing an event.</p>
        <input onChange={this.onChange.bind(this)} className="iput_pop_up" placeholder="Write down your campaign name" autocomplete="off"/> 
        <div>
        <Link  className="btn-create-segment-pop-up" 
        onClick={this.onCreateName}
        to={{
          pathname: '/create-campaign',
          
          }}>Begin</Link>
        <a className="btn-create-segment-pop-up" href="#">Cancel</a>
        </div>
      
        
      </div>
      <a class="closepopup" href="#">X</a>
    </div>
    
    </div>
      );
  }

}
const mapStateToProps = (state) => {
  return {
   newCampaign : state.campaignName
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
      onCreateCampaign: (newCampaign)=> {
        dispatch(actions.createNewCampaign(newCampaign));
      }
    };
  };
export default connect(mapStateToProps, mapDispatchToProps) (CampaignPopUp);
