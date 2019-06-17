import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ContactRow from './../../../components/row/ContactRow';
import * as Config from './../../../constants/Config';
import imgAvatar from './../../../access/img/me1.jpg'

class ViewUserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };
    }

 render(){
 	return(
 			<div className = "" >
        <div className >
          <div className="flash_notice">
          </div>
        <div className="container" data-role="main-app-container">
        	<header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">User Profile
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
        		<h4 class="user_profile5_h4">Edit Profile</h4>
        		<p class="user_profile5_p">Complete your profile</p>
        		</div>
        		<div className="user_profile6">
        			<div className="user_profile7">
        				<div className="user_profile7_sub">
        					<div className="user_profile7_sub1">
        						<label class="user_profile7_sub1_label" data-shrink="false" for="company-disabled">Company </label>
        						<div className="user_profile7_sub2">
        						<input aria-invalid="false" class="user_profile7_sub2_input" disabled="" id="company-disabled" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        				<div className="user_profile8_sub">
        					<div className="user_profile8_sub1">
        						<label class="user_profile8_sub1_label" data-shrink="false" for="username">Username</label>
        						<div className="user_profile8_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="username" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        				<div className="user_profile8_sub">
        					<div className="user_profile8_sub1">
        						<label class="user_profile8_sub1_label" data-shrink="false" for="username">Email address</label>
        						<div className="user_profile8_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="username" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label class="user_profile9_sub1_label" data-shrink="false" for="first-name">First Name</label>
        						<div className="user_profile9_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="first-name" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        				<div className="user_profile9_sub">
        					<div className="user_profile9_sub1">
        						<label class="user_profile9_sub1_label" data-shrink="false" for="first-name">Last Name</label>
        						<div className="user_profile9_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="first-name" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        			</div>
        			<div className="user_profile9">
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label class="user_profile9_sub1_label" data-shrink="false" for="first-name">City</label>
        						<div className="user_profile9_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="first-name" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label class="user_profile9_sub1_label" data-shrink="false" for="first-name">Country</label>
        						<div className="user_profile9_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="first-name" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        				<div className="user_profile10">
        					<div className="user_profile9_sub1">
        						<label class="user_profile9_sub1_label" data-shrink="false" for="first-name">Postal code</label>
        						<div className="user_profile9_sub2">
        						<input aria-invalid="false" class="user_profile8_sub2_input" id="first-name" type="text" value=""/>
        						</div>
        					</div>
        				</div>
        			</div>
        			<div className="user_profile11">
        				<button class="user_profile_btn" tabindex="0" type="button">
        					Update Profile
        				</button>
        			</div>
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
        				<p>Đẹp trai có gì là sai...</p>
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