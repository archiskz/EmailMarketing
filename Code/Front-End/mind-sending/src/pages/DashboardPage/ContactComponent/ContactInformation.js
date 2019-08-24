import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import imgAvatar from './../../../access/img/client3.jpg'
import axios from 'axios';
import * as Config from './../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ListRow from './../../../components/row/ListRow';
import CampaignRow from './../../../components/row/CampaignRow'

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
			campaignDTOList:[],
			groupContactDTOList:[]
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
		campaignTotal: res.data.belongCampaign,
		campaignDTOList: res.data.campaignDTOList,
		groupContactDTOList: res.data.groupContactDTOList,})
	})
  }
  goBack =()=>{
    this.props.history.goBack()
  }
    render() {
		var groups = this.state.groupContactDTOList
		var campaigns = this.state.campaignDTOList
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
      
</div> 
        	<div className="user_profile">
        <div className="user_profile2">
        <div className="user_profile3 flex50">
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
        <div style={{"paddingLeft":"30px", "paddingRight":"30px"}} className="leftright30 user_profile12 mt0 flex50 maxwidth100">
        		<div className="user_profile13">
        			
        			<div className="user_profile15">
        				
        				<h4>{this.state.contact.lastName} {this.state.contact.firstName} </h4>
        				<p>Added via MindSending on: {this.state.contact.createdTime}</p>
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
        		 {/* <div className="user_section user_line">	
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
        		 </div>		 */}
        		</div>
				<Tabs style={{marginTop:"20px","backgroundColor":"white", boxShadow: "0 1px 2px 1px rgba(0,0,0,.2)", "boderRadius":"50px", width:"95%", position:"relative", right:"-18px"}}>
                  <TabList>
                    <Tab>Group</Tab>
                    <Tab>Campaign</Tab>
                  </TabList>

                  <TabPanel>
				  {/* Request */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
                  {/* {this.state.request} */}
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Group Name</th>
                    <th scope="col">Description</th>
					<th scope="col">Total contacts</th>
                    
                  </tr>
                </thead>
                <tbody>
                { groups.length > 0 ? 
                  groups.map((list,index) => (
                    <ListRow
                update={this.getAllListContact}
                key={list.index}
                contactId={list.id}
                contactEmail={list.name}
                contactStatus={list.description}
                // contactDateAdded={list.totalContacts}
				/>
                )) : "No contact"
                }
                  
                </tbody>
              </table>
                    </div>
				  </TabPanel>
				  <TabPanel>
				  {/* Request */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
                  {/* {this.state.request} */}
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    {/* <th scope="col">#</th> */}
					<th scope="col">Status</th>
                    <th scope="col">Campaign Name</th>
                    <th scope="col">Delivery</th>
					<th scope="col">Opens</th>
                    <th scope="col">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                { campaigns.length > 0 ? 
                  campaigns.map((list,index) => (
                    <CampaignRow
                                        id={list.id}
                                        key={list.index}
                                        status={list.status}
                                         campaignName={list.name}
                                         bodyJson = {list.bodyJson}
                                         click={list.clickRate}
                                         open={list.openRate}
                                         delivery={list.delivery}
                                         updateList={this.getAllCampaign}
										 noaction = "true"
                                     />
                )) : "No contact"
                }
                  
                </tbody>
              </table>
                    </div>
				  </TabPanel>
				</Tabs>
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