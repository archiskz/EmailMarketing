import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ListRow from './../../../components/row/ListRow';

class Lists extends Component {
   constructor(props) {
     super(props);

     this.state = {
         groupContacts: [{}],
       visible: true,
       dropdown_visible: false,
     };
   }

   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }
   componentDidMount(){
    axios.get("http://45.77.172.104:8080/api/groupContacts",{
    })
    .then(res => {
      const listContacts = res.data;
      console.log(listContacts);
      this.setState({groupContacts:listContacts})
    }) 
   }	
  render(){
    var lists = this.state.groupContacts;
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Contact Lists
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
                               
                            
                                <div class="tablet">

                                    <div class="rowt headert">
                                        <div class="cellt">
                                        List Name
                                        </div>
                                        <div class="cellt">
                                            Description
                                        </div>
                                        <div class="cellt">
                                            Contacts
                                        </div>
                                        <div class="cellt">
                                            Actions
                                        </div>
                                    </div>
                                    {lists.map(list=>(
                                        <ListRow
                                        key={list.index}
                                        contactId={list.id}
                                         contactEmail={list.name}
                                    contactStatus={list.description}
                                    contactDateAdded={list.totalContacts} />
                                    ))}

                                    </div>
                            
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
