import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Config from '../../constants/Config';
import axios from 'axios';
class SubDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            latestContact:[],
            latestGroup:[],
            latestCampaign:{createdTime:""},
            contactStatitic:{}
        };
    }
componentDidMount(){
  const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> { 
      this.getLatestContact()
      this.getLatestCampaign()
      this.getLatestGroup()
      this.getSubcriberStatitic()
    } )
}

    getLatestContact=()=>{
      const allCountries = [{}];
     axios.get(`${Config.API_URL}subcriber/latest`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
     .then(response => {
       this.setState({
        latestContact: response.data
       });
     })
     .catch(error => {
       console.log(error);
     });
    }

    getLatestCampaign=()=>{
      const allCountries = [{}];
     axios.get(`${Config.API_URL}campaign/dashboard`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
     .then(response => {
       this.setState({
        latestCampaign: response.data
       });
     })
     .catch(error => {
       console.log(error);
     });
    }
    getLatestGroup=()=>{
     axios.get(`${Config.API_URL}groupContact/latest`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
     .then(response => {
       this.setState({
        latestGroup: response.data
       });
     })
     .catch(error => {
       console.log(error);
     });
    }
    getSubcriberStatitic=()=>{
      axios.get(`${Config.API_URL}subcriber/dashboard`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then(response => {
        this.setState({
         contactStatitic: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
     }
// renderFormatDate=(datetime)=>{
//   if(datetime != ""){
//     var days = Array();
//     days = datetime.split("T");
//    var time = days.pop();
//    var date = days.pop()
//    var dateString = date.split("-")
//    var timeString = time.split(":")
//    var datetimeFormat = dateString.pop() + "/" + dateString.pop()+"/" + dateString.pop();
//    datetimeFormat = datetimeFormat+ " " + timeString.shift() + ":" + timeString.shift()
//    return datetimeFormat;
//   }
//    return null
// }



    render() {
      var latestContacts = this.state.latestContact
      var latestGroups = this.state.latestGroup
      var latestCampaign = this.state.latestCampaign
      var latestRequest = new Intl.NumberFormat();
      var contactStatitic = this.state.contactStatitic
      var num = latestRequest.format(this.state.latestCampaign.request); 
        return (
            <div className = "" >
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
          
          <div className="sub_dashboard">
          <div>
           <h1>
                Hello Thắng Nguyễn!
            Here's your recent statistic.
            </h1>
            

            </div>    
          </div>    
                
                <ul className="sub_dashboard_panels stats">
                
                  <li className="sub_dashboard_request sub_dashboard_request" role="requests">
                  <h2>REQUESTS</h2>
                  <div className="primary">{num}</div>
                  </li>
                  <li className="sub_dashboard_delivered deliver" role="delivered">
                  <h2>DELIVERED</h2>
                  <div className="primary">{latestCampaign.delivery}</div>
                  {/* <div className="secondary">0</div> */}
                  </li>
                  <li className="sub_dashboard_opened open" role="Opened">
                  <h2>OPENED</h2>
                  <div className="primary">{latestCampaign.open}</div>
                  
                  </li>
                  
                  <li className="sub_dashboard_clicked clicked" role="clicked">
                  <h2>CLICKED</h2>
                  <div className="primary">{latestCampaign.click}</div>
                  
                  </li>
                  <li className="sub_dashboard_spam spam" role="spam">
                  <h2>SPAM </h2>
                  <div className="primary">{latestCampaign.spam}</div>
                  
                  </li>s
                  <li className="sub_dashboard_Unsubcribes unsubcribes" role="unsubcribes">
                  <h2>Bounces</h2>
                  <div className="primary">{latestCampaign.bounce}</div>
                 
                  </li>
                  </ul>
                  <div role="emailStatsGraph" class="sub_dashboard_graph_container2"> 
                  <div className="dashboard_panel__title">
            <h5 className="dashboard_bold_text2">Latest Campaign name: <span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            {latestCampaign.campaignName}
            </span>
            </h5>
            <h5 className="dashboard_bold_text2">Date created: <span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            {/* {this.renderFormatDate(latestCampaign.createdTime)} */}
            {latestCampaign.createdTime}
            </span>
            </h5>
            </div>
                  </div>
        <div className="dashboard_row">
        <div className="col-12 col-md-12 col-lg-5 col-xl-4 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="dashboard_panel__title">
            <h5 className="dashboard_bold-text">List contact by type<span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
            <h5 className="dashboard_subhead">Sort by all current contacts of user</h5>
            </div>
            <div className="collapse show">
            <div className="panel_content">
            <div className= "dashboard_table_responsive">
              <table className="dashboard_table">
              <thead>
              <tr>
              <th>Contact type</th>
             
              <th>Number of contact</th>
                </tr>
                  </thead>
              <tbody>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc">Beginner Contacts</p>
              </td>
              
              <td>{this.state.contactStatitic.beginerContact}</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc2">Intermediate Contacts</p>
              </td>
             
              <td>{this.state.contactStatitic.intermediateContact}</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc3">Advanced Contacts</p>
              </td>
              
              <td>{this.state.contactStatitic.advancedContact}</td>
              </tr>
              </tbody>    
              </table>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        
       <div className="col-12 col-md-12 col-lg-7 col-xl-8 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="dashboard_panel__title">
            <h5 className="dashboard_bold-text">LIST OF GROUPS HAVE BEEN RECENTLY CREATED<span class="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
            <h5 className="dashboard_subhead">Sort by all current groups of user</h5>
          </div>
          <div className="collapse show">
            <div className="panel_content">
            <div className= "dashboard_table_responsive">
              <table className="table">
              <thead>
              <tr>
              <th>#</th>
              <th>Group name</th>
              <th>Date created</th>
              <th>Number of contacts</th>
                </tr>
                  </thead>
              <tbody>
              {latestGroups.map((latestGroup,index)=>(
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{latestGroup.name}</td>
                    <td>{latestGroup.createdTime}</td>
                    <td>{latestGroup.groupContactSubcribers.length}</td>
                  </tr> 
                                    ))}
              
              </tbody>    
              </table>
            </div>
            </div>
            </div>
          </div>
          </div>
        </div>
        <div className="col-lg-12 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="">
            <h5 className="dashboard_bold-text2">List of contacts have been recently added<span class="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
              <div className="collapse show">
            <div className="panel_content">
            <div className= "">
              <table className="table">
              <thead>
              <tr>
              <th>#</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
                </tr>
                  </thead>
              <tbody>
              
              {latestContacts.map((latestContact,index)=>(
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{latestContact.email}</td>
                    <td>{latestContact.firstName}</td>
                    <td>{latestContact.lastName}</td>
                  </tr> 
                                    ))}
              </tbody>    
              </table>
            </div>
            </div>
            </div>
          </div>
          
          </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-5 col-xl-4 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <h2 className="dashboard_admin">Admin User Details</h2>
  <hr/>
  <dl className="dashboard_admin">
    <dt>Username</dt>
    <dd>Thắng Nguyễn</dd>
    <dt>Email Address</dt>
    <dd>thangnguyen15297@gmail.com</dd>
    <dt>Account IP Address</dt>
    <dd role="ips">
    
    </dd>
  </dl>
</div>
</div>





<div className="col-12 col-md-12 col-lg-7 col-xl-8 dashboar_top5">
<div className="dashboard_panel dashboard_card">
  <h2 className="dashboard_admin">Groups</h2>
  <hr/>
    <div role="noGroups">
      <p className="dashboard_admin">Use groups to give your recipients control over the types of emails they want to receive.
      </p>
      <p className="dashboard_admin">
        Allowing recipients to select from groups of emails they want to receive and opt out from others helps to increase recipient engagement, decrease spam reports, and improve sender reputation.
      </p>
      <p className="dashboard_admin"> 
        <Link class="sd_graph_admin_btn sd_graph_admin_btn_small primary "to="/dashboard/lists">Create Your Groups</Link>
      </p>
    </div>
</div>
</div>
        </div>         
       
       </div>
       
       </div>
       

           

           
            

        );
    }

}
export default SubDashboard;