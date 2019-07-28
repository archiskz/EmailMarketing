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
import CampaignRow from './../../components/row/CampaignRow'

class AutomationCampaigns extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: true,
       dropdown_visible: false,
       campaigns: [],
       auth_token:""
     };
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
    },()=> this.getAllCampaign() )
   }
   getAllCampaign=()=>{
    var selectOptions = [
    ];
    axios.get(`${Config.API_URL}workflows`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({campaigns: res.data});
      // localStorage["campaigns"] = JSON.stringify(selectOptions);
    }).catch(function (error) {
      console.log(error);
      // if(error != null ){
      //   errors = true
      // }
    }); 
    console.log(this.state.campaigns)

   }


	
  render(){
    var listCampaigns = this.state.campaigns
     return (
	  <div className = "" >
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">Automation Campaigns
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                
                              <a class="btn_create_contact" href="#popup">Create Automation</a>
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
                                <th className=" " scope="col">Status</th>
                                <th className=" " scope="col">Campaign Name</th>
                                <th className=" " scope="col">Clicks</th>
                                <th className=" " scope="col">Opens</th>
                                <th className=" " scope="col">Unsubcribe</th>
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
