import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import { render } from "react-dom";
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone';
import FileUpload from './../../../components/UploadFile';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import csv from 'csv';
import CsvParse from '@vtex/react-csv-parse'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
 


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
      selectId: 0
    };
    this.fields = { text: 'name', value: 'id' };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.handleData = this.handleData.bind(this)
    this.onChangeListsSelect = this.onChangeListsSelect.bind(this)
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
    console.log(`${Config.API_URL}groupContacts`);
   axios.get(`${Config.API_URL}groupContacts`)
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
                                    <span style={{"font-family": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Upload Excel
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

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <p style={{"color": "black"}}>
                  Please note that the contact will not receive a confirmation email.
                </p>
                <form>
                  <div className="listFormPresenter-css__list-form-presenter___1RHBp">
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG" data-role style={{ position: 'relative' }}>
                      <input type="radio" name="existing-or-new" id="radio-manual-add-to-all-contacts" defaultValue="all_contacts" />
                      <label className="input-radio-label" htmlFor="radio-manual-add-to-all-contacts">
                        <span>
                          <span data-tooltip="Recipients will be added to All Contacts by default.  You can manage your contacts using Lists and Segments." data-tooltip-pos="up" data-tooltip-length="large" className="has-underline">
                            Add contacts
                          </span>
                        </span>
                      </label>
                      <span />
                    </div>
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG" data-role style={{ position: 'relative' }}>
                      <input type="radio" name="existing-or-new" id="radio-manual-add-to-existing" defaultValue="existing" />
                      <label className="input-radio-label" htmlFor="radio-manual-add-to-existing">
                        Add contacts and include in an existing list
                      </label>
                      {/* Existing List */}
                      <h5>Choose Lists</h5>
                      <div className="control-styles">
                              <MultiSelectComponent 
                              style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important"}} 
                              id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                              ref={(scope) => { this.mulObj = scope; }}  
                              change={this.onChangeListsSelect}
                              placeholder="Favorite Sports"/>
                            </div>
                      {/* <select className="inputContact mt15" style={{"width": "250px", "borderBottom":"1px solid #ccc !important"}}  onChange={this.handleChange} type="text" tabindex="-1" readonly="readonly" role="presentation">
                       {lists.map(list => <option value={list.id}  key={list.id}>{list.name}</option>)}
                            </select> */}
                  
                       {/* Existing List */}
                      <span />
                    </div>
                    
                    <section className="row">
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <section />
                      </div>
                    </section>
                  </div>
                  
                </form>
              </div>
            </div>
          </article>
          </div>
             
                  
              <CsvParse
      keys={keys}
      onDataUploaded={this.handleData}
      onError={this.handleError}
      render={onChange => <input type="file" onChange={onChange} />}
    />
        </div>
      </div>
      
     
    );
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
console.log(contacts)

this.setState({
  contacts: contacts
})   
console.log(this.state.contacts)
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
  console.log(`${Config.API_URL}subcriber/createListSubcriber`)
  console.log(this.state.contacts)
  axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts)
    .then((response) => {
      if(response != null){
        this.addNotification()
      } 
    })
    .catch((error) => {
      console.log(error);
    });
}

}

export default AddContactsFile;
