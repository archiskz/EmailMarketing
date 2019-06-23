import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import imgAvatar from './../../../access/img/client3.jpg'
import axios from 'axios';
import * as Config from './../../../constants/Config';

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
				dob:""
			}
        };
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
	  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
	  this.onUpdateProfile = this.onUpdateProfile.bind(this);
	//   this.handleChange = this.handleChange.bind(this)
    }
showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  componentDidMount(){
	  console.log(this.props.history.location.state)
	this.getSubcriberById(this.props.history.location.state)
	console.log(this.state.contactEdit)
  }

  onUpdateProfile(){
	console.log(this.state.contact)
	axios.put(`${Config.API_URL}subcriber/edit/${this.props.history.location.state}`, this.state.contact)
  .then((response) => {
	console.log(response);
  })
  .catch((error) => {
	console.log(error);
  });
}

  getSubcriberById(id){
	axios.get(`${Config.API_URL}subcriber/${id}`,)
	.then(res => {
		
		// console.log(res.data);
	  const contact = {
		  firstName: res.data.firstName,
		  lastName: res.data.lastName,
		  email: res.data.email,
		  address: res.data.address,
		  createdTime: res.data.createTime,
		  type: res.data.type,
		  dob: res.data.dob
	  };
	  console.log(contact);
	  this.setState({contact:contact})
	})
  }

    render() {

        return (
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
        						
        						<input  aria-invalid="false" className="user_profile_w3_input2" id="username" type="text" value=""/>
        						
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
                                
                                <input onChange={this.handleChange} name="dob" aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value={this.state.contact.dob} />
                                
                            </div>
                        </div>
                    </div>
        			
        			<div className="user_profile16">
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
        			</div>
        			
        		</div>	
        		<div className="user_profile11">
        				<a onClick={this.onUpdateProfile} className="user_profile_btn" tabindex="0">
        					Update Profile
        				</a>
        		</div>
        	</div>
        	
        </div>
        <div className="user_profile12">
        		<div className="user_profile13">
        			<div className="user_profile14">
        				<img src={imgAvatar} alt="..."/>
        			</div>
        			<div className="user_profile15">
        				
        				<h4>Thắng Nguyễn</h4>
        				<p>Added via MindSending on {this.state.contact.createdTime}</p>
        				 <div className="btn_create_contact2" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
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
        }
        			</div>

        		</div>
        		<div className="user_profile13">
        		 <div className="user_section user_line">	
        		  <div className="user_line">	
        			<div className="contact_information_detail">
        				<h4 >
                    		0%
               			</h4>
        				<p >Open rate</p>
        			</div>
        			<div className="contact_information_detail">
        				<h4 >
                    		0%
               			</h4>
        				<p >Click rate</p>
        			</div>
        			</div>
        		 </div>
        		 <div className="user_section user_line">	
        		  <div className="user_line">	
        			<div className="contact_information_detail">
        				<h4 >
                    		0%
               			</h4>
        				<p >Reply rate</p>
        			</div>
        			<div className="contact_information_detail">
        				<h4 >
                    		0%
               			</h4>
        				<p >Report rate</p>
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