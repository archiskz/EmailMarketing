import React, { Component } from 'react';

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
                  
                </form>
              </div>
            </div>
          </article>
          </div>
        </div>
        <div class="file-upload-wrapper">
        <div class="card card-body view file-upload">
        <div class="card-text file-upload-message">
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag and drop a file here or click</p>
        <p class="file-upload-error">Ooops, something wrong happended.</p>
        </div>
        <div class="mask rgba-stylish-slight"></div>
        <div class="file-upload-errors-container">
        <ul></ul>
        </div>
        <input type="file" id="input-file-now" class="file_upload"></input>
        <button type="button" class="btn btn-sm btn-danger">Remove<i class="far fa-trash-alt ml-1"></i>
        </button>
        <div class="file-upload-preview">
        <span class="file-upload-render"></span>
        <div class="file-upload-infos">
        <div class="file-upload-infos-inner">
        <p class="file-upload-filename">
        <span class="file-upload-filename-inner"></span>
        </p>
        <p class="file-upload-infos-message">Drag and drop or click to replace</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>

     
    );
  }

}
export default AddContactsFile;
