import React, {Component} from 'react';

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      dropdown_visible: false,
    };
  }
  onToggleDropdown = () =>{
      this.setState({
          dropdown_visible : !this.state.dropdown_visible
      })
  }



	
  render(){
     return (
      
	<div className = "">
        <div class="flash_notice">
        </div>
        <div class="container" data-role="main-app-container">
            <div>
                <article>
                    <header class="row">
                        <div class="col-md-6">
                            <span>
                                <h1 class="">
                                    <span class="pageTitle-css__title-heading___3H2vL">Contact Lists &amp; Segments
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div class="col-md-6">
                            <nav class="btn-list pull-right">
                                <a icon="segment" class="btn-create-segment" href="/marketing_campaigns/ui/contacts/segment">
                                    <i class="sg-icon sg-icon-segment"></i>
                                    Create Segment
                                </a>
                                
                                <div onClick={this.onToggleDropdown} class="btn-create-segment" data-dropdown-toggle="true" data-role="bulk-actions-toggle">
                                    <i class="fa fa-users"></i>
                                    Add Contacts
                                    <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <a data-role="dropdown-link" data-to="/marketing_campaigns/ui/contacts/upload_csv" class="dropdown-link dropdown-link-with-icon" href="/marketing_campaigns/ui/contacts/upload_csv">
                                            <i class="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </a>
                                        <a data-role="dropdown-link" data-to="/marketing_campaigns/ui/contacts/manual_add" class="dropdown-link dropdown-link-with-icon" href="/marketing_campaigns/ui/contacts/manual_add">
                                            <i class="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </a>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <section class="row">
                        <div class="col-md-3">
                            <section>
                                <div class="wrap">
                                    <div class="search">
                                        <input type="text" class="searchTerm" placeholder="Search by email address"/>
                                        <button type="submit" class="searchButton">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section>
                        <div class="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                            <section class="items-collection-container">
                                <section>
                                    <div>
                                        <div class="sg-modal " data-modal="true">

                                        </div>
                                        <div class="modal-mask ">

                                        </div>
                                    </div>
                                    <div>
                                        <div class="sg-modal " data-modal="true">

                                        </div>
                                        <div class="modal-mask ">

                                        </div>
                                    </div>
                                <table class="table-wrap has-checkboxes">
                                    <thead>
                                        <tr>
                                           
                                            <th>Type</th>
                                            <th>Lists/Segments</th>
                                            <th>Contacts</th>
                                            <th class="actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="queryRow-css__container___2FcAu infinitely-scrollable-item">
                                            
                                            <td class="cell-label">
                                                <span class="label label-global">global</span>
                                            </td>
                                            <td class="list-name">
                                                <a href="/marketing_campaigns/ui/all_contacts">All Contacts</a>
                                            </td>
                                            <td class="numeric">
                                                <span class="query-count-container">
                                                    0
                                                    <div class="queryCount-css__reload-tooltip___JH8R9">
                                                        <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" class="">
                                                            <i class="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                                                        </span>
                                                    </div>
                                                </span>
                                            </td>
                                            <td class="actions">
                                                <i class="sg-icon sg-icon-ellipsis"></i>
                                                <div class="action-icons">
                                                    <span data-tooltip="Export" data-tooltip-pos="up" data-tooltip-length="" class="">
                                                        <i class="sg-icon sg-icon-export" data-role="export-global"></i>
                                                    </span>
                                                    <span data-tooltip="Edit" data-tooltip-pos="up" data-tooltip-length="" class="">
                                                        <a href="/marketing_campaigns/ui/all_contacts">
                                                            <i class="sg-icon sg-icon-pencil" data-role="edit-global" data-scroll-top="true"></i>
                                                        </a>
                                                    </span>
                                                    <span data-tooltip="Create Segment" data-tooltip-pos="up" data-tooltip-length="" class="">
                                                        <a href="/marketing_campaigns/ui/contacts/segment/0">
                                                            <i class="sg-icon sg-icon-segment" data-role="make-segment-global" data-scroll-top="true"></i>
                                                        </a>
                                                    </span>
                                                    <span data-tooltip="Delete All Contacts" data-tooltip-pos="up" data-tooltip-length="" class="">
                                                        <i class="sg-icon sg-icon-trash" data-role="delete-global"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </section>
                        <section class="loading-status-container">
                        
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
export default AddContact;
