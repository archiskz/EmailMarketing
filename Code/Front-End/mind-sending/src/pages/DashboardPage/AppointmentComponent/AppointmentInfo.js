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
import "react-datepicker/dist/react-datepicker.css";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
class AppointmentInfo extends Component{
   constructor(props) {
     super(props);

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
            
     };
     this.fields = { text: 'name', value: 'id' };
     this.handleChange = this.handleChange.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleDate = this.handleDate.bind(this);
   }
  //  handleDate(date) {
  //   this.setState({ newAppointment: {
  //     ...this.state.newAppointment,
  //     appointmentDTO:{
  //       ...this.state.newAppointment.appointmentDTO,
  //       time: date,
  //   }
    
  //   } });
  //   console.log(this.state.newAppointment)
  // }
   
  componentDidMount (){
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {
      this.getAllGroupContacts();
      this.getAppointmentById(this.props.history.location.state.id)
     
      this.getAllTemplates();
      
    });
     
     this.setState({height: this.refs.height.clientHeight})
    
    

   }
   getAppointmentById=(id)=>{
    axios.get(`${Config.API_URL}appointment/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      console.log(response)
      var oldGroups = response.data.appointmentGroupContacts
      console.log(oldGroups)
          let oldGroupsNumber = oldGroups.map((group, index, oldGroups)=>{
            return group.id
          },()=>console.log(oldGroupsNumber))
      this.setState({
        appointmentInfo: response.data,
        selectedGrup: oldGroupsNumber,
      });
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
      <div className="user_profile3" ref="height">
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
            <ValidateField isValidate={false} isError = {this.state.validates.nameValidate} />
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
                      <ValidateField isValidate={false} isError = {this.state.validates.datetimeValidate} />
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
                           <ValidateField isValidate={false} isError = {this.state.validates.groupValidate} />
              </div>
              </div>
            
          </div>
          <div className="user_profile7">
            <div className="user_profile9_sub">
            <div className="user_profile7_sub1" style={{"marginLeft":"15px", "marginRight":"15px"}}>
        						<label className="user_profile_w3_label" >From </label>
        					
        						<input disabled aria-invalid="false" placeholder="Sender Name" name="from" onChange={this.handleChange} className="user_profile_w3_input"
                     id="company-disabled" type="text" 
                     value={this.state.appointmentInfo.sender} 

                     />
        						{/* <input cols="1" rows="1" className="inputContact"  type="text" /> */}
                    <ValidateField isValidate={false} isError = {this.state.validates.fromValidate} />
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
                    <ValidateField isValidate={false} isError = {this.state.validates.mailValidate} />
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
                    <ValidateField isValidate={false} isError = {this.state.validates.subjectValidate} />
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
      {listTemplates.map(list=>(
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
        <div className="user_profile12">
        <div className="user_profile5_1">
            <h4 className="user_profile5_h4">Appointment detail</h4>
            <p className="user_profile5_p">Check your Appointment's summarize below here: </p>
            </div>
        <div className="user_profile13">
             <div className="user_section user_line"> 
              <div className="user_line"> 
              <div className="contact_information_detail">
                <h4 >
                {this.state.delivery}
                    </h4>
                <p >Delivery mail</p>
              </div>
              <div className="contact_information_detail">
                <h4 >
                        {this.state.request}
                    </h4>
                <p >Request</p>
              </div>
              </div>
             </div>
             <div className="user_section user_line"> 
              <div className="user_line"> 
              <div className="contact_information_detail">
                <h4 >
                {this.state.bounce}
                    </h4>
                <p >Bounce rate</p>
              </div>
              <div className="contact_information_detail">
                <h4 >
                {this.state.open}
                    </h4>
                <p >Open rate</p>
              </div>
              </div>
              </div>
              <div className="user_section user_line"> 
              <div className="user_line"> 
              <div className="contact_information_detail">
                <h4 >
                {this.state.click}
                    </h4>
                <p >Click rate</p>
              </div>
              

              <div className="contact_information_detail">
                <h4 >
                {this.state.spam}
                    </h4>
                <p >Spam rate</p>
              </div>
              </div>
              </div>
              {/* <div className="user_section user_line"> 
              <div className="user_line"> 
              <div className="contact_information_detail">
                <h4 >
                        0%
                    </h4>
                <p >Delivery rate</p>
              </div>
              <div className="contact_information_detail">
                <h4 >
                        0%
                    </h4>
                <p >Sent rate</p>
              </div>
              </div>
              
             </div>    */}
            </div>
            </div>
   </div>
   </div>
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
    this.Validate('all')
    if(this.state.canPass){
      this.setState({modalIsOpen: true});
    }
    

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
