import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
                                <Link icon="segment" className="btn-create-segment" to="/dashboard/create-list">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Campaigns
                                </Link>
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
                        <div className="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                            <section className="items-collection-container">
                                <section>
                                    <div>
                                        <div className="sg-modal " data-modal="true">

                                        </div>
                                        <div className="modal-mask ">

                                        </div>
                                    </div>
                                    <div>
                                        <div className="sg-modal " data-modal="true">

                                        </div>
                                        <div className="modal-mask ">

                                        </div>
                                    </div>
                                <table className="table-wrap has-checkboxes segment-conditions">
                                    <thead>
                                        <tr>
                                           
                                            <th>Status</th>
                                            <th>Campaign Name</th>
                                            <th>Sent</th>
                                            <th>Opens</th>
                                            <th>Clicks</th>
                                            <th>Unsubcribes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="queryRow-css__container___2FcAu infinitely-scrollable-item">
                                            
                                            <td className="cell-label">
                                                <span className="label label-global">Draft</span>
                                            </td>
                                            <td className="list-name">
                                                <a href="/marketing_campaigns/ui/all_contacts">Welcome Campaign</a>
                                            </td>
                                            <td className="numeric">
                                                <span className="query-count-container">
                                                    -
                                                    <div className="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                            <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="numeric">
                                                <span className="query-count-container">
                                                    -
                                                    <div className="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                            <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="numeric">
                                                <span className="query-count-container">
                                                    -
                                                    <div className="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                            <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="numeric">
                                                <span className="query-count-container">
                                                    -
                                                    <div className="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                            <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </section>
                        <section className="loading-status-container">
                        
                        </section>
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
