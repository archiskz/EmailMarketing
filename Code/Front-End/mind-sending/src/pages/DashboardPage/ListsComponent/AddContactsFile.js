import React, { Component } from 'react';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import csv from 'csv';
import CsvParse from '@vtex/react-csv-parse'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withRouter } from "react-router";
import ToolTip from 'react-portal-tooltip'
import imgAvatar from './../../../access/img/CSV.jpg'

class AddContactsFile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contacts: [{
        firstName: "",
        lastName:"",
        email:"",
        address:"",
        phone:"",
        dob:"",
        gcSubcriberDTOS: [
          {
            groupContactId: 0
          }
        ]
      }],
      csvUploadFile: "",
      visible: true,
      dropdown_visible: false,
      lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}],
      selectValue:[{groupContactId:1}],
      selectValue2:[{groupContactId:1}],
      selectId: 0,
      auth_token:"",
      choose:0,
      group:[],
      list: false,
      isTooltipActive: false,
      noneList: true
    };
    this.fields = { text: 'name', value: 'id' };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.handleData = this.handleData.bind(this)
    this.onChangeListsSelect = this.onChangeListsSelect.bind(this)
  }
  showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Add Contact Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }
  componentDidMount (){
    console.log(this.props.history.location.state)
    if(this.props.history.location.state != null){
      this.setState({
        group: [
          this.props.history.location.state.id
        ],
        list: true,
        noneList:false,
        choose:true
      })
    }
        const appState = JSON.parse(sessionStorage.getItem('appState'));
        this.setState({
            auth_token: appState.user.auth_token
        },()=> this.getAllGroupContacts() )
  }
  getAllGroupContacts=()=>{
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


  

  render() {
    const keys = [
      "firstName",
      "lastName",
      "email",
      "address",
    ]
    var lists = this.state.lists;

    return (

      <div className role="main">
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
          <div>

          <article>
         
        <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"font-family": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Upload CSV
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                <a onClick={this.onSave} icon="segment" className="btn_create_contact">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Contact
                                </a>

                        </div>

                    </header>

            <div className="md_tablet1">
            <p className="fix_size_add_h2" style={{"color": "black"}}>
                  Please note that the contact will not receive a confirmation email.
                </p>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_size_add md_tablet2">
                
                  <div className="pd20" >
                    {/* <div class="col-sm-6" >
                      <label className="container-cb">
                        Add Contacts
                          <input onChange={this.handleCheck} checked={this.state.noneList}   value="0" type="radio" name="list" class="blue" />
                          <span class="checkmark-cb"></span></label><br/>  
                          <CsvParse
                            keys={keys}
                            onDataUploaded={this.handleData}
                            onError={this.handleError}
                            render={onChange => <input type="file" className={`form-control-file ${this.state.choose==0? '' : 'activeText'}`} onChange={onChange} />}
                          />                 
                    </div> */}
                    <div class="col-sm-6-file" >
                    <label className="container-cb">Add contacts and include in an existing group
                    <input onChange={this.handleCheck} checked={this.state.list} value="1" type="checkbox" name="list" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        
                        <div className={`col-sm-8`} style={{"padding-left": "1px!important"}}>
                        
                        <div className={`${this.state.list==true? '' : 'activeText'}`}>
                        <h5>Choose Group</h5>
                        <MultiSelectComponent 
                              style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important","marginBottom":"15px"}} 
                              id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                              value={this.state.group}
                              ref={(scope) => { this.mulObj = scope; }}  
                              change={this.onChangeListsSelect}
                              placeholder="Choose Group"/>
                        </div>
                              <div className="col-md-6 col-sm-6-file2">
                              
                              <CsvParse
                            keys={keys}
                            onDataUploaded={this.handleData}
                            onError={this.handleError}
                            render={onChange => <input type="file" className={`form-control-file mt30 `} onChange={onChange} />}
                          />
                           
                           </div>
                           <div className="col-md-6">
                           <a className="fas fa-exclamation-circle margin_add_contact_file_exclamation" id="text" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}></a>
                            <ToolTip active={this.state.isTooltipActive} position="right" arrow="top" parent="#text">
                                <div>
                                    <p className="add_contact_file_exclamation">PLEASE UPLOAD YOUR CSV FILE WITH THE ACCURACY ORDER OF THE FOLLOWING FIELDS  </p>
                                    <p>*Duplicate emails will not be added! </p>
                                    <img src={imgAvatar} alt="..." />
                                </div>
                            </ToolTip>
                            </div>
                        </div>
                        <br/>
                        
                    </div>
                  </div>
                    
              </div>
            </div>
          </article>
          </div>
             
                  
              
        </div>
      </div>
      
     
    );
  }

  handleCheck=(event)=>{
    // console.log(event.target.value);
    // if(event.target.value == '0'){
    //   this.setState({
    //     noneList: true,
    //     list: false,
    //     choose: event.target.value
    //   })
    // } else{
    //   this.setState({
    //     noneList: false,
    //     list: true,
    //     choose: event.target.value
    //   })
    // }
    this.setState({
      list: !this.state.list,
      noneList: !this.state.noneList
    })
    // this.setState({choose: event.target.value},()=>console.log(this.state.choose))
    
      }

      addNotificationFail() {
        this.notificationDOMRef.current.addNotification({
          title: "Add contacts",
          message: "Mail is existed!",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
        
      }
  handleData = (data) => {
    console.log("HEY")
    console.log(this.state.selectValue)
    this.setState({ data })
       this.setState({
      contacts: data
    })
    var contactList = this.state.contacts;
      let contacts = contactList.map((contact)=>{
        var contact= contact;
  return {
    ...contact,
    gcSubcriberDTOS: 
      this.state.selectValue
  }
});


this.setState({
  contacts: contacts
}) 
  }

   onDrop = (e) => {
    const reader = new FileReader();
    // console.log(reader)
    // var lines=reader.result;
    // console.log("lines: " + lines)
    const scope = this
    reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
            // console.log("" + data);
            scope.setState({
              csvUploadFile: data
            })
        });
    };

    reader.readAsBinaryString(e[0]);
    console.log(this.state.csvUploadFile)

}


onSave= () => {
  var contactList = this.state.contacts;
  var self = this
    let contacts = contactList.map((contact)=>{
      var contact= contact; 
      if(this.state.noneList == true){
        return {
          ...contact,
          gcSubcriberDTOS: 
            [{
              groupContactId: 1
            }]
        }
      }else {
        return {
          ...contact,
          gcSubcriberDTOS: 
            this.state.selectValue
        }
      }
});

this.setState({
contacts: contacts
},()=> console.log(this.state.contacts))
  console.log(`${Config.API_URL}subcriber/createListSubcriber`)
 
  axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then((response) => {
      if(response != null){
        self.props.history.push({
          pathname:'/dashboard/contacts',
          state: {
            success: "New Contacts"
          }
      });
      } 
    })
    .catch((error) => {
      console.log(error);
      this.addNotificationFail()
    });
}

}

export default withRouter(AddContactsFile);
