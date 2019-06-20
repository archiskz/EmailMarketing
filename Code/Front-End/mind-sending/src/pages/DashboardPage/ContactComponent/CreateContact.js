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
          console.log(this.state.listAccounts)
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
      console.log(this.state.listAccounts)
      
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
                                <div onClick={this.onToggleDropdown} className="btn_create_contact" tabindex="0" type="button" data-dropdown-toggle="true" data-role="bulk-actions-toggle">
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
                            
                        </div>
                    </header>
                    <section className="row">
                        <div class="col-md-3">
                        <section>
                        <div class="wrap">
                        <form class="subscribe-box" id="newsletter-form">
                        <div class="input-field input-field-medium sticky-button">
                        <label for="newsletter-email">
                        <input id="newsletter-email" type="email" name="email" placeholder="Search by email"/>
                        </label>
                        <button class="button button-primary button-big" id="subscribe-button-footer" type="submit">
                        <i class="btn_searching fa fa-search"></i>
                        </button>
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
                                <th className="md_tablet6_th" scope="col">Email</th>
                                <th className="md_tablet6_th" scope="col">First Name</th>
                                <th className="md_tablet6_th" scope="col">Last Name</th>
                                <th className="md_tablet6_th" scope="col">Status</th>
                                
                                <th  className="md_tablet6_th" role="presentation">
                                Action
                                </th>
                                
                            </tr>
                                
                            </thead>
                            <tbody>
                            {lists.map(list=>(
                                        <ContactRow
                                        key={list.index}
                                        contactEmail={list.email}
                                        contactStatus={list.name}
                                        contactDateAdded={list.createdTime}
                                    />
                                    ))}
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
