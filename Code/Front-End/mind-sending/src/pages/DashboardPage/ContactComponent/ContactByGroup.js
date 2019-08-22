import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import ContactRow from './../../../components/row/ContactRow';
import * as Config from './../../../constants/Config';
import Pagination from './../../../components/row/Pagination';

      
class ContactByGroup extends Component {
   constructor(props) {
     super(props);

     this.state = {
        //  title: match.params.id,
         listAccounts:[{ id: "", name: "", email: "",address:"",createdTime:""}],
         listAccount: {id: 1, name: "Group 2", description: "Test Group V2", createdTime: "2019-06-12T13:08:24.810", updatedTime: "string"},
       visible: true,
       dropdown_visible: false,
       auth_token:"",
       listFilter:[{ id: "", name: "", email: "",address:"",createdTime:""}],
       allCountries: [{}],
       currentCountries: [{}],
       currentPage: null,
       totalPages: null
     };
      this.showDropdownMenu = this.showDropdownMenu.bind(this);
      this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      
   }
   showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  handleSearch = (event) => {
    var searchValue = event.target.value;
    var groupContactsList = this.state.listFilter
    if(searchValue !== ""){
         groupContactsList = groupContactsList.filter(item => item.email.toLowerCase().includes(searchValue));
         if(groupContactsList.length > 0){
            this.setState({
                allCountries: groupContactsList,
                currentCountries: groupContactsList.slice(0, 8)
             });
         }else {
            this.setState({
                allCountries: [{id:"",name:"",description:""}],
                currentCountries: this.state.listFilter.slice(0,0)
             }); 
         }
         
    } else {
        this.setState({
            allCountries: this.state.listFilter,
            currentCountries: this.state.listFilter.slice(0,10)
         });
    }}   

   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }


    componentDidMount(){

            const id = this.props.history.location.state;
        console.log(id)
            const appState = JSON.parse(sessionStorage.getItem('appState'));
            this.setState({
                auth_token: appState.user.auth_token
            },()=> {
                    this.getContactsByGroupId();
            } )

           
        }   
    
   
   

   getContactsByGroupId=()=>{
    
  if(this.props.history.location.state != null){
    axios.get(`${Config.API_URL}groupContact=${this.props.history.location.state.id}/contacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      console.log(response.data)
      this.setState({
        allCountries: response.data.filter(user => {
          return user.blackList == false
        }),
       listFilter: response.data,
       currentCountries: response.data.filter(user => {
        return user.blackList == false
      }).slice(0,8)
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  }

  handleSearch = (event) => {
    var searchValue = event.target.value;
    var groupContactsList = this.state.listFilter
    if(searchValue !== ""){
         groupContactsList = groupContactsList.filter(item => item.email.toLowerCase().includes(searchValue));
         if(groupContactsList.length > 0){
            this.setState({
                allCountries: groupContactsList,
                currentCountries: groupContactsList.slice(0, 8)
             });
         }else {
            this.setState({
                allCountries: [{id:"",name:"",description:""}],
                currentCountries: this.state.listFilter.slice(0,0)
             }); 
         }
         
    } else {
        this.setState({
            allCountries: this.state.listFilter,
            currentCountries: this.state.listFilter.slice(0,10)
         });
    }
   
}
updatePage=()=>{
this.getContactsByGroupId()
}

onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    console.log("current page" + totalPages)
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };

   renderContacts(currentCountries){
        if(this.state.currentCountries.length ==0){
            return (
                <div style={{"width":"100%","textAlign":"center","fontSize":"17px","position":"absolute","color":"red"}}>No Records Found</div>
            )
        } else return (
            currentCountries.map((list,index) => (
                <ContactRow
            id = {list.id}
            firstName={list.firstName}
            key={list.index}
            email={list.email}
            lastName={list.lastName}
            address={list.address}
            dob={list.dob}
            phone={list.dob}
            createdTime={list.createdTime}
            type={list.type}
            update = {this.updatePage}
        />
            ))
        )
    }
toAddContactFile=()=>{
    
        this.props.history.push({
            pathname:`/dashboard/add-contacts-file`,
            state : {
              id: this.props.history.location.state.id,
    
            },
        });
    
}
toAddContactManual=()=>{
        this.props.history.push({
            pathname:`/dashboard/add-contacts`,
            state : {
              id: this.props.history.location.state.id
            },
        });
}
  


	
  render(){
    var {
        allCountries,
        currentCountries,
        currentPage,
        totalPages
      } = this.state;
      var totalCountries = allCountries.length + 1;
      if(totalCountries == 0){
        totalCountries = 1
      }
     
  
      const headerClass = [
        "text-dark py-2 pr-4 m-0",
        currentPage ? "border-gray border-right" : ""
      ]
        .join(" ")
        .trim();
        if (totalCountries === 0) {return null}
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
                                   {this.props.history.location.state.name}
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                                <div onClick={this.onToggleDropdown} className="btn_create_contact" tabindex="0" type="button" data-dropdown-toggle="true" data-role="bulk-actions-toggle">
                                    <i className="fa fa-users"></i>
                                    Add Contacts
                                    <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <a onClick={this.toAddContactFile} data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </a>
                                        <a onClick={this.toAddContactManual} data-role="dropdown-link" to="/dashboard/add-contacts" className="dropdown-link dropdown-link-with-icon" >
                                            <i className="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </a>
                                    </ul>
                                </div>
                                
                        </div>
                    </header>
                    <section className="row">
                        <div class="col-md-3">
                        <section>
                        <div class="wrap">
                        <form class="subscribe-box" id="newsletter-form">
                        <div class="form-group has-search">
                            <span class="fa fa-search form-control-feedback"></span>
                            <input onChange={this.handleSearch} type="text" class="form-control" placeholder="Search Contact"/>
                            </div>
                        <div class="error-label">
                        </div>
                        </form>
                        </div>
                        </section>
                        </div>
                    </section>
                    
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Contact List</h4>
                        <p className="md_tablet_p">Here is the list of your contacts </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="table1 table-striped table-hover">
                            <thead className="">
                            <tr className="">
                                {/* <th className="md_tablet6_th" scope="col"></th> */}
                                <th className="" scope="col">Email</th>
                                <th className="" scope="col">First Name</th>
                                <th className="" scope="col">Last Name</th>
                                
                                <th className="" scope="col">Status</th>
                                
                                <th  className="" role="presentation">
                                
                                <div className="" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                             
                                    </div>
                                </th>
                                
                            </tr>
                                
                            </thead>
                            <tbody>
                            {this.renderContacts(currentCountries)}
                            </tbody>
                            <Pagination
                totalRecords={totalCountries}
                pageLimit={10}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>

            </article>
        </div>
    </div>
  
    </div>
      );
  }

}
export default withRouter(ContactByGroup);
