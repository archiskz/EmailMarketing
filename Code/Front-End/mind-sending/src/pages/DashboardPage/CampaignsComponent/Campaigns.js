import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Config from '../../../constants/Config';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CreateCampaign from './CreateCampaigns';
import CampaignPopUp from './../../../components//modals/CampaignPopUp.js';
import CampaignRow from './../../../components/row/CampaignRow'

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Campaigns extends Component {
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
    if(this.props.history.location.state != null && this.props.history.location.state != undefined){
      if(this.props.history.location.state.success != null && this.props.history.location.state.success != undefined){
        this.addNotification(this.props.history.location.state.success)
        this.props.history.replace({});
      }
    }
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllCampaign() )
   }
   getAllCampaign=()=>{
    var selectOptions = [
    ];
    axios.get(`${Config.API_URL}campaigns`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({campaigns: res.data});
      res.data.forEach(element => {
        console.log(element.name)
        selectOptions.push({value: element.name, name: element.name})
      });
      console.log(selectOptions)
      sessionStorage["campaigns"] = JSON.stringify(selectOptions);
    }) 
    console.log(this.state.campaigns)

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
	
  render(){
    var listCampaigns = this.state.campaigns
     return (
	  <div className = "" >
    <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">Campaigns
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                
                              <a class="btn_create_contact" href="#popup">Create campaign</a>
                             <CampaignPopUp />
                           
                        </div>
                    </header>
                    {/* fiLTER */}
                    {/* <section className="row">
                      <div className="segment-filter">
                      <span className="filter-header">
                        Filter Campaigns
                      </span>
                        <div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="input-select-wrap is-required">
                                <label
                                  className="input-select-label"
                                  htmlFor="select2-field-06"
                                >
                                  Campaign Name<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                                </label>
                                
                                  <input type="text" className="inputContact" placeholder=""/>                                       
                               
                                <div />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="input-select-wrap is-required">
                                <label
                                  className="input-select-label"
                                  htmlFor="select2-operator-07"
                                >
                                  Status<div className="input-info-tooltip select2-css__select-2-tooltip___3jy71" />
                                </label>
                                <select
                                className="inputContact"
                                  id="select2-operator-07"
                                  name="operator-0"
                                  data-index={0}
                                  tabIndex={-1}
                                  aria-hidden="true"
                                >
                                  <option value="eq">All</option>
                                  <option value="ne">Sent</option>
                                  <option value="contains">
                                    Draft
                                  </option>
                                  <option value="empty">In Progress</option>
                                  <option value="not_empty">
                                    Canceled
                                  </option>
                                  <option value="not_empty">
                                    Scheduled
                                  </option>
                                </select>
                                  <div />
                              </div>
                            </div>
                            <div data-role="add" className="btn-create-segment btn-clear">
                          Clear  
                        </div>
                          </div>
                        </div>
                        
                      </div> 
                     </section> */}
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
                                <th className=" " scope="col">Status</th>
                                <th className=" " scope="col">Campaign Name</th>
                                <th className=" " scope="col">Delivery</th>
                                <th className=" " scope="col">Opens</th>
                                <th className=" " scope="col">Clicks</th>
                                <th className=" " scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listCampaigns.map(list=>(
                                        <CampaignRow
                                        id={list.id}
                                        key={list.index}
                                        status={list.status}
                                         campaignName={list.name}
                                         bodyJson = {list.bodyJson}
                                         click={list.clickRate}
                                         open={list.openRate}
                                         delivery={list.delivery}
                                         updateList={this.getAllCampaign}
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
export default Campaigns;
