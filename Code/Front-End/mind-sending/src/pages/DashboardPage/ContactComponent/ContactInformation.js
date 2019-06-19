import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgAvatar from './../../../access/img/client3.jpg'

class ContactInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };
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
        						<input aria-invalid="false" className="user_profile_w3_input" disabled="" id="company-disabled" type="text"value="MindSending" />
        						</div>
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="username">Phone number</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="username" type="text" value="thangnguyen15297@gmail.com"/>
        						
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">First Name</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="Thắng"/>
        						
        					</div>
        				</div>
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Last Name</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text"value="Nguyễn" />
        						
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Address</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="Hồ Chí Minh city"/>
        						
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">City</label>
        						
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="Việt Nam" />
        						
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label className="user_profile_w3_label" data-shrink="false" for="first-name">Date of birth</label>
        					
        						<input aria-invalid="false" className="user_profile_w3_input2" id="first-name" type="text" value="70000" />
        						
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
        				<button className="user_profile_btn" tabindex="0" type="button">
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
        				
        				<h4>Thắng Nguyễn</h4>
        				<p>Added via MindSending on Wednesday, June 19, 2019</p>
        				<div onClick={this.onToggleDropdown} className="btn_create_contact2" tabindex="0" type="button" data-dropdown-toggle="true" data-role="bulk-actions-toggle">
                                    
                                    Action
                                    <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </Link>
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts" className="dropdown-link dropdown-link-with-icon" >
                                            <i className="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </Link>
                                    </ul>
                                </div>
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
}
export default ContactInformation;