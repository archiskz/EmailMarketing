import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import { render } from "react-dom";
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone';
import FileUpload from './../../../components/UploadFile';
import csv from 'csv';


class AddContactsFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvUploadFile: "",
      visible: true,
      dropdown_visible: false,
    };
  }
  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }




  render() {
    

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
                            <nav className="btn-list pull-right">
                                <a icon="segment" className="btn_create_contact" href="/marketing_campaigns/ui/contacts/segment">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Contact
                                </a>
                            </nav>
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
              <Dropzone onDrop={this.onDrop}>
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
              </Dropzone>
      
        </div>
      </div>
      
     
    );
  }

   onDrop = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
            console.log(data);
        });
    };

    reader.readAsBinaryString(e[0]);
}


}

export default AddContactsFile;
