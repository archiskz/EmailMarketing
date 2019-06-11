import React, {Component} from 'react';

class CreateList extends Component {
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
                                    Create New List
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                <a style={{"width": "150px"}} icon="segment" className="btn-create-segment" href="/marketing_campaigns/ui/contacts/segment">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save List
                                </a>
                            </nav>
                        </div>
                    </header>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <article data-role="segment-builder">
                  <div className="segment-builder-form-wrapper">
                    <p>
                      With list, you can find individuals within your
                      contact database who share similar traits, for example,
                      "females older than 25" or&nbsp;"paid customers in the
                      USA," so that you can send them relevant, targeted
                      content.
                    </p>
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG" data-role style={{ position: "relative" }}>
                      <input type="radio" name="radio-segment-which-list" id="radio-segment-all" defaultValue="all"/>
                      <label className="input-radio-label" htmlFor="radio-segment-all">
                        <span>
                          List&nbsp;
                          <span data-tooltip="Consider adding contacts to named lists for better organization." data-tooltip-pos="up" data-tooltip-length="large" className="has-underline" >
                            all contacts
                          </span>
                        </span>
                      </label>
                      <span />
                    </div>
                    <div
                      className="input-radio-wrap radioInput-css__radio-container___3sajG"
                      data-role
                      style={{ position: "relative" }}
                    >
                      <input
                        type="radio"
                        name="radio-segment-which-list"
                        id="radio-segment-some-list"
                        defaultValue="some-list"
                      />
                      <label
                        className="input-radio-label"
                        htmlFor="radio-segment-some-list"
                      >
                        List an existing list
                      </label>
                      <span />
                    </div>
                    <section className="row">
                    <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label className="input-select-label">List Name</label>
                                <input type="text" className="inputContact" placeholder=""/>         
                              <div className="input-info-tooltip" />
                            </div>
                          </div>
                     
                    <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label
                                className="input-select-label"
                                htmlFor="select2-operator-07"
                              >
                                Select List
                                <div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                              </label>
                              <select className="inputContact" id="select2-operator-07" name="operator-0" data-index={0} tabIndex={-1} aria-hidden="true">
                                <option value="eq">is</option>
                                <option value="ne">is not</option>
                                <option value="contains">
                                  contains word
                                </option>
                                <option value="empty">is empty</option>
                                <option value="not_empty">
                                  is not empty
                                </option>
                              </select>
                                <div />
                            </div>
                          </div>
                              
                        </section>
                    {/* Condition */}
                    <div className="segment-conditions mt25">
                      <div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label
                                className="input-select-label"
                                htmlFor="select2-field-06"
                              >
                                Condition<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                              </label>

                              <select id="select2-field-06"
                                name="field-0"
                                data-index={0}
                                tabIndex={-1}
                                className="inputContact"
                                aria-hidden="true">
                                <option value="email">Email</option>
                                <option value="first_name">First Name</option>
                                <option value="last_name">Last Name</option>
                                <option value="created_at">Date Added</option>
                                <option value="updated_at">
                                  Last Updated
                                </option>
                                <option value="last_emailed">
                                  Last Emailed
                                </option>
                                <option value="last_clicked">
                                  Last Clicked
                                </option>
                                <option value="last_opened">
                                  Last Opened
                                </option>
                                <option value="clicks.campaign_identifier">
                                  Engagement: Clicks
                                </option>
                                <option value="opens.campaign_identifier">
                                  Engagement: Opens
                                </option>
                              </select>
                              <div />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label
                                className="input-select-label"
                                htmlFor="select2-operator-07"
                              >
                                Criteria<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                              </label>
                              <select className="inputContact" id="select2-operator-07" name="operator-0" data-index={0} tabIndex={-1} aria-hidden="true">
                                <option value="eq">is</option>
                                <option value="ne">is not</option>
                                <option value="contains">
                                  contains word
                                </option>
                                <option value="empty">is empty</option>
                                <option value="not_empty">
                                  is not empty
                                </option>
                              </select>
                                <div />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="input-select-wrap is-required">
                              <label className="input-select-label">Text</label>
                                <input type="text" className="inputContact" placeholder=""/>         
                              <div className="input-info-tooltip" />
                            </div>
                          </div>
                          <div className="col-md-1" />
                        </div>
                      </div>
                      <div data-role="add" className="btn-create-segment mt25">
                         + Add Condition  
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
export default CreateList;
