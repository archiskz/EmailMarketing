import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Config from '../../../constants/Config';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import FormRow from './../../../components/row/FormRow'

class EmbeddedForms extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: true,
       dropdown_visible: false,
       campaigns: [],
       auth_token:"",
       forms:[],filter:[]
     };
     this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
   }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }

   componentDidMount(){
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllForms() )
   }
   
   getAllForms=()=>{
    axios.get(`${Config.API_URL}forms`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({forms: res.data,
        filter: res.data},()=>{
            if(this.props.history.location.state != null && this.props.history.location.state != undefined){
                if(this.props.history.location.state.create != null && this.props.history.location.state.create !== undefined){
                  this.props.history.replace({});
                        this.addNotification();
                }
              }
        });
    }) 

   }

   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Campaign",
      message: "Create New Form Successfully!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
    // this.props.history.goBack()
  }
   handleSearch = (event) => {
    var searchValue = event.target.value;
    var groupContactsList = this.state.filter
    console.log(groupContactsList)
    if(searchValue !== ""){
         groupContactsList = groupContactsList.filter(item => item.name.toLowerCase().includes(searchValue));
         if(groupContactsList.length > 0){
            this.setState({
                forms: groupContactsList,
             });
         }else {
            this.setState({
                forms:  [],
             }); 
         }
         
    } else {
        this.setState({
            forms: this.state.filter,
         }, ()=>{console.log(this.state.forms)});
    }
   
}


	
  render(){
    var listForms = this.state.forms
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Manage Forms
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                
                              <Link class="btn_create_contact" to="/dashboard/create-form">Create Form</Link>
                           
                        </div>
                    </header>
                    <section className="row">
                                <div className="col-md-3">
                                    <section>
                                        <div className="wrap">
                                            <form class="subscribe-box" id="newsletter-form">
                                              
                                                <div class="form-group has-search">
                                                    <span class="fa fa-search form-control-feedback"></span>
                                                    <input onChange={this.handleSearch} type="text" class="form-control" placeholder="Search Form"/>
                                                </div>
                                                <div class="error-label"></div>
                                                
                                            </form>
                                        </div>

                                    </section>
                                </div>
                            </section>
                    <section>
                    {/* end filter */}
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Form Lists</h4>
                        <p className="md_tablet_p">Here is the list of your embedded form </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="table1 table-striped table-hover">
                            <thead className=" ">
                            <tr className=" ">
                                <th className=" " scope="col">Form name</th>
                                <th className=" " scope="col">Create On</th>
                                <th className=" " scope="col">Group Contact</th>
                                <th className=" " scope="col"></th>
                                {/* <th className="md_tablet6_th" scope="col">Unsubcribe</th>
                                <th className="md_tablet6_th" scope="col">Actions</th> */}
                            </tr>
                                
                            </thead>
                            <tbody>
                            {listForms.map(list=>(
                                        <FormRow
                                        id={list.id}
                                        key={list.index}
                                        formName={list.name}
                                         createTime={list.createdTime}
                                         group = {list.formGroupContacts}
                                         update = {this.getAllForms}
                                     />
                                    ))}

                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>
                  
                          </section>
            </article>
        </div>
    </div>
  
    </div>
      );
  }

}
export default EmbeddedForms;
