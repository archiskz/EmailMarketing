import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CreateCampaign from './CreateCampaigns';
import CampaignPopUp from './../../../components//modals/CampaignPopUp.js';

class Campaigns extends Component {
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
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">Campaigns
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                
                              <a class="btn-create-segment" href="#popup">Create campaign</a>
                             <CampaignPopUp />
                            </nav>
                        </div>
                    </header>
                    {/* fiLTER */}
                    <section className="row">
                      <div className="segment-filter">
                      <span className="filter-header">
                        Filter Campaigns
                      </span>
                        <div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="input-select-wrap is-required">
                                <label
                                  className="input-select-label"
                                  htmlFor="select2-field-06"
                                >
                                  Campaign Name<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                                </label>
                                
                                  <input type="text" className="inputContact" placeholder=""/>                                       
                               
                                <div />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-select-wrap is-required">
                                <label
                                  className="input-select-label"
                                  htmlFor="select2-operator-07"
                                >
                                  Status<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                                </label>
                                <select
                                className="inputContact"
                                  id="select2-operator-07"
                                  name="operator-0"
                                  data-index={0}
                                  tabIndex={-1}
                                  aria-hidden="true"
                                >
                                  <option value="eq">All</option>
                                  <option value="ne">Sent</option>
                                  <option value="contains">
                                    Draft
                                  </option>
                                  <option value="empty">In Progress</option>
                                  <option value="not_empty">
                                    Canceled
                                  </option>
                                  <option value="not_empty">
                                    Scheduled
                                  </option>
                                </select>
                                  <div />
                              </div>
                            </div>
                            <div data-role="add" className="btn-create-segment btn-clear">
                          Clear  
                        </div>
                          </div>
                        </div>
                        
                      </div> 
                     </section>
                    <section>
                    {/* end filter */}
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Campaign Lists</h4>
                        <p className="md_tablet_p">Here is the list of your Campaigns </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col">Status</th>
                                <th className="md_tablet6_th" scope="col">Campaign Name</th>
                                <th className="md_tablet6_th" scope="col">Clicks</th>
                                <th className="md_tablet6_th" scope="col">Opens</th>
                                <th className="md_tablet6_th" scope="col">Unsubcribe</th>
                            </tr>
                                
                            </thead>
                            <tbody>
                            {/* {lists.map(list=>(
                                        <ListRow
                                        key={list.index}
                                        contactId={list.id}
                                         contactEmail={list.name}
                                    contactStatus={list.description}
                                    contactDateAdded={list.totalContacts} />
                                    ))} */}

                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>
                  
                          </section>
            </article>
        </div>
    </div>
  
    </div>
      );
  }

}
export default Campaigns;
