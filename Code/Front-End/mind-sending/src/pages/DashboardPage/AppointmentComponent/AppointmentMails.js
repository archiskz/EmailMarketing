import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppointmentRow from '../../../components/row/AppointmentRow';
import Modal from 'react-awesome-modal';
import axios from 'axios';
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
         listAppointments:[],
       visible: true,
       dropdown_visible: false,
       existedGroup:"",
       auth_token:"",
       filter:[]
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

   addNotification=(title)=> {
    this.notificationDOMRef.current.addNotification({
      title: `${title}`,
      message: `${title} Success!`,
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
    if(this.props.history.location.state != null && this.props.history.location.state != undefined){
      if(this.props.history.location.state.success != null && this.props.history.location.state.success != undefined){
        this.addNotification(this.props.history.location.state.success)
        this.props.history.replace({});
      }
    }
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllAppointment() )
   }	
  render(){
    var lists = this.state.listAppointments;
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Appointment Lists
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                         <div className="col-md-6">
                       
                        <a onClick={this.toCreateInvite}  className="btn_create_contact ml0" style={{"marginLeft":"0px !important"}}>
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Invite Mail
                                </a>
            
            </div>
                    </header>
                    <section className="row">
                                <div className="col-md-3">
                                    <section>
                                        <div className="wrap">
                                            <form class="subscribe-box" id="newsletter-form">
                                              
                                                <div class="form-group has-search">
                                                    <span class="fa fa-search form-control-feedback"></span>
                                                    <input onChange={this.handleSearch} type="text" class="form-control" placeholder="Search appointment"/>
                                                </div>
                                                <div class="error-label"></div>
                                                
                                            </form>
                                        </div>

                                    </section>
                                </div>
                            </section>
                    <section>
                        <div className="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                        <section>
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <div style={{"width":"60%", "float":"left"}}><h4 className="md_tablet_h4">Invite Mails</h4>
                        <p className="md_tablet_p">Here is the list of your invites mail </p></div>
						
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="table1 table-striped table-hover">
                            <thead className=" ">
                            <tr className=" ">
                                <th className=" " scope="col"></th>
                                <th className=" " scope="col">Name</th>
                                <th className=" " scope="col">Start On</th>
                                {/* <th className="md_tablet6_th" scope="col">Groups</th> */}
                                <th className=" " scope="col">Invitations sent</th>
								<th className=" " scope="col">Registrants</th>
                                <th  className=" " role="presentation">
                                
                                <div className=" " onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                                    {/* <i class="fa fa-caret-down"></i> */}
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
                            {lists.map(list=>(
                                        <AppointmentRow
                                        update={this.getAllListContact}
                                        key={list.index}
                                        contactId={list.id}
                                         name={list.name}
                                    time={list.time}
                                    group={list.appointmentGroupContacts.id}
                                    contactDateAdded={list.totalContacts} />
                                    ))}

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

    handleSearch = (event) => {
      var searchValue = event.target.value;
      var groupContactsList = this.state.filter
      if(searchValue !== ""){
           groupContactsList = groupContactsList.filter(item => item.name.toLowerCase().includes(searchValue));
           if(groupContactsList.length > 0){
              this.setState({
                listAppointments: groupContactsList,
               });
           }else {
              this.setState({
                listAppointments:  [],
               }); 
           }
           
      } else {
          this.setState({
            listAppointments: this.state.filter,
           });
      }
     
  }
    getAllAppointment=()=>{
    axios.get(`${Config.API_URL}appointments`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      this.setState({listAppointments:res.data,
      filter: res.data})
    }).catch(function (error) {
      });
  }


}
export default withRouter(AppointmentMails);
