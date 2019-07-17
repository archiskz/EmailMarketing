import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CreateCampaign from './../../pages/DashboardPage/CampaignsComponent/CreateCampaigns';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import * as actions from './../../actions/index';

class CampaignPopUp extends Component {
  
   constructor(props) {
     super(props);

     this.state = {
       campaignName:"",
       visible: true,
       dropdown_visible: false,
       completed:"",
       isButtonActive:1
     };
     this.buttonClick = this.buttonClick.bind(this);
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
        <p>Your Campaign will use</p>
        <div style={{"marginBottom":"20px","marginTop":"5px","textAlign":"center"}}>
        <a style={{"float":"left","marginRight":"0px"}} onClick={()=>this.buttonClick(1)} className={`btn-create-segment-pop-up + ${this.state.isButtonActive === 1 ? 'templateactive' : null}`}  >Template</a>
        <div className="btn-create-segment-pop-up" style={{"border":"none","width":"40%","cursor":"default","color":"rgba(0, 0, 0, 0.4)","marginRight":"0px"}}
        > Or </div> 
        <a  onClick={()=>this.buttonClick(2)} style={{"float":"right","marginRight":"0px"}} className={`btn-create-segment-pop-up + ${this.state.isButtonActive === 2 ? 'templateactive' : null}`}>Simple Text</a>
        </div>
        
        <div style={{"textAlign":"center"}}>

        <button disabled={!this.state.campaignName} style={{"marginLeft":"0px","width":"150px", "float":"left", "color":"white"}}  className="btn_begin_create_campaign" 
        onClick={this.toCreateCampaign}
        type="button"
        to={{
          pathname: '/create-campaign',
          
          }}
          >Begin</button>
        <a style={{"marginLeft":"0px","float":"right","color":"white","width":"150px"}} className="btn_cancel_create_campaign" href="#">Cancel</a>
        </div>
      
        
      </div>
      <a class="closepopup" href="#">X</a>
    </div>
    
    </div>
      );
  }

  toCreateCampaign = ()=> {   
    if(this.props.automation == "automation"){
      this.props.history.push({
        pathname:'/create-automation',
        state : {
          campaignName: this.state.campaignName,
          using: this.state.isButtonActive
        }
    });
    } else {
      this.props.history.push({
        pathname:'/create-campaign',
        state : {
          campaignName: this.state.campaignName,
          using: this.state.isButtonActive
        }
    });
    }
    
    }

  buttonClick=(buttonNumber)=> {

    this.setState({
        isButtonActive: buttonNumber
    });
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
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CampaignPopUp));
