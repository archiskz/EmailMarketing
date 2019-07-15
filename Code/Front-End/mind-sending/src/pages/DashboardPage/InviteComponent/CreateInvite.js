import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';
import apiCaller from './../../../utils/apiCaller';
import ChooseTemplateModal from './../../../components/modals/ChooseTemplateModal';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import imm_bg from './../../../access/img/invited.png';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';
import OneTemplate from './../../../components/OneTemplate';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class CreateInvite extends Component{
   constructor(props) {
     super(props);

     this.state = {
       startDate: new Date(),
       height: 755,
      modalIsOpen: false,
       selectValue: "",
      campaignName:"",
       visible: true,
       dropdown_visible: false,
       toVisible: true,
       fromVisible: true,
       subjectVisible: true,
       contentVisible: true,
       campaignId: 0,
       templates:[],
        lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}]
        ,
        newCampaign:{
          campaignDTO:{
              campaignName: "",
              gcCampaignDTOS: [
                {
                  groupContactId: 1
                }
              ],
              timeStart:"",
              status: "z",
              type: "z"
          },
          mailObjectDTO:{
              body: "",
               from: "",
              fromMail: "",
              subject: "",
              templates: ""

          }
        }       
     };
     this.fields = { text: 'name', value: 'id' };
     this.handleChange = this.handleChange.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDate = this.handleDate.bind(this);
   }
   handleDate(date) {
    this.setState({ newCampaign: {
      ...this.state.newCampaign,
      campaignDTO:{
        ...this.state.newCampaign.campaignDTO,
        timeStart: date,
        auth_token:""
    }
    
    } });
  }
   
  componentDidMount (){
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {
      this.getAllGroupContacts();
      this.getAllTemplates();
    });
     
     this.setState({height: this.refs.height.clientHeight})
    
    

   }

   getAllGroupContacts=()=>{
    axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      this.setState({
        lists: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
   }

   getAllTemplates=()=>{
    axios.get(`${Config.API_URL}template`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({templates: res.data});
    }) 
   }
   onChangeListsSelect(args){
    var numbers = args.value;
    let selectValue = numbers.map((select)=>{
      var select= select;
      return {
            groupContactId: select
      }
    });
   
    this.setState({selectValue}, () => { console.log('------------------', this.state)})
  }

  
   handleChange(event) {
    this.setState({selectValue: event.target.value});
    console.log("now" + this.state.selectValue);
  }
  onChangeListsSelect=(args)=>{
    console.log(args.value)
    var numbers = args.value;
    let selectValue = numbers.map((select)=>{
      var select= select;
      return {
            groupContactId: select
      }
    });

    this.setState({ newCampaign: {
      ...this.state.newCampaign,
      campaignDTO:{
        ...this.state.newCampaign.campaignDTO,
        gcCampaignDTOS: selectValue,
    },
    }
		
		} );
  }

	
  render(){
    var lists = this.state.lists;
    var listTemplates = this.state.templates
     return (
       <div style={{"width":"100%","height":"100%"}}>
      <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Create Invitation</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
        <a onClick={this.saveDraft} icon="save-draft" data-role="save-draft" class="btn btn-secondary btn-on-dark btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-save-draft">

            </i>Save Draft
        </a>
    </span>
    {/* <span class="toolbar-css__send-container___AbB6n">
        <a icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Send Campaign
        </a>
    </span> */}
</div>
      <div className="new-campaign-container lefts" style={{"height":`calc(${this.state.height}px)`}} >
    <img src={imm_bg}></img>
      </div>
      <div className="user_profile3 right" ref="height">
        	<div className="user_profile4" >
          <div className="user_profile5">
        		<h4 className="user_profile5_h4">Invite Name:</h4>
        		<div className="user_profile5_p"> 
            <a style={{"backgroundColor":"transparent","color":"white","float":"left","marginTop":"10px"}} class="fas fa-edit margin_td_fontawsome"  title="Edit"> </a>
            <input style={{"backgroundColor":"transparent","color":"white","width":"auto","float":"left","border-bottom":"none"}} 
            placeholder="Invitation Name" name="campaignName" aria-invalid="false" onChange={this.handleChange} 
            className="user_profile_w3_input" disabled="" id="company-disabled" type="text"  />
            </div>
        		</div>
        		<div className="user_profile6">
            <h3>Basic Settings<h5 style = {{"fontStyle":"italic"}}>Edit the detail of your invite mail</h5></h3>
            <div className="user_profile7">
        			
        					<div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >Invite Mail Title </label>
        					
        						<input aria-invalid="false" placeholder="Enter your invite mail title" name="title" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled="" id="company-disabled" type="text" value={this.state.newCampaign.campaignDTO.campaignName}  />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                   
        					</div>
        				
        			</div>
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						<label className="user_profile_w3_label" >Date and Time </label>
                      <div className="control-styles">
                        
                        <DatePicker
                            selected={this.state.newCampaign.campaignDTO.timeStart}
                            onChange={this.handleDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                        />
                      </div>
        					</div>
        				</div>
        				
        			</div>
                    
        		
        		</div>	
            
            <div className="user_profile6">
            <h3>Mail Settings<h5 style = {{"fontStyle":"italic"}}>What's the subject line for this campaign?</h5></h3>
            <div className="user_profile7">
            <div className="user_profile9_sub">
              <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
                <label className="user_profile_w3_label" >To </label>
                <MultiSelectComponent ref={(scope) => { this.mulObj = scope; }}  
                          style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important"}} 
                          id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                          change={this.onChangeListsSelect}
                          placeholder="Choose Lists"/>   
              </div>
              </div>
            
          </div>
          <div className="user_profile7">
            <div className="user_profile9_sub">
            <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >From </label>
        					
        						<input aria-invalid="false" placeholder="Sender Name" name="from" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled="" id="company-disabled" type="text" value={this.state.newCampaign.mailObjectDTO.from}  />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                   
        					</div>
            </div>
            <div className="user_profile9_sub">
            <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
              <label className="user_profile_w3_label" style={{"color":"white"}} >.</label>					
        						<input aria-invalid="false" placeholder="Email Address" name="fromMail" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled="" id="company-disabled" type="text" value={this.state.newCampaign.mailObjectDTO.fromMail}  />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                   
        					</div>
            </div>
        					
                  
        				
        			</div>
              <div className="user_profile7">
        			
        					<div className="user_profile7_sub1" style={{"marginLeft":"30px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >Subject </label>
        					
        						<input aria-invalid="false" placeholder="Email subject" name="subject" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled="" id="company-disabled" type="text" value={this.state.newCampaign.mailObjectDTO.subject}  />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                   
        					</div>
        				
        			</div>
              <a className='user_profile_btn' onClick={this.openModal}  tabindex="0" type="button">
        					Choose Template
        				</a>
        		</div>
            {/* ENDSUBJECT */}
            {/* Content */}
	
            {/* END CONTENT */}
            <Modal visible={this.state.modalIsOpen} width="80%" height="96%" effect="fadeInUp" 
      onClickAway={this.closePreviewModal}>
            
            
          <div className="flash_notice">
          </div>
        <div className="container" style={{"background":"white", "height":"96%"}} data-role="main-app-container">
        <div>
  <div data-role="marketing-templates-app" className="container">
    <div className="templates-list-views listView-css__list-view___1G-eZ">
      <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Invitation Templates
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6" style={{"display": "block", "textAlign":"left", "paddingLeft":"13%"}}>
                            
                            {/* <Link icon="segment" style={{"float":"left","display": "inline-block"}} className="width50 btn_create_contact" to="/new-template">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Continue
                                </Link> */}
                                <a icon="segment" style={{"float":"left","display": "inline-block"}} className="width50 btn_create_contact" onClick={this.closeModal}>
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Cancel
                                </a>
                            
                        </div>
        <div className="col-md-12">
        
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-views" style={{"width": "90%","height":"75%"}}>
      {this.state.templates.map(list=>(
               <OneTemplate
                    campaignId={this.props.campaignId}
                    id={list.id}
                    key={list.index}
                    templateName={list.nameTemplate}   
                    image={this.state.htmlImage}
                    preview={false}
                    content={list.content}
                    onChooseTemplate = {this.onChooseTemplate}
                     />
          ))}    
      </div>
    </div>
  </div>
</div>

        </div>
        
    
        
  </Modal>
        	</div>
        	
        </div>
        
      </div>

      );
  }


  onChooseTemplate = (id, content)=>{
    this.props.history.push({
      pathname:`/edit-content/:${id}`,
      state : {
        id: id,
        campaignId: this.state.campaignId,
        contentJson: content
      }
  });
  }
  saveDraft =()=>{
    // axios.post(`${Config.API_URL}campaign/create`,this.state.newCampaign)
    // .then(response => {
    //   console.log(response.data)
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }
  
  handleChange =(e)=> {
    const { name, value } = e.target;
    if(name === "campaignName"){
      this.setState({ newCampaign: {
        ...this.state.newCampaign,
        campaignDTO:{
          ...this.state.newCampaign.campaignDTO,
          [name]: value
      }
      
      } });
    } else{
      this.setState({ newCampaign: {
        ...this.state.newCampaign,
        mailObjectDTO:{
          ...this.state.newCampaign.mailObjectDTO,
          [name]: value
      }
      
      } });
    }
		
		console.log(this.state.newCampaign)
	 }



  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});

    console.log("modal is open:" + this.state.modalIsOpen)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  closePreviewModal=()=>{
    this.setState({modalIsOpen: false})
  }

  showModal =()=>{
    this.setState({modalIsOpen: true})
    var self = this;
    axios.post(`${Config.API_URL}campaign/create`,this.state.newCampaign,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      console.log(response.data)
      var id = response.data
          self.setState({
            campaignId: id
          },
          ()=> {
            this.props.onOpenModal();})
          console.log(this.state.campaignId)
    })
    .catch(error => {
      console.log(error);
    });
    
  }
}

export default withRouter(CreateInvite);
