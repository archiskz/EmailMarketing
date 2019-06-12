import React, {Component} from 'react';

class CreateContact extends Component {
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


	
  render(){
     return (
	  <div className = "" >
        <div class="flash_notice">
        </div>
        <div class="container" data-role="main-app-container">
        <div>
          <article>

          <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"font-family": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">
                                    Create New Contact
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                <a style={{"width": "150px"}} icon="segment" className="btn-create-segment" href="/marketing_campaigns/ui/contacts/segment">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Contact
                                </a>
                            </nav>
                        </div>
                    </header>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <article data-role="segment-builder">
                  <div className="segment-builder-form-wrapper">
                    <p>
                      When you bring all your contacts into MindSending, we’ll make them engage with you as long as you want.
                    </p>
                    <br/>
                    <br/>
                    
                    <section className="row">
                    
                     
                    <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              
                              <label
                                className="input-select-label"
                                htmlFor="select2-operator-07"
                              >
                                Search By
                                <div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                              </label>
                              
                              <br/>
                              <div className="search">
                              <select className="inputContact" id="select2-operator-07" name="operator-0" data-index={0} tabIndex={-1} aria-hidden="true">
                                <option value="eq">First Name</option>
                                <option value="ne">Last Name</option>
                                <option value="qq">
                                  Email
                               
                                </option>
                              </select>
                              <button type="submit" className="searchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                        </div>
                                <div />
                            </div>
                          </div>
                              
                        </section>
                    {/* Condition */}
                    <br/>
                    <br/>
                    <br/>
                    <span className="title-h3">
                    Contact Info
                </span>
                    <div className="segment-conditions mt25">
                      <div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label className="input-select-label">First Name</label>
                                <input type="text" className="inputContact" placeholder=""/>         
                              <div className="input-info-tooltip" />
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label className="input-select-label">Last Name</label>
                                <input type="text" className="inputContact" placeholder=""/>         
                              <div className="input-info-tooltip" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label className="input-select-label">Email</label>
                                <input type="text" className="inputContact" placeholder=""/>         
                              <div className="input-info-tooltip" />
                            </div>
                          </div>
                          <div className="col-md-1" />
                        </div>

                      </div>

                      <div data-role="add" className="btn-create-segment mt25">
                         + Add More Contact  
                      </div>
                    </div> 
                  </div>
                </article>
              </div>
            </div>
          </article>
</div>
        </div>
    </div>
      );
  }

}
export default CreateContact;
