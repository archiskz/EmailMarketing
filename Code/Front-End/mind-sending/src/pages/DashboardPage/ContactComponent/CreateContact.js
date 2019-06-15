import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ContactRow from './../../../components/row/ContactRow';
import * as Config from './../../../constants/Config';

class CreateContact extends Component {
   constructor(props) {
     super(props);

     this.state = {
        //  title: match.params.id,
         listAccounts:[{ id: "", name: "", email: "",address:"",createdTime:""}],
         listAccount: {id: 1, name: "Group 2", description: "Test Group V2", createdTime: "2019-06-12T13:08:24.810", updatedTime: "string"},
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
    
    console.log(this.props.history.location.state);

    // console.log("props:" + this.props);
    // console.log("props:" + this.props);
    // console.log(`http://192.168.100.106:8080/api/groupContact=1/contacts`);
    const id = this.props.history.location.state;
    if(this.props.history.location.state != null){ 
        axios.post(`${Config.API_URL}groupContact=${this.props.history.location.state}/contacts`,)
        .then(res => {
            
            // console.log(res.data);
          const listAccounts = res.data;
        //   console.log(listAccounts);
          this.setState({listAccounts:listAccounts})
                    axios.get(`${Config.API_URL}groupContact/contactById?id=${id}`,)
                    .then(response => {
                       
                        console.log(response.data)
                        this.setState({
                            listAccount: response.data,
                        })
                    
                    })

        })

        

    } else {
        axios.get(`${Config.API_URL}subcribersV2`,{
        params: {
            account_id: 1
        }
    })
    .then(res => {
      const listAccounts = res.data;
    //   console.log(listAccounts);
      this.setState({listAccounts:listAccounts})
      
    })
    }
    
   }

   renderTitle(){
       if(this.props.history.location.state != null){
           return this.state.listAccount.name
       } else {
           return "All Contact";
       }
   }
  


	
  render(){
    var lists = this.state.listAccounts;
     return (
	  <div className = "" >
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="contact_row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">
                                    {/* {this.state.listAccount.name} */}
                                   {this.renderTitle()}
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                {/* <Link icon="segment" className="btn-create-segment" to="/dashboard/create-list">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Segment
                                </Link> */}
                                
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
                                        Email Address
                                    </div>
                                    <div class="cellt">
                                        Status
                                    </div>
                                    <div class="cellt">
                                        Date Added
                                    </div>
                                    <div class="cellt">
                                        Actions
                                    </div>
                                </div>
                                {lists.map(list=>(
                                        <ContactRow
                                        key={list.index}
                                         contactEmail={list.email}
                                        
                                         contactDateAdded={list.createdTime}
                                         
                                          />
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
export default withRouter(CreateContact);
