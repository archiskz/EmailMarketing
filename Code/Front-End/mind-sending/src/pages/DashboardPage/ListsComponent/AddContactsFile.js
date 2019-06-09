import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import { render } from "react-dom";
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone'


class AddContactsFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
                                <a icon="segment" className="btn-create-segment" href="/marketing_campaigns/ui/contacts/segment">
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
                  <span className="title-h3">
                    Contact Info
                </span>
                  <section className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                        <input type="text" className="inputContact" placeholder="First name"/>                                       
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div className="search">
                        <input type="text" className="inputContact" placeholder="Last name"/>                                       
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                          <input type="text" className="inputContact" placeholder="Email"/>                                       
                      </div>
                    </div>
                  </section>
                </form>
              </div>
            </div>
          </article>
          </div>
             <div className="contact_file">
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <span>
          "Drag or drop your 
          file"
          or
        </span>
        <span className="browse_link"> import your contact here </span>
      </div>
    </section>
  )}
</Dropzone>
      </div>
        </div>
      </div>
      
     
    );
  }

}

export default AddContactsFile;
