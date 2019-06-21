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


class AddContactsFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [{
        name: "",
        email:"",
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
      selectValue:"",
      selectId: 0
    };
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

  

  render() {
    const keys = [
      "name",
      "email"
    ]
    var lists = this.state.lists;

    return (

      <div className role="main">
        <div className="flash_notice">
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
                      <h5>Choose A List</h5>
                      <select className="inputContact mt15" style={{"width": "250px", "borderBottom":"1px solid #ccc !important"}}  onChange={this.handleChange} type="text" tabindex="-1" readonly="readonly" role="presentation">
                       {lists.map(list => <option value={list.id}  key={list.id}>{list.name}</option>)}
                            </select>
                  
                       {/* Existing List */}
                      <span />
                    </div>
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG" data-role style={{ position: 'relative' }}>
                      <input type="radio" name="existing-or-new" id="radio-manual-add-to-new" defaultValue="new" />
                      <label className="input-radio-label" htmlFor="radio-manual-add-to-new">
                        Add contacts and include in a new list
                      </label>
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
             
            {/* <FileUpload /> */}
              {/* <Dropzone onDrop={this.onDrop}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                    <div className="contact_file">
                      <input {...getInputProps()} />
                      <span>
                        "Drag or drop your 
                        file"
                        or
                      <a style = {{"fontWeight":"bold", "cursor":"pointer"}}> import your contact here</a> </span>
                    </div>
                    </div>
                  </section>
                )}
              </Dropzone> */}
                  
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
    // this.setState({ data })
       this.setState({
      contacts: data
    })
    var contactList = this.state.contacts;
    
      let contacts = contactList.map((contact)=>{
        var contact= contact;
  return {
    ...contact,
    gcSubcriberDTOS: [
      {
        groupContactId: this.state.selectValue
      }
    ]
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
    // reader.readAsText(e[0])
    // reader.readAsArrayBuffer(e[0])
}
  handleChange=(event)=> {
    const { value } = event.target;

  this.setState({
    selectValue: value
  });
  console.log(this.state.selectValue)

}
onSave= () => {
  console.log(`${Config.API_URL}subcriber/createListSubcriber`)
  console.log(this.state.contacts)
  axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

}

export default AddContactsFile;
