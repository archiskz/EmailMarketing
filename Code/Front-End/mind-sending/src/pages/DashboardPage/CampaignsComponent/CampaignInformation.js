import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';
import apiCaller from './../../../utils/apiCaller';
import ChooseTemplateModal from './../../../components/modals/ChooseTemplateModal';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import imm_bg from './../../../access/img/bgr-campaign.jpg'
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import CampaignPopUp from './../../../components//modals/CampaignPopUp.js';
import EmailEditor from 'react-email-editor';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import { withRouter } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import FunelChart from '../../../components/chart/FunelChart'

import ValidateField from '../../../components/inputValidate/ValidateField';
class CampaignInformation extends Component{
   constructor(props) {
     super(props);
     this.editor = null; 
     this.isComponentMounted = false;
     this.isEditorLoaded = false;
     this.state = {
      bounce: "",
      click:  "",
      delivery: "",
      open: "",
      request:"",
      spam:"",
      id: this.props.history.location.state.id,
       height: 755,
      modalIsOpen: false,
       selectValue: "",
      campaignName:this.props.newCampaign,
       visible: true,
       dropdown_visible: false,
       toVisible: true,
       fromVisible: true,
       subjectVisible: true,
       contentVisible: true,
        lists:[]
        ,
        campaign:{
        },
        selectedGrup :[],
        updateCampaign:{
            campaignDTO: {
              campaignName: "string",
              gcCampaignDTOS: [
                {
                  groupContactId: 0
                }
              ],
              status: "string",
              type: "string"
            },
            mailObjectDTO: {
              body: "string",
              bodyJson: "",
              from: "string",
              fromMail: "string",
              subject: "string",
            }
          },
          auth_token:"",
          data1:[],
          contactBounce: [
            ""
          ],
          contactClicked: [
            ""
          ],
          contactDelivery: [
            ""
          ],
          contactOpened: [
            ""
          ],
          contactRequest: [
            ""
          ],
          contactSpam: [
            ""
          ]
     };
     this.fields = { text: 'name', value: 'id' };
     this.handleChange = this.handleChange.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
   }
  
   
   componentDidMount (){
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> { this.getCampaign();
      this.getAllGroups();
      this.isComponentMounted = true; 
      this.loadTemplate()} )
    
   }

   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Campaign",
      message: "Save Draft Campaign Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
    // this.props.history.goBack()
  }
   onLoad = () => { 
     this.isEditorLoaded = true; 
     this.loadTemplate();
     }

   loadTemplate = () => { 
     if (!this.isEditorLoaded || !this.isComponentMounted) 
     return; 
     if(this.state.updateCampaign.mailObjectDTO.bodyJson != ""){
      this.editor.loadDesign(JSON.parse(this.state.updateCampaign.mailObjectDTO.bodyJson))
     } else this.editor.loadDesign(JSON.parse(this.props.history.location.state.bodyJson)) }

   getCampaign(){
          this.setState({height: this.refs.height.clientHeight})
          var id = this.props.history.location.state.id
        axios.get(`${Config.API_URL}campaign/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(response => {
          console.log(response.data)
          var oldGroups = response.data.gcCampaignDTOS
          let oldGroupsNumber = oldGroups.map((group, index, oldGroups)=>{
            return group.groupContactId
          })

          this.setState({
            campaign: response.data,
            selectedGrup: oldGroupsNumber,
            updateCampaign:{
              campaignDTO: {
                campaignName: response.data.campaignName,
                gcCampaignDTOS: response.data.gcCampaignDTOS,
                status: response.data.status,
              },
              mailObjectDTO: {
                body: response.data.body,
                bodyJson: response.data.bodyJson,
                from: response.data.from,
                fromMail: response.data.fromMail,
                subject: response.data.subject,
              }
            },
            bounce: response.data.bounce,
            click:  response.data.click,
            delivery: response.data.delivery,
            open: response.data.open,
            request:response.data.request,
            spam:response.data.spam,
            data1:[
              { x: "Clicked", y: response.data.click, text: "Clicked" },
                  { x: "Opened", y: response.data.open, text: "Opened" },
                   { x: "Delivery", y: response.data.delivery, text: "Delivery" },
                   { x: "Request", y: response.data.request, text: "Request" }
            ],
            contactBounce: response.data.contactBounce,
            contactClicked: [
              response.data.contactClicked
            ],
            contactDelivery: [
              response.data.contactDelivery
            ],
            contactOpened: [
              response.data.contactOpened
            ],
            contactRequest: [
              response.data.contactRequest
            ],
            contactSpam: [
              response.data.contactSpam
            ]
          },()=>{
            console.log(this.state)
          }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
   getAllGroups(){
    console.log(`${this.state.height}px !important`)
    this.setState({height: this.refs.height.clientHeight})
    console.log(`${Config.API_URL}groupContacts`);
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
    var numbers = args.value;
    let selectValue = numbers.map((select)=>{
      var select= select;
      return {
            groupContactId: select
      }
    });

    this.setState({ updateCampaign: {
      ...this.state.updateCampaign,
      campaignDTO: {
        ...this.state.updateCampaign.campaignDTO,
          gcCampaignDTOS: selectValue
      }
      
    ,
    }
		
		},()=>{
      console.log(this.state.updateCampaign)
    } );
  }
  goBack =()=>{
    this.props.history.goBack()
  }
  sendCampaign(){
    var self = this
    
   this.setState({isLoading: true},()=>{
    axios.post(`${Config.API_URL}campaign/send/?id=${this.state.id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      self.setState({
        isLoading: false
    }, ()=>{
      self.addNotification()
      self.props.updateList();
      self.closeModal()
    });
    

    }).catch(error=>{
      console.log(error.response.data)
    }) 
   })
    
  }

	
  render(){
    var lists = this.state.lists;
    var bounces = this.state.contactBounce
    var spams = this.state.contactSpam
    var opens = this.state.contactOpened
    var clicks = this.state.contactClicked
    var deliverys = this.state.contactDelivery
    var requests = this.state.contactRequest

    console.log(requests)
     return (
       <div style={{"width":"100%","height":"100%"}}>
       <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
      <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
      <a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"40px","marginLeft":"10px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
        <nav class="toolbar-css__nav___27cII_detail">
           
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVdd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
               
                </span>
                <strong class={`navToggleButton-css__toggle-name___3Y4ez ${this.state.updateCampaign.campaignDTO.status !== "Draft" ? "" : "activeText"}`}>
                Campaign Information
                {/* <a href="/dashboard/campaigns">
                Finish Later
                </a> */}
                <CampaignPopUp />
                </strong>
               
                <strong class={`navToggleButton-css__toggle-name___3Y4ez ${this.state.updateCampaign.campaignDTO.status === "Draft"  ? "" : "activeText"}`}>
                Edit Campaign
                </strong>
            </span>
        </nav>
        <span style={{marginLeft: "-50px"}} class="toolbar-css__save-container___2x7qH">
        
    </span>
    
    <span class="toolbar-css__send-container___AbB6n">
        {/* <a onClick={()=>this.sendCampaign()} icon="airplane-fill" data-role="send-or-schedule-btn" class={`btn btn-primary btn-on-dark  btn-with-icon btn-with-icon ${this.state.updateCampaign.campaignDTO.status == "Draft" ? '' : 'activeText'}`}>
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Send Campaign
        </a> */}
    </span>
    <span style={{marginRight: "20px",marginLeft: "-50px"}} class="toolbar-css__save-container___2x7qH">
        <a onClick={this.saveDraft} icon="save-draft" data-role="save-draft" class={`btn btn-primary btn-on-dark  btn-with-icon btn-with-icon ${this.state.updateCampaign.campaignDTO.status == "Draft" ? '' : 'activeText'}`}>
            <i class="sg-icon sg-icon-save-draft">

            </i>Save Draft
        </a>
    </span>
</div>
      <div className="user_profile">
      <div className="user_profile2">
      <div className="user_profile3 flex50" ref="height">
        	<div className="user_profile4" >
        		<div className="user_profile5">
        		<h4 className="user_profile5_h4">Campaign Name:</h4>
        		<div className="user_profile5_p"> 
            <a style={{"backgroundColor":"transparent","color":"white","float":"left","marginTop":"10px"}} class="fas fa-edit margin_td_fontawsome"  title="Edit"> </a>
            <input  style={{"backgroundColor":"transparent","color":"white","width":"auto","float":"left","border-bottom":"none"}} 
            placeholder="Campaign Name" name="campaignName" aria-invalid="false" onChange={this.handleChange} 
            className="user_profile_w3_input" 
            disabled={this.state.updateCampaign.campaignDTO.status == "Sending" || this.state.updateCampaign.campaignDTO.status == "Done"  ? true : false}
             id="company-disabled" type="text" 
            value={this.state.updateCampaign.campaignDTO.campaignName} />
            </div>
        		</div>
        		<div className="user_profile6">
            <h3>To<h5 style = {{"fontStyle":"italic"}}>Who are you sending this campaign to?</h5></h3>
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						<label className="user_profile_w3_label" >Choose Lists </label>
                      <div className="control-styles">
                        <MultiSelectComponent ref={(scope) => { this.mulObj = scope; }}  
                          style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important"}} 
                          id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                          enabled={this.state.updateCampaign.campaignDTO.status == "Sending" || this.state.updateCampaign.campaignDTO.status == "Done" ? false : true}
                          value={this.state.selectedGrup}
                          change={this.onChangeListsSelect}
                          placeholder="Lists"/>
                      </div>
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						{/* <label className="user_profile_w3_label" data-shrink="false" for="username">Segment</label> */}
        						
        						{/* <input aria-invalid="false" className="user_profile_w3_input2" id="username" type="text" value="thangnguyen15297@gmail.com"/> */}
        					
                    {/* <select className="inputContact mt15" style={{"width": "250px", "borderBottom":"1px solid #ccc !important"}} value={this.state.selectValue} onChange={this.handleChange} type="text" tabindex="-1" readonly="readonly" role="presentation">
                            {lists.map(list => <option value={list.name}  key={list.id}>{list.name}</option>)}
                            </select> */}
        					</div>
        				</div>
        			</div>
        		
        		</div>	
            {/* END TO */}
            {/* FROM */}
            <div className="user_profile6">
            <h3>From<h5 style = {{"fontStyle":"italic"}}>Who is sending this campaign?</h5></h3>
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						{/* <label className="user_profile_w3_label" >Sender Name </label> */}
        						<div className="user_profile7_sub2">
        						<input placeholder="Sender Name" name="from" aria-invalid="false" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled={this.state.updateCampaign.campaignDTO.status == "Sending" || this.state.updateCampaign.campaignDTO.status == "Done" ? true : false} id="company-disabled" type="text" value={this.state.updateCampaign.mailObjectDTO.from} />
        						</div>
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						{/* <label className="user_profile_w3_label" data-shrink="false" for="username">Email Address</label> */}
        						
        						<input aria-invalid="false" disabled={this.state.updateCampaign.campaignDTO.status == "Sending" || this.state.updateCampaign.campaignDTO.status == "Done" ? true : false} onChange={this.handleChange} name="fromMail" 
                    className="user_profile_w3_input2" placeholder="Email Address" id="username" type="text" value={this.state.updateCampaign.mailObjectDTO.fromMail} />
        						
        					</div>
        				</div>
        			</div>
        		
        		</div>	
            {/* END FROM */}
            {/* SUBJECT */}
            <div className="user_profile6">
            <h3>Subject<h5 style = {{"fontStyle":"italic"}}>What's the subject line for this campaign?</h5></h3>
        			<div className="user_profile7">
        			
        					<div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
        						{/* <label className="user_profile_w3_label" >Subject </label> */}
        					
        						<input aria-invalid="false" placeholder="Subject" name="subject" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled={this.state.updateCampaign.campaignDTO.status == "Sending" || this.state.updateCampaign.campaignDTO.status == "Done" ? true : false} id="company-disabled" type="text" value={this.state.updateCampaign.mailObjectDTO.subject}  />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                   
        					</div>
        				
        			</div>
        		
        		</div>
            {/* ENDSUBJECT */}
            {/* Content */}
            <div className="user_profile6">
            <h3>Content<h5 style = {{"fontStyle":"italic"}}>Design your email content?</h5></h3>
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
                <div className="user_profile7_sub1">
                  <textarea name="body" onChange={this.handleChange} value={this.state.updateCampaign.mailObjectDTO.body} className={`txtArea  ${this.state.updateCampaign.mailObjectDTO.bodyJson == null ? " " : "activeText"}`} ></textarea>
        					</div>
        					<div className="user_profile7_sub1">
                  <a onClick={this.openModal} className={`user_profile_btn  ${this.state.updateCampaign.mailObjectDTO.bodyJson == null ? 'activeText' : " "}`} tabindex="0" type="button">
        					
                  {this.state.updateCampaign.campaignDTO.status == "Draft" ? "Design Email" : "Preview"}
        				</a>
        					</div>
                  
        				</div>
        			</div>
        		
        		</div>	
            {/* END CONTENT */}
        	</div>
        	
        </div>
        
        <div className="user_profile12 flex50 maxwidth100">
        <div className="user_profile5_1">
            <h4 className="user_profile5_h4">Campaign detail</h4>
            <p className="user_profile5_p">Check your campaign's summarize below here: </p>
            </div>
            <div className="user_profile3 flex100" style={{"backgroundColor":"white", boxShadow: "0 1px 2px 1px rgba(0,0,0,.2)", width:"95%", "boderRadius":"50px", position:"relative", right:"-18px"}}>
            {this.state.data1 == null || this.state.data1.length <= 0 ?  null : 
              <FunelChart data1={this.state.data1} />
            }
            </div>
            <Tabs style={{marginTop:"20px","backgroundColor":"white", boxShadow: "0 1px 2px 1px rgba(0,0,0,.2)", "boderRadius":"50px", width:"95%", position:"relative", right:"-18px"}}>
                  <TabList>
                    <Tab>Request</Tab>
                    <Tab>Delivery</Tab>
                    <Tab>Bounce</Tab>
                    <Tab>Spam</Tab>
                    <Tab>Opened</Tab>
                    <Tab>Clicked</Tab>
                  </TabList>

                  <TabPanel>
                  {/* Request */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
                  {/* {this.state.request} */}
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  requests.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  
                  </TabPanel>
                  <TabPanel>
                  {/* Delivery */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
               
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  deliverys.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  
                  {/* {this.state.delivery} */}
                  </TabPanel>
                  <TabPanel>
                  {/* Bounce */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
    
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  bounces.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  
                  {/* {this.state.bounce} */}
                  </TabPanel>
                  <TabPanel>
                  {/* Spam */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
    
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  spams.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                  {/* Opened */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  opens.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  
                  {/* {this.state.open} */}
                  </TabPanel>
                  <TabPanel>
                  {/* Clicked */}
                  <div className="" style={{textAlign:"left", padding:"10px"}}>
                  <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                {
                  clicks.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
                }
                  
                </tbody>
              </table>
                    </div>
                  {/* {this.state.click} */}
                  </TabPanel>
            </Tabs>
        
            </div>
        </div>
        </div>
        <Modal visible={this.state.modalIsOpen} width="100%" height="100%" effect="fadeInUp" onClickAway={this.closeModal}>
         <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
          <nav class="toolbar-css__nav___27cII">
            <span style={{cursor: "default"}} data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">{this.state.updateCampaign.campaignDTO.status == "Draft" ? 'Edit Content' : 'Preview Content'}</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
        </span>
        <span class="toolbar-css__send-container___AbB6n">
        <a style={{marginRight: "20px"}}  onClick={()=>this.saveContent()} icon="airplane-fill" data-role="send-or-schedule-btn" class={`btn btn-primary btn-on-dark  btn-with-icon btn-with-icon ${this.state.updateCampaign.campaignDTO.status == "Draft" ?'':'activeText'}`}>
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Save Content Mail
        </a>
        <a onClick={this.closeModal} icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Cancel
        </a>
    </span>
    </div>
    <EmailEditor displayMode= {'email'}
      projectId={1071}
      onLoad={this.onLoad}
      options={{
          customCSS: [
            `
              #u_body{
               
              }
            `,
            `
              .blockbuilder-branding {
                display: none !important;
              }
            `,
            `
            .tab-content {
              height: 100% !important;
              background-color: white !important;
            }
            `,
            `${this.props.history.location.state.status == "Draft"  ? '.blockbuilder-preferences { display: inline-block;} ': '.blockbuilder-preferences { display: none ;visibility: hidden } .blockbuilder-preview {width: 100% }'}`,
            
            // `${this.state.updateCampaign.campaignDTO.status == "Draft" ? '.blockbuilder-preferences { display: block ; }': '.blockbuilder-preferences { display: inline-block;}'}`,
            
            `#u_row_11 {
              display: none;
              visibility: hidden
            }`
            
          ],
          customJS: [
            window.location.protocol + '//' + window.location.host + '/custom.js',
            // window.location.protocol + '//' + window.location.host + '/custom1.js',
          ],
                  mergeTags: [
            {name: "First Name", value: "{{first_name}}"},
            {name: "Last Name", value: "{{last_name}}"},
            {name: "Email", value: "{{email}}"}
          ]
        }}
      minHeight="700px"
        ref={editor => this.editor = editor}
      />

      </Modal>
      </div>

      );
  }
  validateInput(){

  }

  saveContent = ()=>{
    var self= this;
    this.editor.exportHtml(data => {
      const { design, html } = data
      this.setState({
        updateCampaign:{
          ...this.state.updateCampaign,
          mailObjectDTO:{
            ...this.state.updateCampaign.mailObjectDTO, 
            bodyJson: JSON.stringify(design),
            body: html
          }
        }
      },()=>{this.closeModal()
      console.log(this.state.updateCampaign)
      })
    })
  
    
  }

  saveDraft =()=>{
    console.log(`${Config.API_URL}campaign/edit/${this.state.id}`)
    console.log(this.state.updateCampaign)
    axios.put(`${Config.API_URL}campaign/edit/${this.state.id}`,this.state.updateCampaign,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      if(response.data == 'Successfully'){
        this.addNotification()
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange =(e)=> {
		const { name, value } = e.target;
		// let contact = state.contact;
		// contact = {...contact, [name]: value};
		this.setState({ updateCampaign: {
      ...this.state.updateCampaign,
      mailObjectDTO:{
        ...this.state.updateCampaign.mailObjectDTO,
        [name]: value
    }
		
		} });
		console.log(this.state.updateCampaign)
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


  showModal =()=>{
    this.props.onOpenModal();
  }
}
const mapStateToProps = (state) => {
  return {
    newCampaign: state.newCampaign
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
      onOpenModal: ()=> {
        dispatch(actions.openAllTemplatesList())
      }
    };
  };
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CampaignInformation));
