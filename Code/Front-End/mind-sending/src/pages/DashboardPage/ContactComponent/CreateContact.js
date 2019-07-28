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
       auth_token:"",
       listFilter:[{ id: "", name: "", email: "",address:"",createdTime:""}],
       listAllAccounts:[]
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


   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }


    componentDidMount(){

            const id = this.props.history.location.state;
        console.log(id)
            const appState = JSON.parse(localStorage.getItem('appState'));
            this.setState({
                auth_token: appState.user.auth_token
            },()=> {
                    this.getContactsByGroupId();
                    this.getAllContacts()
            } )

           
        }   
    
   
   componentWillReceiveProps(nextProps){
       if(nextProps.history.location.state !== this.props.history.location.state){
           console.log(nextProps.history.location.state)
           
           const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {
        this.getAllContacts()
    } ) 
       }
   }

   

   getContactsByGroupId=()=>{
    console.log("haha")
  if(this.props.history.location.state != null){
    axios.get(`${Config.API_URL}groupContact=${this.props.history.location.state.id}/contacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      this.setState({
        listAccounts: response.data,
        listFilter: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  }

   getAllContacts=()=>{
    console.log("haha")
   axios.get(`${Config.API_URL}subcribersV2`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
   .then(response => {
       console.log(response.data)
     this.setState({
       listAllAccounts: response.data,
       listFilter: response.data
     });
   })
   .catch(error => {
     console.log(error);
   });
  }


   renderTitle(){
       if(this.props.history.location.state != null){
           console.log(this.state.listAccount.name)
           return this.props.history.location.state.name
       } else {
           return "All Contact";
       }
   }

   handleSearch = (event) => {
    var searchValue = event.target.value;
    console.log(searchValue)
    if(this.props.history.location.state == null || this.props.history.location.state == undefined){
        console.log(searchValue)
      var list_account = this.state.listFilter
          if(searchValue !== ""){
              list_account = list_account.filter(item => item.email.includes(searchValue))
              this.setState({
                  listAllAccounts: list_account
              });
          } else {
              this.setState({
                listAllAccounts: this.state.listFilter
              });
          }
    } else{
        var list_account = this.state.listFilter
        if(searchValue !== ""){
            list_account = list_account.filter(item => item.email.includes(searchValue))
            this.setState({
                listAccounts: list_account
            });
        } else {
            this.setState({
                listAccounts: this.state.listFilter
            });
        }
    }
   
}
updatePage=()=>{
this.getAllContacts();
this.getContactsByGroupId()
}

   renderContacts(){
       var lists;
        if(this.props.history.location.state== null || this.props.history.location.state == undefined){
           lists = this.state.listAllAccounts
        } else {
            lists = this.state.listAccounts
        }
        // var lists = this.state.listAccounts;
        return lists.map(list=>(
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
    }
toAddContactFile=()=>{
    
    if(this.props.history.location.state != null){
        this.props.history.push({
            pathname:`/dashboard/add-contacts-file`,
            state : {
              id: this.props.history.location.state.id,
    
            },
        });
    } else{
        this.props.history.push({
            pathname:`/dashboard/add-contacts-file`
        });
    }
    
}
toAddContactManual=()=>{
    if(this.props.history.location.state != null){
        this.props.history.push({
            pathname:`/dashboard/add-contacts`,
            state : {
              id: this.props.history.location.state.id
            },
        });
    } else {
        this.props.history.push({
            pathname:`/dashboard/add-contacts`,
        });
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
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col"></th>
                                <th className="md_tablet6_th" scope="col">Email</th>
                                <th className="md_tablet6_th" scope="col">First Name</th>
                                <th className="md_tablet6_th" scope="col">Last Name</th>
                                
                                <th className="md_tablet6_th" scope="col">Status</th>
                                
                                <th  className="md_tablet6_th" role="presentation">
                                
                                <div className="ul_create_contact" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                                    <i class="fa fa-caret-down"></i>
                                    </div>
                                   { this.state.displayMenu ? (
                                    <ul className="">
                                   <li><a className="active" href="#">Add to list</a></li>
                                   <li><a href="# ">Remove from list</a></li>
                                   <li><a href="# ">Move to list</a></li>
                                   <li><a href="# ">Copy to list</a></li>
                                   <li><a href="# ">Unsubcribe</a></li>
                                   <li><a href="# ">Resubcribe</a></li>                                  
                                   <li><a href="# ">Delete</a></li>
                                    </ul>
        ):
        (
          null
        )
        }
                                
                                </th>
                                
                            </tr>
                                
                            </thead>
                            <tbody>
                            {this.renderContacts()}
                            </tbody>
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
export default withRouter(CreateContact);
