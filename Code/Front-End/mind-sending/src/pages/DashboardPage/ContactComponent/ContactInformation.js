import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import imgAvatar from './../../../access/img/client3.jpg'
import axios from 'axios';
import * as Config from './../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class ContactInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
			visible: true,
			contact: {},
			contactEdit: {
				email: "",
				firstName: "",
				lastName:"",
				address:"",
				dob:"",
				auth_token:""
			},
			groupTotal: null,
			campaignTotal: null,
        };
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
	  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
	  this.onUpdateProfile = this.onUpdateProfile.bind(this);
	  this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
      
	//   this.handleChange = this.handleChange.bind(this)
    }
showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  addNotification=()=> {
	this.notificationDOMRef.current.addNotification({
	  title: `Update Contact`,
	  message: `Update Contact Success!`,
	  type: "success",
	  insert: "top",
	  container: "top-right",
	  animationIn: ["animated", "fadeIn"],
	  animationOut: ["animated", "fadeOut"],
	  dismiss: { duration: 2000 },
	  dismissable: { click: true }
	});
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  componentDidMount(){
	  console.log(this.props.history.location.state)
	  const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getSubcriberById(this.props.history.location.state) )
	
	console.log(this.state.contactEdit)
  }

  onUpdateProfile(){
	console.log(this.state.contact)
	axios.put(`${Config.API_URL}subcriber/edit/${this.props.history.location.state}`, this.state.contact,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
  .then((response) => {
	console.log(response);
	this.addNotification()
  })
  .catch((error) => {
	console.log(error);
  });
}

  getSubcriberById(id){
	axios.get(`${Config.API_URL}subcriber/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
	.then(res => {
		
		console.log(res.data);
	  const contact = {
		  firstName: res.data.firstName,
		  lastName: res.data.lastName,
		  email: res.data.email,
		  address: res.data.address,
		  createdTime: res.data.createTime,
		  type: res.data.type,
		  dob: res.data.dob,
		  openRate: res.data.openRate,
		  phone:res.data.phone,
		  clickRate: res.data.clickRate,
		  createdTime: res.data.createdTime,
	  };
	 
	  console.log(contact);
	  this.setState({contact:contact,
		groupTotal: res.data.belongGroup,
		campaignTotal: res.data.belongCampaign})
	})
  }
  goBack =()=>{
    this.props.history.goBack()
  }
    render() {

        return (<div style={{"width":"100%","height":"auto"}}>
		<div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
		<a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"40px","marginLeft":"20px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
       
		<nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Contact Information</strong>
            </span>
        </nav>
		<ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
       {/* <nav class="toolbar-css__nav___27cII_detail">
           
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
               
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">
                <a href="/dashboard/campaigns">
                Finish Later
                </a>
                </strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
        <a onClick={this.saveDraft} icon="save-draft" data-role="save-draft" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-save-draft">

            </i>Save Draft
        </a>
    </span>
    <span class="toolbar-css__send-container___AbB6n">
        <a icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Send Campaign
        </a>
    </span> */}
</div> 
        	<div className="user_profile">
        <div className="user_profile2">
        <div className="user_profile3">
        	<div className="user_profile4">
        		<div className="user_profile5">
        		<h4 className="user_profile5_h4">Contact Information</h4>
        		<p className="user_profile5_p">Edit your contact information</p>
        		</div>
        		<div className="user_profile6">
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						<label className="user_profile_w3_label" >Email address </label>
        						<div className="user_profile7_sub2">
        						<input onChange={this.handleChange} aria-invalid="false" name="email" className="user_profile_w3_input" disabled="" id="company-disabled" type="text" value={this.state.contact.email} />
        						</div>
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						<label className="user_profile_w3_label"  data-shrink="false" for="username">Phone number</label>
        						
        						<input name="phone" onChange={this.handleChange}  aria-invalid="false" className="user_profile_w3_input2" id="username" type="text" value={this.state.contact.phone}/>
        						
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label  className="user_profile_w3_label" data-shrink="false" for="first-name">First Name</label>
        						
        						<input onChange={this.handleChange} name="firstName" aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.contact.firstName}/>
        						
        					</div>
        				</div>
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Last Name</label>
        						
        						<input onChange={this.handleChange} name="lastName" aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.contact.lastName} />
        						
        					</div>
        				</div>
        			</div>
                    <div className="user_profile9">
                        <div className="user_profile9_sub">
                            <div className="user_profile9_sub1">
                                <label className="user_profile_w3_label" data-shrink="false" for="first-name">Address</label>
                                
                                <input onChange={this.handleChange} name="address" aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.contact.address}/>
                                
                            </div>
                        </div>
                        <div className="user_profile9_sub">
                            <div className="user_profile9_sub1">
                                <label className="user_profile_w3_label" data-shrink="false" for="first-name">Date of birth</label>
                                
                                <input onChange={this.handleChange} name="dob" aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="date" value={this.state.contact.dob} />
                                
                            </div>
                        </div>
                    </div>
        			
        			{/* <div className="user_profile16">
        				<div className="user_profile16_sub">
        					<label className="user_profile16_label" Style="color: rgb(170, 170, 170);">Write a note for this contact</label>
        					<div className="user_profile16_sub1">
        						<label className="user_profile16_sub1_label" data-shrink="true" for="about-me">Write an internal note below:</label>
        						
        						<div className="user_profile9_sub2">
        						<textarea aria-invalid="false" className="user_profile16_sub1_textarea" id="about-me" rows="3">
        						 This user's birthday is near                                                                                                                                          

        						</textarea>
        						</div>
        					</div>
        				</div>
        			</div> */}
        			
        		</div>	
        		<div className="user_profile11">
        				<a onClick={this.onUpdateProfile} className="user_profile_btn" tabindex="0">
        					Update Profile
        				</a>
        		</div>
        	</div>
        	
        </div>
        <div className="user_profile12 mt-20">
        		<div className="user_profile13">
        			
        			<div className="user_profile15">
        				
        				<h4>{this.state.contact.lastName} {this.state.contact.firstName} </h4>
        				<p>Added via MindSending on: {this.state.contact.createdTime}</p>
        				 {/* <div className="btn_create_contact2" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                                    <i className="fa fa-caret-down i_contact_information"></i>
                                    </div>
                                   { this.state.displayMenu ? (
                                    <ul className="ul_contact_information">
                                   <li><a href="#">Add to list</a></li>
                                   <li><a href="# ">Remove from list</a></li>
                                   <li><a href="# ">Move to list</a></li>
                                   <li><a href="# ">Copy to list</a></li>
                                   <li><a href="# ">Unsubcribe</a></li>
                                   <li><a href="# ">Resubcribe</a></li>                                  
                                   <li><a href="# ">Delete</a></li>
                                    </ul>
        ):
        (
          null
        )
        } */}
        			</div>

        		</div>
        		<div className="user_profile13">
        		 <div className="user_section user_line">	
        		  <div className="user_line">	
        			<div className="contact_information_detail">
        				<h4 >
                    		{this.state.contact.openRate}
               			</h4>
        				<p >Open rate</p>
        			</div>
        			<div className="contact_information_detail">
        				<h4 >
						{this.state.contact.clickRate}
               			</h4>
        				<p >Click rate</p>
        			</div>
        			</div>
        		 </div>
        		 <div className="user_section user_line">	
        		  <div className="user_line">	
        			<div className="contact_information_detail">
        				<h4 className="contact_information_detail_h4">
                    		Belong to: {this.state.groupTotal} groups
               			</h4>
        				
        			</div>
        			<div className="contact_information_detail">
        				<h4 className="contact_information_detail_h4" >
                    		Belong to: {this.state.campaignTotal} campaigns
               			</h4>
        				
        			</div>
        			</div>
        		 </div>		
        		</div>
        	</div>
        </div>
        </div>
			</div>
			);
	}
	
	handleChange =(e)=> {
		const { name, value } = e.target;
		// let contact = state.contact;
		// contact = {...contact, [name]: value};
		this.setState({ contact: {
			...this.state.contact,
			[name]: value
		} });
		console.log(this.state.contact)
	 }

	
}
export default withRouter(ContactInformation);