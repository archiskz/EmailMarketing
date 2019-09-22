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
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';
import DatePicker from 'react-datepicker';
import ValidateField from '../../../components/inputValidate/ValidateField';
import "react-datepicker/dist/react-datepicker.css";
import OneTemplate from './../../../components/OneTemplate';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
class CreateCampaign extends Component{
   constructor(props) {
     super(props);

     this.state = {
       canPass:false,
      validates:{},
       isChecked:false,
       isCheckedSegment: false,
       using:this.props.history.location.state.using,
       height: 755,
      modalIsOpen: false,
       selectValue: "",
      campaignName:this.props.history.location.state.campaignName,
       visible: true,
       dropdown_visible: false,
       toVisible: true,
       fromVisible: true,
       subjectVisible: true,
       condition: "or",
       contentVisible: true,
       campaignId: 0,
       templates:[],
        lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}]
        ,
        newCampaign:{
          campaignDTO:{
              campaignName: this.props.history.location.state.campaignName,
              gcCampaignDTOS: [
                {
                  groupContactId: 1
                }
              ],
              status: "z",
              type: "z",
              timeStart:""
          },
          mailObjectDTO:{
              body: "",
               from: "",
              fromMail: "",
              subject: "",
              bodyJson: ""

          }
        },
        auth_token:"" ,
        verified:[],
        contacts: [{
          select1:"Contact details",
          select2:"Name",
          select3:"is",
          select4:"",
        }],
        listCampaigns:[],
        listAppointments:[],
        canPass:false
     };
     this.fields = { text: 'name', value: 'id' };
     this.handleChange = this.handleChange.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
   }
  
   
   componentDidMount (){
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {
      this.getAllGroupContacts();
      this.getAllTemplates();
      this.getAllFrom()
      this.getAllAppointment()
      this.getAllCampaign()
    });
     
     this.setState({height: this.refs.height.clientHeight})
    
    

   }
   addClick(){
    this.setState(prevState => ({ 
    	contacts: [...prevState.contacts, {select1:"Contact details", select2:"Name" }]
    }))
    console.log(this.state.contacts)
  }
  removeClick(i){
    let contacts = [...this.state.contacts];
    contacts.splice(i, 1);
    this.setState({ contacts });
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

   getAllCampaign=()=>{
    var self = this
    axios.get(`${Config.API_URL}campaigns/segment`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      var listCampaigns = res.data
      // listCampaigns = listCampaigns.filter(function(item){
      //   return item.status == "Done";
      // })
      console.log(res.data);
      this.setState({listCampaigns: listCampaigns});
    }) 
  }
  getAllAppointment=()=>{
    axios.get(`${Config.API_URL}appointment/segment`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      this.setState({listAppointments:res.data})
    }).catch(function (error) {
      });
  }

   getAllTemplates=()=>{
    axios.get(`${Config.API_URL}template`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({templates: res.data});
    }) 
   }

   getAllFrom=()=>{
    axios.get(`${Config.API_URL}emailverified?accountId=1`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
    var listFrom = res.data
    var listFinal = []
    listFrom.forEach(element => {
      if(element.verified){
        listFinal.push(element)
      }
    });
	  this.setState({verified: listFinal});
    }).catch(error =>{
      console.log(error)
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
    console.log(dateSelect)
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

    this.setState({ newCampaign: {
      ...this.state.newCampaign,
      campaignDTO:{
        ...this.state.newCampaign.campaignDTO,
        timeStart: Day,
    },
    }
		
		},()=>console.log(this.state.newCampaign));
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
		
		},()=>console.log(this.state.newCampaign) );
  }

	
  render(){
    var lists = this.state.lists;
    var listTemplates = this.state.templates;
    var tempDate = new Date();
  var minDate = (tempDate.getMonth()+1) + '/' + tempDate.getDate() +'/'+tempDate.getFullYear() + ' ' +  tempDate.getHours()+':'+ tempDate.getMinutes();
    var selectDateTmp = new Date(this.state.newCampaign.campaignDTO.timeStart);
    var selectedDate = (selectDateTmp.getMonth()+1) + '/' + selectDateTmp.getDate() +'/'+selectDateTmp.getFullYear() + ' ' +  selectDateTmp.getHours()+':'+ selectDateTmp.getMinutes();
    var listFrom = this.state.verified
    var listCampaigns = new Array;
    listCampaigns = this.state.listCampaigns
    var listAppointments =new Array;
    listAppointments = this.state.listAppointments
  // const currDate = "Current Date= "+date;
     return (
       <div style={{"width":"100%","height":"100%"}}>
      <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
      <a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"40px","marginLeft":"20px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
      
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Create Campaign</strong>
            </span>
        </nav>
</div>
      <div className="new-campaign-container lefts" style={{"height":`calc(${this.state.height}px)`}} >
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
                                    <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Templates
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
         
          <div className="filter">
            <ul className="">
            <li><a className="">Filter By</a></li>
              <li><a  href="#home" className="active">All</a></li>
              <li><a href="#news">Custom Templates</a></li>
              <li><a href="#contact">MindSending templates</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-views" style={{"width": "90%"}}>
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
    <img src={imm_bg}></img>
      </div>
      <div className="user_profile3 right" ref="height">
        	<div className="user_profile4" >
        		<div className="user_profile5">
        		<h4 className="user_profile5_h4">Campaign Name:</h4>
        		<p className="user_profile5_p">{this.state.campaignName} <button style={{"width":"15px"}} class="fas fa-edit fa-xs"></button></p>
        		</div>

            <div className="user_profile6">
            
            <h3 style={{"display":"flex"}}>Schedule 
            <div className="switch-container">
                <label>
                    <input ref="switch" checked={ this.state.isChecked } onChange={ this._handleChange } className="switch" type="checkbox" />
                    <div>
              
                        <div></div>
                    </div>
                </label>
            </div>
            </h3>
            <h5 style = {{"fontStyle":"italic"}}>Set time to send campaign</h5>
        			<div className={`user_profile7 ${this.state.isChecked == false ? "activeText" : "" }` }  >
        				<div className="user_profile9_sub">
        					<div className="user_profile7_sub1">
                      <div className="control-styles">
                      <DateTimePickerComponent onBlur={()=>this.Validate('datetime')} value={this.state.newCampaign.campaignDTO.timeStart}  change={this.onChangeDate} min={minDate} id="datetimepicker" placeholder="Select a date and time"/>
                      <ValidateField isValidate={false} isError = {this.state.validates.datetimeValidate} />
                      </div>
        					</div>
        				</div>
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
                          change={this.onChangeListsSelect}
                          placeholder="Lists"/>
                          <ValidateField isValidate={false} isError = {this.state.validates.groupValidate} />
                      </div>
                      <div className="control-styles">
                        
                      </div>
                     
        					</div>
                  
        				</div>
                
        				
        				<div className="user_profile9_sub">
                
        					<div className="user_profile8_sub1">
        					
        					</div>
        				</div>
        			</div>
        		
        		</div>	
            <div className={`user_profile6 ${this.state.isCheckedSegment ? "" : ""}`}>
            <p className="user_profile_w3_label" style={{"display":"flex"}}>Segment 
            <div className="switch-container">
                <label>
                    <input ref="switch" checked={ this.state.isCheckedSegment } onChange={ this._handleChangeSegment } className="switch" type="checkbox" />
                    <div>
              
                        <div></div>
                    </div>
                </label>
            </div>
            </p>
            <div className={` ${this.state.isCheckedSegment ? "" : "activeText"}`} style={{fontSize:"14px",fontWeight:"600",display:"flex",justifyContent: "flex-start",alignItems:"baseline",marginLeft:"10px","marginTop":"10px"}}>
                      Contacts match
                      <select value={this.state.condition} onChange={this.handleChangeConditionSegment.bind(this)} style={{"width":"70px",marginLeft:"5px",marginRight:"5px"}} ref="selectCondition" name="select1" class="form-control"  id="exampleFormControlSelect1" >
                        
                        <option value="or">Any</option>
                        <option value="and">All</option>
                      </select>
                      of the following conditions
                       </div> 
                       <br/>
                {this.state.isCheckedSegment ?  this.createUI(listCampaigns,listAppointments,lists) :  null} 
            </div>
            {/* END TO */}
            {/* FROM */}
            <div className="user_profile6">
            <h3>From<h5 style = {{"fontStyle":"italic"}}>Who is sending this campaign?</h5></h3>
        			<div className="user_profile7">
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
        						{/* <input onBlur={()=>this.Validate('from')} placeholder="Sender Name" name="from" aria-invalid="false" onChange={this.handleChange} className="user_profile_w3_input"
                      id="company-disabled" type="text" value={this.state.newCampaign.mailObjectDTO.from} /> */}
                      <input  onBlur={()=>this.Validate('fromMail')} aria-invalid="false" onChange={this.handleChange} name="from" 
                    className="user_profile_w3_input" placeholder="Sender Name" id="username" type="text" value={this.state.newCampaign.mailObjectDTO.from} />
                    
                     <ValidateField isValidate={false} isError = {this.state.validates.fromValidate} />	
        					</div>
        				</div>
        				
        				<div className="user_profile9_sub">
        					<div className="user_profile8_sub1">
                  <select name="fromMail" className="user_profile_w3_input" value={this.state.newCampaign.mailObjectDTO.fromMail} 
                     onChange={this.handleChange}> 
                     <option value="" disabled selected style={{display:"none"}}>---Choose an email address---</option>
                        {listFrom.map(list=>(
                          <option value={list.email}>{list.email}</option>
                                    ))}
                          <option value="addVerify" onClick={()=>this.toUserProfile}>Add veify email</option>
                    </select>  
        						<ValidateField isValidate={false} isError = {this.state.validates.mailValidate} />
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
        					
        						<input onBlur={()=>this.Validate('subject')} aria-invalid="false" placeholder="Subject" name="subject" onChange={this.handleChange} className="user_profile_w3_input"
                     disabled="" id="company-disabled" type="text" value={this.state.newCampaign.mailObjectDTO.subject}  />
                    <ValidateField isValidate={false} isError = {this.state.validates.subjectValidate} />
                   
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
                  <textarea name="body" onChange={this.handleChange} value={this.state.newCampaign.mailObjectDTO.body} className={`txtArea + ${this.state.using === 1 ? 'activeText' : null}`} ></textarea>
        					</div>
                  <div className="user_profile7_sub1">
                  <a className={`user_profile_btn + ${this.state.using === 2 ? 'activeText' : null}`} onClick={this.showModal}  tabindex="0" type="button">
        					Design Email
        				</a>
        					</div>
        				</div>
        			</div>
        		
        		</div>	
            {/* END CONTENT */}
        	</div>
        	
        </div>
        
      </div>

      );
  }
  handleChangeConditionSegment=(event)=>{
    this.setState({
      condition: event.target.value
    },()=> console.log(this.state.condition))
  }

  _handleChange=()=> {
		this.setState( { isChecked: !this.state.isChecked }, ()=>console.log(this.state.isChecked));
    }
    _handleChangeSegment=()=> {
      this.setState( { isCheckedSegment: !this.state.isCheckedSegment }, ()=>console.log(this.state.isCheckedSegment));
      }
      



  onChooseTemplate = (id, content)=>{
    this.props.history.push({
      pathname:`/edit-content/:${id}`,
      state : {
        id: id,
        campaignId: this.state.campaignId,
        contentJson: content,
        isChecked: this.state.isChecked,
        newCampaign: this.state.newCampaign,
      }
  });
  }

  toUserProfile= ()=>{
    console.log("click r ne ma")
    this.props.history.push({
      pathname:`/dashboard/profile`,
      });
  }

  saveDraft =()=>{
    axios.post(`${Config.API_URL}campaign/create`,this.state.newCampaign)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  handleChange =(e)=> {
    const { name, value } = e.target;
    console.log(value)
		// let contact = state.contact;
    // contact = {...contact, [name]: value};
    if(value == "addVerify"){
      console.log("t dang day ne")
      this.props.history.push({
        pathname:`/dashboard/profile`,
        });
    }
		this.setState({ newCampaign: {
      ...this.state.newCampaign,
      mailObjectDTO:{
        ...this.state.newCampaign.mailObjectDTO,
        [name]: value
    }
		
		} });
		console.log(this.state.newCampaign)
	 }
   Validate = (name)=>{
     var self = this
    var validate = {};
    this.setState({
      validates: {}
    },()=>{
      switch(name){
        case "datetime":{
          if(this.state.newCampaign.campaignDTO.timeStart == "" && this.state.isChecked == true ){
            validate.datetimeValidate = "Enter datetime start your campaign";
          } 
          break;
        }
        case "group":{
          console.log('group')
          if(!Array.isArray(this.state.newCampaign.campaignDTO.gcCampaignDTOS )   ){
            validate.groupValidate = "Choose List receiver";
            
            
          }else {
            var array = new Array();
            array = this.state.newCampaign.campaignDTO.gcCampaignDTOS 
            if(array.length<=0){
              validate.groupValidate = "Choose List receiver";
            }
          }
        }
        case "from":{
          if(this.state.newCampaign.mailObjectDTO.from == ""){
            validate.fromValidate = "Enter Sender name";
          }
        }
        case"fromMail":{
          if(this.state.newCampaign.mailObjectDTO.fromMail == ""){
            validate.mailValidate = "Enter an Email";
          } else if(this.state.newCampaign.mailObjectDTO.fromMail != ""){
           var  emailValid = this.state.newCampaign.mailObjectDTO.fromMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            validate.mailValidate = emailValid ? "" : "Enter an Email";
          }
        }
        case "subject":{
          if(this.state.newCampaign.mailObjectDTO.subject.length <=2 || this.state.newCampaign.mailObjectDTO.subject.length >= 512){
            validate.subjectValidate = "This field can not be empty. It must contain between 2 and 512 characters"
           } 
        }
        case "all":{
          if(this.state.newCampaign.campaignDTO.timeStart == "" && this.state.isChecked == true){
            validate.datetimeValidate = "Enter datetime start your campaign";
          } 
          if(!Array.isArray(this.state.newCampaign.campaignDTO.gcCampaignDTOS )   ){
            validate.groupValidate = "Choose List receiver";
          }else {
            var array = new Array();
            array = this.state.newCampaign.campaignDTO.gcCampaignDTOS
            if(array.length<=0){
              validate.groupValidate = "Choose List receiver";
            }
          }
          
          if(this.state.newCampaign.mailObjectDTO.from == ""){
            validate.fromValidate = "Enter Sender name";
          }
          if(this.state.newCampaign.mailObjectDTO.fromMail == ""){
            validate.mailValidate = "Enter an Email";
          } else if(this.state.newCampaign.mailObjectDTO.fromMail != ""){
           var  emailValid = this.state.newCampaign.mailObjectDTO.fromMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            validate.mailValidate = emailValid ? "" : "Enter an Email";
          }
          if(this.state.newCampaign.mailObjectDTO.subject.length <=2 || this.state.newCampaign.mailObjectDTO.subject.length >= 512){
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
          self.setState({
            validates: validate
          })
          console.log(validate);
          break;
        }
      }
      
      self.setState({
        validates: validate
      })
    })
   
  }

  createUI(listCampaigns, listAppointments,lists){
    console.log(listCampaigns)
    console.log(listAppointments)
     return this.state.contacts.map((el, i) => (
       <tr key={i}>
       <td style={{"alignItems":"baseline"}} className="pd5 border_bottom_none">
       {/* <input className="form-control" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />      */}
       
    <select ref="selectCondition" name="select1" value={el.select1 ||'Contact details'} class="form-control" id="exampleFormControlSelect1" 
      onChange={this.handleChangeCondition.bind(this, i)}>
        <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
        <option>Contact details</option>
        <option>Contact actions</option>
      </select>
  
       </td>
       <td className="pd5 border_bottom_none">
       {/* <input   className={`form-control ${el.email == 'Contact details' ? '' : 'activeText'}`}  placeholder="First Name" name="firstName" value={el.firstName ||''} onChange={this.handleChange.bind(this, i)} />       */}
       <select ref="selectFieldDetail"  name="select2" value={el.select2 ||'Name'} className={`form-control ${el.select1 == 'Contact details' ? '' : 'activeText'}`} id="exampleFormControlSelect2" 
        onChange={this.handleChangeCondition.bind(this, i)}>
      <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
      <option>Name</option>
      <option>Email</option>
      <option>Birthday</option>
      <option>Address</option>
      <option>Subscription date</option>
      <option>Engagement Score</option>
      
    </select>
    <select ref="selectFieldAction" name="select2" value={el.select2 ||''} className={`form-control ${el.select1 == 'Contact actions' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
        onChange={this.handleChangeCondition.bind(this, i)}>
        <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
      <option>Mail not opened</option>
      <option>Mail opened</option>
      <option>Mail clicked</option>
      <option>Mail not clicked</option>
    </select>
       </td>
       <td className="pd5 border_bottom_none">
      
          <select ref="selectFieldAction1" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Email' || el.select2 == 'Name' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is</option>
          <option>is not</option>
          <option>contains</option>
          <option>doesn't contain</option>
        </select>
        <select ref="selectFieldAction1" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Address' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
          <option value="" selected style={{display:"none"}}>---select an option---</option>
          <option>contains</option>
          {/* <option>doesn't contain</option> */}
        </select>
        <select ref="selectFieldAction2" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Birthday' || el.select2 == 'Subscription date' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is before</option>
          <option>is after</option>
          <option>is on</option>
        </select>
        <select ref="selectFieldAction3" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Mail clicked' || el.select2 == 'Mail not opened' ||el.select2 == 'Mail opened' ||  el.select2 == 'Mail not clicked' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>campaign</option>
          <option>appointment</option>
        </select>
        <select ref="selectFieldAction4" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Engagement Score'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is equal to</option>
          <option>is not equal to</option>
        </select>
        <select ref="selectFieldAction2" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Group' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is group</option>
          <option>is not group</option>
        </select>
       </td>
       <td className=" border_bottom_none">
          <input className={`form-control ${el.select3 == 'is' || el.select3 == "is not" || el.select3 == "contains" || el.select3 == "doesn't contain"  ? '' : 'activeText'}`}  placeholder="" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
          <select ref="selectFieldAction5" name="select4" value={el.select4 ||'1 bar'} className={`form-control ${el.select3 == 'is equal to'||el.select3 == 'is not equal to'|| el.select3 == 'is not equal to'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option value="1">1 bar</option>
          <option value="2">2 bars</option>
          <option value="3">3 bars</option>
          <option value="4">4 bars</option>
          <option value="5">5 bars</option>
        </select>
        <select ref="selectFieldAction5" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'is group'||el.select3 == 'is not group'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
            <option value=""  selected style={{display:"none"}}>---select an option---</option>
          {lists.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
        </select>

        <select ref="selectFieldAction6" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'campaign'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
        <option value=""  selected style={{display:"none"}}>---select an option---</option>
          {listCampaigns.map(list=>(
            <option value={list.id}>{list.campaignName}</option>  
                                    ))}
           
        </select>
        <select ref="selectFieldAction7" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'appointment'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChangeCondition.bind(this, i)}>
        <option value=""  selected >---select an option---</option>
          {listAppointments.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
           
        </select>

        
        <input className={`form-control ${el.select3 == 'is before'||el.select3 == 'is after'|| el.select3 == 'is on'  ? '' : 'activeText'}`} type="date"  placeholder="date" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
        
       
       </td>
       <td className=" border_bottom_none" style={{ height:'100%'}} >
        <div style={{"alignItems":"baseline" , "display":"flex"}}  className="md_tablet6_tbody_td_add font_awsome_size">
          <a className="fas fa-plus-square icon_sz_add margin_td_fontawsome font_awsome_size" title="Add more" onClick={this.addClick.bind(this)}/>
          <a className={`fas fa-trash-alt icon_sz_add ${i == 0 ? 'activeText' : ''}`} title="Delete" onClick={this.removeClick.bind(this, i)} />
          </div>
        </td>
     </tr>  
      
      
          
     ))
  }

  handleChangeCondition(i, e) {
    const { name, value } = e.target;
    if(name == "select1" && value =="Contact actions"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact actions", select2: "Mail not opened", select3: "campaign",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select1" && value =="Contact details"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: "Name", select3: "is",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    }
    else if((name == "select2" && value =="Birthday") || (name == "select2" && value =="Subscription date")){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is before",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select2" && value =="Engagement Score"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is equal to",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select2" && value =="Group"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is group",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    }
    
    else {
      let contacts = [...this.state.contacts];
      contacts[i] = {...contacts[i], [name]: value};
      this.setState({ contacts },()=>{
        console.log(this.state.contacts)
      });
      
    }
    
 }
  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});

    console.log("modal is open:" + this.state.modalIsOpen)
  }

  goBack=()=>{
    this.props.history.push({
      pathname:`/dashboard/campaigns`,
  });
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
    this.Validate('all');
    if(this.state.canPass){
      this.setState({modalIsOpen: true});
    }
    
    
    var self = this;
   
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
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CreateCampaign));
