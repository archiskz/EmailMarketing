import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ContactRow from './../../../components/row/ContactRow';
import * as Config from './../../../constants/Config';

import imgAvatar from './../../../access/img/client3.jpg'


import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class ViewUserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
			visible: true,
			account:{
				address: "",
				createdTime: "",
				email: "",
				fullname: "",
				gender: "",
				password: "",
				phone: "",
				status: "",
				username: "",
				id:1
			  }
		};
		this.handleChange = this.handleChange.bind(this);
		this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();	
	}
	componentDidMount(){
		const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=>this.getAccount())
   }

   getAccount(){
	axios.get(`${Config.API_URL}account/1`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
	  console.log(res);
	  
	  this.setState({account: res.data});
	  delete this.state.account.password
	  delete this.state.account.status
    }).catch(error =>{
      console.log(error)
    }) 
   }

   addNotification() {
	this.notificationDOMRef.current.addNotification({
	  title: "Update Account",
	  message: "Updated Success!",
	  type: "success",
	  insert: "top",
	  container: "top-right",
	  animationIn: ["animated", "fadeIn"],
	  animationOut: ["animated", "fadeOut"],
	  dismiss: { duration: 2000 },
	  dismissable: { click: true }
	});
  }

   updateAccount=()=>{
	axios.put(`${Config.API_URL}account/edit`,this.state.account,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
		console.log("updates")
	  this.addNotification()
    }).catch(error =>{
      console.log(error)
    }) 
   }
   handleChange=(event)=>{
	var name = event.target.name
	var value = event.target.value
	this.setState({
		account:{
			...this.state.account,
			[name]:value
		}
	},()=>{console.log(this.state.account)})
   }
	

 render(){
 	return(
 			<div className = "" >
        <div className >
          <div className="flash_notice">
		  <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />	
          </div>
        <div className="container" data-role="main-app-container">
        	<header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span Style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">User Profile
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        </header>
        <div className="user_profile">
        <div className="user_profile2">
        <div className="user_profile3">
        	<div className="user_profile4">
        		<div className="user_profile5">
        		<h4 className="user_profile5_h4">Edit Profile</h4>
        		<p className="user_profile5_p">Complete your profile</p>
        		</div>
        		<div className="user_profile6">
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						<label className="user_profile_w3_label" >Username </label>
        						<div className="user_profile7_sub2">
        						<input name="username" aria-invalid="false" disabled={true} className="user_profile_w3_input" disabled="" id="company-disabled" type="text" value={this.state.account.username} />
        						</div>
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="username">Email address</label>
        						
        						<input onChange={this.handleChange} aria-invalid="false" name="email" className="user_profile_w3_input2" id="username" type="email" value={this.state.account.email}/>
        						
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label"  data-shrink="false" for="first-name">Full Name</label>
        						
        						<input onChange={this.handleChange} aria-invalid="false" name="fullname" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.account.fullname}/>
        						
        					</div>
        				</div>
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label"  data-shrink="false" for="first-name">Phone Number</label>
        						
        						<input onChange={this.handleChange} aria-invalid="false" name="phone" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.account.phone}/>
        						
        					</div>
        				</div>
        			</div>
					<div className="user_profile9">
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Address</label>
        						
        						<input onChange={this.handleChange} aria-invalid="false" name="address" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.account.address} />
        						
        					</div>
        				</div>
        			</div>
        			{/* <div className="user_profile9">
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">City</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="Hồ Chí Minh city"/>
        						
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Country</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="Việt Nam" />
        						
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Postal code</label>
        					
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="70000" />
        						
        					</div>
        				</div>
        			</div>
        			<div className="user_profile16">
        				<div className="user_profile16_sub">
        					<label className="user_profile16_label" Style="color: rgb(170, 170, 170);">Keep in touch with me</label>
        					<div className="user_profile16_sub1">
        						<label className="user_profile16_sub1_label" data-shrink="true" for="about-me">Below is my information:</label>
        						
        						<div className="user_profile9_sub2">
        						<textarea aria-invalid="false" className="user_profile16_sub1_textarea" id="about-me" rows="3">
        						MindSending is an internet marketing platform designed for small businesses. 
        						With MindSending, you can launch various campaigns to engage with your subscribers,
        						like emails, SMS, Facebook messenger and social campaigns for all major social media platforms,
        						automated drip email campaigns.

								MindSending also offers a bundle of advanced marketing automation features, 
								transactional email delivery API, and all-in-one CRM for small businesses to manage their customers and teams efficiently on the MindSending app.                                                                       FPT University, Quang Trung Software, 0938169174.                                                                            

        						</textarea>
        						</div>
        					</div>
        				</div>
        			</div>
        			 */}
        		</div>	
        		<div className="user_profile11">
        				<button onClick={this.updateAccount} className="user_profile_btn" tabindex="0" type="button">
        					Update Profile
        				</button>
        			</div>
        	</div>
        	
        </div>
        <div className="user_profile12">
        		<div className="user_profile13">
        			<div className="user_profile14">
        				<img src={imgAvatar} alt="..."/>
        			</div>
        			<div className="user_profile15">
        				<h6>CEO / CO-FOUNDER</h6>
        				<h4>Thắng Nguyễn</h4>
        				<p></p>
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
 }
export default ViewUserProfile;