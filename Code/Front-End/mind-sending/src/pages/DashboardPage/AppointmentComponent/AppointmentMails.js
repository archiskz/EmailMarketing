import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ListRow from '../../../components/row/ListRow';
import Modal from 'react-awesome-modal';
import * as Config from '../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { withRouter } from "react-router";
 


class AppointmentMails extends Component {
   constructor(props) {
     super(props);

     this.state = {
         newList:{
            name: "",
            description: ""
         },
        createListVisible: false,
         groupContacts: [{}],
       visible: true,
       dropdown_visible: false,
       existedGroup:"",
       auth_token:""
     };
     
     this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
     this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
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

   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Create New Group",
      message: "Add Group Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }
   componentDidMount(){
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllListContact() )
   }	
  render(){
    var lists = this.state.groupContacts;
     return (
	  <div className = "" >
   <div className="flash_notice">
   <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">Invite Lists
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                       
                    </header>
                    {/* <section className="row">
                        <div className="col-md-3">
                            <section>
                                <div className="wrap">
                                <form class="subscribe-box" id="newsletter-form">
                                    <div class="input-field input-field-medium sticky-button">
                                        <label for="newsletter-email">
                                            <input id="newsletter-email" type="email" name="email" placeholder="Search list"/>
                                        </label>
                                        <button class="button button-primary button-big" id="subscribe-button-footer" type="submit"><i class="btn_searching fa fa-search"></i></button>
                                    </div>
                                    <div class="error-label"></div></form>
                                </div>
                            </section>
                        </div>
                    </section> */}
                    <section>
                        <div className="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                        <section>
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <div style={{"width":"60%", "float":"left"}}><h4 className="md_tablet_h4">Invite Mails</h4>
                        <p className="md_tablet_p">Here is the list of your invites mail </p></div>
						<div style={{"width":"40%","float":"left"}}>
						<a onClick={this.toCreateInvite}  className="btn_create_contact ml0" style={{"marginLeft":"0px !important"}}>
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Invite Mail
                                </a>
						</div>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col"></th>
                                <th className="md_tablet6_th" scope="col">Name</th>
                                <th className="md_tablet6_th" scope="col">Start On</th>
                                <th className="md_tablet6_th" scope="col">Invitations sent</th>
								<th className="md_tablet6_th" scope="col">Visitors</th>
								<th className="md_tablet6_th" scope="col">Registrants</th>
                                <th  className="md_tablet6_th" role="presentation">
                                
                                <div className="ul_create_contact2" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                                    <i class="fa fa-caret-down"></i>
                                    </div>
                                   { this.state.displayMenu ? (
                                    <ul className="">
                                    <li><a href="# ">Import</a></li>
                                     {this.props.contactActions}
                                   <li><a title="Edit">Edit </a></li>
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
                            {/* {lists.map(list=>(
                                        <ListRow
                                        update={this.getAllListContact}
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

             
                        
                    </div>
                </section>
                   
            </article>
        </div>
    </div>
    </div>
      );
  }
  
  toCreateInvite = ()=> {        
    this.props.history.push({
        pathname:'/create-invite',
    });
    }

  getAllListContact=()=>{
    let config = {};
    config = {headers: 
        {Authorization : Config.TOKEN
}};

    console.log(config);
    axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      const listContacts = res.data;
      console.log(listContacts);
      this.setState({groupContacts:listContacts})
    }).catch(function (error) {
      });
  }


}
export default withRouter(AppointmentMails);
