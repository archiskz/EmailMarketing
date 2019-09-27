import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import apiCaller from '../../../utils/apiCaller';
import ChooseTemplateModal from '../../../components/modals/ChooseTemplateModal';
import axios from 'axios';
import * as Config from '../../../constants/Config';
import imm_bg from './../../../access/img/invited.png';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';
import OneTemplate from '../../../components/OneTemplate';
import ValidateField from '../../../components/inputValidate/ValidateField';
import DatePicker from 'react-datepicker';
import EmailEditor from 'react-email-editor';
import "react-datepicker/dist/react-datepicker.css";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import FunelChart from '../../../components/chart/FunelChart'
class AppointmentInfo extends Component{
   constructor(props) {
     super(props);
     this.editora = null; 
     this.isComponentMounted = false;
     this.isEditorLoaded = false;
     this.state = {
       auth_token:"",
       validates:{},
       canPass: false,
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
        lists:[]
        ,
        newAppointment:{
          appointmentDTO: {
            name: "",
            status: "string",
            time: "",
            token: "",
          },
          mailObjectDTO: {
            body: "",
            bodyJson: "",
            from: "",
            fromMail: "",
            subject: ""
          }
        }   ,
        appointmentInfo:{
        },
        selectedGrup :[],
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
     this.onLoad = this.onLoad.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleDate = this.handleDate.bind(this);
   }
  
  componentDidMount (){
    this.isComponentMounted = true; 
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {
      this.getAllGroupContacts();
      this.getAppointmentById(this.props.history.location.state.id)
      this.getAllTemplates();
      this.loadTemplate()
    });
     
     this.setState({height: this.refs.height.clientHeight})
    
    

   }
   getAppointmentById=(id)=>{
     var self = this
    axios.get(`${Config.API_URL}appointment/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      console.log(response.data)
      var oldGroups = response.data.gcAppointmentDTOS
      console.log(oldGroups)
          let oldGroupsNumber = oldGroups.map((group, index, oldGroups)=>{
            return group.groupContactId
          },()=>console.log(oldGroupsNumber))
      this.setState({
        appointmentInfo: response.data,
        selectedGrup: oldGroupsNumber,
        data1:[
          { x: "Clicked", y: response.data.clickRate, text: "Clicked" },
              { x: "Opened", y: response.data.openRate, text: "Opened" },
               { x: "Delivery", y: response.data.delivery, text: "Delivery" },
               { x: "Request", y: response.data.request, text: "Request" }
        ],
        contactBounce: response.data.contactBounce,
            contactClicked:response.data.contactClicked,
            contactDelivery: response.data.contactDelivery ,
            contactOpened: response.data.contactOpened,
            contactRequest: response.data.contactRequest
            ,contactSpam: response.data.contactSpam
      },()=> console.log(this.state));
    })
    .catch(error => {
      console.log(error);
    });
   }
   getAllGroupContacts=()=>{
     console.log("haha")
    axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      console.log(response.data)
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

  onChangeDate=(dateSelect)=>{
    if(dateSelect.value != "" && dateSelect.value != null){
      var tempDate = new Date();
     tempDate = dateSelect.value;
     var month = tempDate.getMonth() + 1;
     if(month < 10){
       month = `0${month}`
       console.log(month)
     }
     var date = tempDate.getDate();
     if(date < 10){
       date = `0${date}`
     }
    const Day=month + '/' + date +'/'+tempDate.getFullYear() + ' ' +  this.formatAMPM(tempDate);
    
    console.log(Day);
    this.setState({ newAppointment: {
      ...this.state.newAppointment,
      appointmentDTO:{
        ...this.state.newAppointment.appointmentDTO,
        time: Day,
    },
    }
		
		},()=>console.log(this.state.newAppointment));
    }
  }
   formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  goBack =()=>{
    this.props.history.goBack()
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

    this.setState({ newAppointment: {
      ...this.state.newAppointment,
      appointmentDTO: {
        ...this.state.newAppointment.appointmentDTO,
		gcAppointmentDTOS: selectValue,

    }    }
	}
		,()=>console.log(this.state.newAppointment) );
  
  }
	
  render(){
    var lists = this.state.lists;
    var listTemplates = this.state.templates;
    listTemplates=listTemplates.filter(item=> item.type=="iv");
    var tempDate = new Date();
    var minDate = (tempDate.getMonth()+1) + '/' + tempDate.getDate() +'/'+tempDate.getFullYear() + ' ' +  tempDate.getHours()+':'+ tempDate.getMinutes();
    var bounces = this.state.contactBounce
    var spams = this.state.contactSpam
    var opens = this.state.contactOpened
    var clicks = this.state.contactClicked
    var deliverys = this.state.contactDelivery
    var requests = this.state.contactRequest

     return (
       <div style={{"width":"100%","height":"100%"}}>
      <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
      <a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"40px","marginLeft":"20px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
      
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Appointment Preview</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
        {/* <a onClick={this.saveDraft} icon="save-draft" data-role="save-draft" class="btn btn-secondary btn-on-dark btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-save-draft">

            </i>Save Draft
        </a> */}
    </span>
    {/* <span class="toolbar-css__send-container___AbB6n">
        <a icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Send Campaign
        </a>
    </span> */}
</div>
      {/* <div className="new-campaign-container lefts" style={{"height":`calc(${this.state.height}px)`}} > */}
        {/* </div> */}
        <div className="user_profile">
      <div className="user_profile2">
      <div className="user_profile3 flex50" ref="height">
        	<div className="user_profile4" >
          <div className="user_profile5">
        		<h4 className="user_profile5_h4">Appointment Name:</h4>
        		<div className="user_profile5_p"> 
            <a style={{"backgroundColor":"transparent","color":"white","float":"left","marginTop":"10px"}} class="fas fa-edit margin_td_fontawsome"  title="Edit"> </a>
            <input disabled style={{"backgroundColor":"transparent","color":"white","width":"auto","float":"left","border-bottom":"none"}} 
            placeholder="Invitation Name" 
            value={this.state.appointmentInfo.name} 
            name="name"  onChange={this.handleName} 
            className="user_profile_w3_input" id="company-disabled" type="text"  />
            {/* <ValidateField isValidate={false} isError = {this.state.validates.nameValidate} /> */}
            </div>
            
        		</div>
            
        		<div className="user_profile6">
            <h3>Basic Settings<h5 style = {{"fontStyle":"italic"}}>Edit the detail of your invite mail</h5></h3>
        			<div className="user_profile7">
        				<div style={{"marginLeft":"15px"}} className="user_profile9_sub">
        					<div className="user_profile7_sub1">
        						<label className="user_profile_w3_label" >Date and Time </label>
                      <div className="control-styles">
                      <DateTimePickerComponent disabled enabled={false}
                      value={this.state.appointmentInfo.time} 
                      change={this.onChangeDate} min={minDate} id="datetimepicker" placeholder="Select a date and time"/>
                 
                       
                      </div>
                      {/* <ValidateField isValidate={false} isError = {this.state.validates.datetimeValidate} /> */}
        					</div>
        				</div>
        				
        			</div>
                    
        		
        		</div>	
            
            <div className="user_profile6">
            <h3>Mail Settings<h5 style = {{"fontStyle":"italic"}}>Subject and from to fields</h5></h3>
            <div className="user_profile7">
            <div className="user_profile9_sub">
              <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
                <label className="user_profile_w3_label" >To </label>
                <MultiSelectComponent ref={(scope) => { this.mulObj = scope; }}  
                          style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important"}} 
                          id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                          change={this.onChangeListsSelect}
                          value={this.state.selectedGrup}
                          enabled={false}
                          // onBlur={()=>this.Validate('group')}
                          placeholder="Choose Lists"/>    
                           {/* <ValidateField isValidate={false} isError = {this.state.validates.groupValidate} /> */}
              </div>
              </div>
            
          </div>
          <div className="user_profile7">
            <div className="user_profile9_sub">
            <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >From </label>
        					
        						<input disabled aria-invalid="false" placeholder="Sender Name" name="from" onChange={this.handleChange} className="user_profile_w3_input"
                     id="company-disabled" type="text" 
                     value={this.state.appointmentInfo.from} 

                     />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                    {/* <ValidateField isValidate={false} isError = {this.state.validates.fromValidate} /> */}
        					</div>
            </div>
            <div className="user_profile9_sub">
            <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
              <label className="user_profile_w3_label" style={{"color":"white"}} >.</label>					
        						<input disabled aria-invalid="false" placeholder="Email Address" name="fromMail" onChange={this.handleChange} className="user_profile_w3_input"
                      id="company-disabled" type="email" 
                      value={this.state.appointmentInfo.fromMail} 
                        />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                    {/* <ValidateField isValidate={false} isError = {this.state.validates.mailValidate} /> */}
        					</div>
            </div>
        					
                  
        				
        			</div>
              <div className="user_profile7">
        			
        					<div className="user_profile7_sub1" style={{"marginLeft":"30px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >Subject </label>
        					
        						<input disabled aria-invalid="false" placeholder="Email subject" name="subject" onChange={this.handleChange} className="user_profile_w3_input"
                      id="company-disabled" type="text"
                      value={this.state.appointmentInfo.subject} 

                       />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                    {/* <ValidateField isValidate={false} isError = {this.state.validates.subjectValidate} /> */}
        					</div>
        				
        			</div>
              <a className='user_profile_btn' onClick={this.openModal}  tabindex="0" type="button">
        					Preview
        				</a>
        		</div>
            {/* ENDSUBJECT */}
            {/* Content */}
	
            {/* END CONTENT */}
            
        	</div>
        	
        </div>
        <div className="user_profile12 flex50 maxwidth100">
        <div className="user_profile5_1">
            <h4 className="user_profile5_h4">Appointment detail</h4>
            <p className="user_profile5_p">Check your Appointment's summarize below here: </p>
            </div>
            <div className="user_profile3 flex100" style={{"backgroundColor":"white", boxShadow: "0 1px 2px 1px rgba(0,0,0,.2)", width:"95%", "boderRadius":"50px", position:"relative", right:"-18px"}}>
            {this.state.data1 == null || this.state.data1.length <= 0 ?  null : 
              <FunelChart title="Appointment Statistic" data1={this.state.data1} />
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
                { requests.length > 0 ? 
                  requests.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                { deliverys.length > 0 ?
                  deliverys.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                { bounces.length > 0 ? 
                  bounces.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                  spams.length > 0 ? 
                  spams.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                  opens.length > 0 ? 
                  opens.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                  clicks.length > 0 ? 
                  clicks.map((list,index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{list.email}</td>
                    <td>{list.firstName}</td>
                    <td>{list.lastName}</td>
                  </tr>
                )) : "No contact"
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
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Preview Content</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
        </span>
        <span class="toolbar-css__send-container___AbB6n">
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
        ref={editora => this.editora = editora}
      />

      </Modal>
        </div>
  
   

      );
  }

  
  Validate = (name)=>{
    var validate = {};
    switch(name){
      case "name":{
        if(this.state.newAppointment.appointmentDTO.name.length < 3){
          validate.nameValidate = "You need to enter a name that's at least 3 characters long";
        }
        break;
      }
      case "datetime":{
        if(this.state.newAppointment.appointmentDTO.time == ""){
          validate.datetimeValidate = "Enter datetime of your appointment";
        } 
        break;
      }
      case "group":{
        console.log('group')
        if(!Array.isArray(this.state.newAppointment.appointmentDTO.gcAppointmentDTOS )   ){
          validate.groupValidate = "Choose List receiver";
          
          
        }else {
          var array = new Array();
          array = this.state.newAppointment.appointmentDTO.gcAppointmentDTOS 
          if(array.length<=0){
            validate.groupValidate = "Choose List receiver";
          }
        }
      }
      case "from":{
        if(this.state.newAppointment.mailObjectDTO.from == ""){
          validate.fromValidate = "Enter Sender name";
        }
      }
      case"fromMail":{
        if(this.state.newAppointment.mailObjectDTO.fromMail == ""){
          validate.mailValidate = "Enter an Email";
        } else if(this.state.newAppointment.mailObjectDTO.fromMail != ""){
         var  emailValid = this.state.newAppointment.mailObjectDTO.fromMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          validate.mailValidate = emailValid ? "" : "Enter an Email";
        }
      }
      case "subject":{
        if(this.state.newAppointment.mailObjectDTO.subject.length <=2 || this.state.newAppointment.mailObjectDTO.subject.length >= 512){
          validate.subjectValidate = "This field can not be empty. It must contain between 2 and 512 characters"
         } 
      }
      case "all":{
        if(this.state.newAppointment.appointmentDTO.name.length < 3){
          validate.nameValidate = "You need to enter a name that's at least 3 characters long";
        }
        if(this.state.newAppointment.appointmentDTO.time == ""){
          validate.datetimeValidate = "Enter datetime of your appointment";
        } 
        if(!Array.isArray(this.state.newAppointment.appointmentDTO.gcAppointmentDTOS )   ){
          validate.groupValidate = "Choose List receiver";
          
          
        }else {
          var array = new Array();
          array = this.state.newAppointment.appointmentDTO.gcAppointmentDTOS 
          if(array.length<=0){
            validate.groupValidate = "Choose List receiver";
          }
        }
        
        if(this.state.newAppointment.mailObjectDTO.from == ""){
          validate.fromValidate = "Enter Sender name";
        }
        if(this.state.newAppointment.mailObjectDTO.fromMail == ""){
          validate.mailValidate = "Enter an Email";
        } else if(this.state.newAppointment.mailObjectDTO.fromMail != ""){
         var  emailValid = this.state.newAppointment.mailObjectDTO.fromMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          validate.mailValidate = emailValid ? "" : "Enter an Email";
        }
        if(this.state.newAppointment.mailObjectDTO.subject.length <=2 || this.state.newAppointment.mailObjectDTO.subject.length >= 512){
          validate.subjectValidate = "This field can not be empty. It must contain between 2 and 512 characters"
         } 
         var wrong = 0;
         Object.keys(validate).forEach(function(key){
           console.log("key" + validate[key])
           if(validate[key] != ""){
             wrong ++;
           }
         })
         console.log(wrong)   
         if(wrong > 0){
           this.setState({canPass: false})
         } else {
          this.setState({canPass: true})
         }
        this.setState({
          validates: validate
        })
        console.log(validate);
        break;
      }
    }
    
    this.setState({
      validates: validate
    })
  }

  onChooseTemplate = (id, content)=>{
    this.props.history.push({
      pathname:`/edit-content/:${id}`,
      state : {
        id: id,
        campaignId: this.state.campaignId,
        contentJson: content,
        appointment: true,
        newAppointment: this.state.newAppointment,
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
  
  onLoad = () => { this.isEditorLoaded = true; this.loadTemplate(); }

  loadTemplate = () => { 
        if (!this.isEditorLoaded || !this.isComponentMounted) 
     return; 
        
        if(this.props.history.location.state.bodyJson != null){
          this.editora.loadDesign(JSON.parse(this.props.history.location.state.bodyJson))     
        }   
       }
 
  handleChange =(e)=> {
		const { name, value } = e.target;
		this.setState({ newAppointment: {
      ...this.state.newAppointment,
      mailObjectDTO:{
        ...this.state.newAppointment.mailObjectDTO,
        [name]: value
    }
		
		} });
		console.log(this.state.newAppointment)
	 }
   handleName =(e)=>{
    const { name, value } = e.target;
		this.setState({ newAppointment: {
      ...this.state.newAppointment,
      appointmentDTO:{
        ...this.state.newAppointment.appointmentDTO,
        [name]: value
    }
		
		} });
		console.log(this.state.newAppointment)
   }



  openModal() {
      this.setState({modalIsOpen: true});
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
    axios.post(`${Config.API_URL}campaign/create`,this.state.newAppointment,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
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

export default withRouter(AppointmentInfo);
