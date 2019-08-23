import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Config from '../../constants/Config';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,  FunnelSeries, Inject, AccumulationTooltip, AccumulationDataLabel}
from'@syncfusion/ej2-react-charts';
import FunelChart from './../../components/chart/FunelChart'
import DonutChart from './../../components/chart/DonutChart'
import axios from 'axios';
class SubDashboard extends Component {

  data1: any[] = [
    { x: "Clicked", y: 20, text: "Clicked" },
    { x: "Opened", y: 50, text: "Opened" },
     { x: "Delivery", y: 98, text: "Delivery" },
     { x: "Request", y: 100, text: "Request" }
    ];
  

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            latestContact:[],
            latestGroup:[],
            latestCampaign:{createdTime:""},
            contactStatitic:{},
            data1:[
              ],
              dataPie:[]
        };
    }
componentDidMount(){
  const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> { 
      this.getLatestContact()
      this.getContactByType()
      this.loadStatitic()
      this.getLatestCampaign()
      this.getLatestGroup()
      this.getSubcriberStatitic()
    } )
}

loadStatitic=()=>{
  axios.get(`${Config.API_URL}campaign/statistic`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
  .then(res => {
  }).catch(function (error) {
    });
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
    getContactByType=()=>{

      var self = this
      const allCountries = [{}];
     axios.get(`${Config.API_URL}subcriber/dashboard`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
     .then(response => {
       var total = response.data.level1 + response.data.level2 + response.data.level3 + response.data.level4 + response.data.level5
       var level1 = Math.round((response.data.level1*100)/total) 
       var level2 =  Math.round((response.data.level2*100)/total) 
       var level3 =  Math.round((response.data.level3*100)/total) 
       var level4 =  Math.round((response.data.level4*100)/total) 
       var level5 =  Math.round((response.data.level5*100)/total) 
       self.setState({
        dataPie:[{ x: 'Bronze', y: level1, text: `${level1}%` }, { x: 'Silver', y: level2, text: `${level2}%` },
              { x: 'Gold', y: level3, text: `${level3}%` }, { x: 'Planinum', y: level4, text: `${level4}%` },
              { x: 'Diamond', y: level5, text: `${level5}%` }]
       },()=>console.log(self.state.data1));
     })
     .catch(error => {
       console.log(error);
     });
    }

    getLatestCampaign=()=>{
      
      var self = this
      const allCountries = [{}];
     axios.get(`${Config.API_URL}campaign/dashboard`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
     .then(response => {
       self.setState({
        latestCampaign: response.data,
        data1:[
          { x: "Clicked", y: response.data.click, text: "Clicked" },
                  { x: "Opened", y: response.data.open, text: "Opened" },
                   { x: "Delivery", y: response.data.delivery, text: "Delivery" },
                   { x: "Request", y: response.data.request, text: "Request" }]
       },()=>console.log(self.state.data1));
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
            {/* CHART */}
            {/* {this.state.data1 == null || this.state.data1.length <= 0 ?  null : 
              <FunelChart data1={this.state.data1} />
            } */}


            </div>
                  </div>
        <div className="dashboard_row">
        <div className="col-12 col-md-12 col-lg-5 col-xl-4 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
        
            <div className="collapse show">
            <div className="panel_content">
            <div  className= "dashboard_table_responsive">
            {this.state.dataPie == null || this.state.dataPie.length <= 0 ?  null : 
              <DonutChart data1={this.state.dataPie} />   
            }
           
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
                    <td>{index+1}</td>
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
                    <td>{index+1}</td>
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
    load(args) {
      console.log(args)
      // let selectedTheme = location.hash.split('/')[1];
     let selectedTheme = 'Material'
      args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
      if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
          args.accumulation.series[0].width = '80%';
          args.accumulation.series[0].height = '70%';
      }
  }
  onChartLoad(args) {
    document.getElementById('funnel-chart').setAttribute('title', '');
}
onChartResized(args) {
  let bounds = document.getElementById('funnel-chart').getBoundingClientRect();
  if (bounds.width < bounds.height) {
      args.accumulation.series[0].width = '80%';
      args.accumulation.series[0].height = '70%';
  }
  else {
      args.accumulation.series[0].width = '60%';
      args.accumulation.series[0].height = '80%';
  }
}
}
export default SubDashboard;