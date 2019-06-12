import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ListRow from './../../../components/row/ListRow';

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
//    componentDidMount(){
//     axios.get(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => {
//       const persons = res.data;
//       this.setState({ persons });
//     })
//    }

  


	
  render(){
    var lists = [
        {listName:'All Contact', description:'List All Contact', totalContacts:'10'},
        {listName:'Abc', description:'List ads', totalContacts:'3'},
        {listName:'10/2', description:'List asd', totalContacts:'7'},
        {listName:'hello', description:'List has', totalContacts:'9'}
    ];
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
                                <table className="table-wrap has-checkboxes segment-conditions">
                                    <thead>
                                        <tr>
                                            <th>Lists</th>
                                            <th>Description</th>
                                            <th>Contacts</th>
                                            <th className="actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {lists.map(list=>(
                                        <ListRow
                                        key={list.index}
                                         listName={list.listName}
                                    description={list.description}
                                    totalContacts={list.totalContacts} />
                                    ))}
                                    
                                    <ListRow listName={"All Contacts"}
                                    description={"All Contacts"}
                                    totalContacts={"0"} />
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
