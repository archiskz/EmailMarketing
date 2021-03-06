import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Config from './../../constants/Config';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Automations from './Automations';
import CampaignPopUp from './../../components//modals/CampaignPopUp.js';
import AutoRow from './../../components/row/AutoRow'
import ReactNotification from "react-notifications-component";

class AutomationCampaigns extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: true,
       dropdown_visible: false,
       campaigns: [],
       auth_token:""
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
    },()=> {
      this.getAllAutoCampaign()
      this.getAllCampaign()
      this.getAllForms()
      this.getAllAppointment()
      this.loadStatitic()
      this.loadStatiticApp()
    })
   }
   getAllForms=()=>{
    var selectOptions = [
    ];
    axios.get(`${Config.API_URL}forms`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      res.data.forEach(element => {
        selectOptions.push({value: element.name, name: element.name})
      });
      sessionStorage["forms"] = JSON.stringify(selectOptions);
    }) 

   }
   getAllAutoCampaign=()=>{
    axios.get(`${Config.API_URL}workflows`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({campaigns: res.data},()=>{
        if(this.props.history.location.state != null && this.props.history.location.state != undefined){
          if(this.props.history.location.state.success != null && this.props.history.location.state.success !== undefined){
            this.props.history.replace({});
                  this.addNotification();
          }
        }
      })
    }).catch(error => {
      console.log(error)
    }) 
   
  
   }

   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Campaign",
      message: "Create New Workflow Successfully!",
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
   getAllCampaign=()=>{
    var selectOptions = [
    ];
    axios.get(`${Config.API_URL}campaigns`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      // this.setState({campaigns: res.data});
      sessionStorage.removeItem("campaigns");
      res.data.forEach(element => {
        if(element.automation == false){
          selectOptions.push({value: element.name, name: element.name})
        }
      });
      sessionStorage["campaigns"] = JSON.stringify(selectOptions);
    }) 
  
   }
   getAllAppointment=()=>{
    var selectOptions = [
    ];
    axios.get(`${Config.API_URL}appointments`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      sessionStorage.removeItem("appointments");
      console.log(res.data)
      this.setState({appointments: res.data});
      res.data.forEach(element => {
        if(element.automation == false){
          selectOptions.push({value: element.name, name: element.name})
        }
      });
      sessionStorage["appointments"] = JSON.stringify(selectOptions);
    }) 
  
   }
   loadStatitic=()=>{
    axios.get(`${Config.API_URL}campaign/statistic`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
    }).catch(function (error) {
      });
  }
  loadStatiticApp=()=>{
    axios.get(`${Config.API_URL}appointment/statistic`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
    }).catch(function (error) {
      });
  }

	
  render(){
    var listCampaigns = this.state.campaigns
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Workflows
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                
                              <a class="btn_create_contact" href="#popup">Create Workflow</a>
                             <CampaignPopUp automation="automation"/>
                           
                        </div>
                    </header>
                    {/* fiLTER */}
                    
                    <section>
                    {/* end filter */}
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Campaign Lists</h4>
                        <p className="md_tablet_p">Here is the list of your Campaigns </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="table1 table-striped table-hover">
                            <thead className=" ">
                            <tr className=" ">
                                <th className=" " scope="col">Campaign Name</th>
                                <th className=" " scope="col">Status</th>
                                <th className=" " scope="col">Start on</th>
                                {/* <th className=" " scope="col">Opens</th>
                                <th className=" " scope="col">Unsubcribe</th> */}
                                <th className=" " scope="col">Actions</th>
                            </tr>
                                
                            </thead>
                            <tbody>
                            {listCampaigns.map(list=>(
                                        <AutoRow
                                        id={list.id}
                                        key={list.index}
                                        campaignName={list.status}
                                         status={list.name}
                                         model = {list.model}
                                         update={this.getAllAutoCampaign}
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
export default AutomationCampaigns;
