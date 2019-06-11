import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Lists extends Component {
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Contact Lists &amp; Segments
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                <Link icon="segment" className="btn-create-segment" to="/dashboard/create-list">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Segment
                                </Link>
                                
                                <div onClick={this.onToggleDropdown} className="btn-create-segment" data-dropdown-toggle="true" data-role="bulk-actions-toggle">
                                    <i className="fa fa-users"></i>
                                    Add Contacts
                                    <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </Link>
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts" className="dropdown-link dropdown-link-with-icon" >
                                            <i className="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </Link>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <section className="row">
                        <div className="col-md-3">
                            <section>
                                <div className="wrap">
                                    <div className="search">
                                        <input type="text" className="searchTerm" placeholder="Search by email address"/>
                                        <button type="submit" className="searchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section>
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
                                           
                                            <th>Type</th>
                                            <th>Lists/Segments</th>
                                            <th>Contacts</th>
                                            <th className="actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="queryRow-css__container___2FcAu infinitely-scrollable-item">
                                            
                                            <td className="cell-label">
                                                <span className="label label-global">global</span>
                                            </td>
                                            <td className="list-name">
                                                <a href="/marketing_campaigns/ui/all_contacts">All Contacts</a>
                                            </td>
                                            <td className="numeric">
                                                <span className="query-count-container">
                                                    0
                                                    <div className="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                            <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="actions">
                                                <i className="sg-icon sg-icon-ellipsis"></i>
                                                <div className="action-icons">
                                                    <span data-tooltip="Export" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                        <i className="sg-icon sg-icon-export" data-role="export-global"></i>
                                                    </span>
                                                    <span data-tooltip="Edit" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                        <a href="/marketing_campaigns/ui/all_contacts">
                                                            <i className="sg-icon sg-icon-pencil" data-role="edit-global" data-scroll-top="true"></i>
                                                        </a>
                                                    </span>
                                                    <span data-tooltip="Create Segment" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                        <a href="/marketing_campaigns/ui/contacts/segment/0">
                                                            <i className="sg-icon sg-icon-segment" data-role="make-segment-global" data-scroll-top="true"></i>
                                                        </a>
                                                    </span>
                                                    <span data-tooltip="Delete All Contacts" data-tooltip-pos="up" data-tooltip-length="" className="">
                                                        <i className="sg-icon sg-icon-trash" data-role="delete-global"></i>
                                                    </span>
                                                </div>
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
export default Lists;
