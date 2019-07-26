import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Config from '../../../constants/Config';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";


import CampaignRow from './../../../components/row/CampaignRow'

class EmbeddedForms extends Component {
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
    axios.get(`${Config.API_URL}campaigns`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({campaigns: res.data});
      res.data.forEach(element => {
        console.log(element.name)
        selectOptions.push({value: element.name, name: element.name})
      });
      console.log(selectOptions)
      localStorage["campaigns"] = JSON.stringify(selectOptions);
    }) 
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
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col">Form name</th>
                                <th className="md_tablet6_th" scope="col">Create On</th>
                                <th className="md_tablet6_th" scope="col">Group Contact</th>
                                <th className="md_tablet6_th" scope="col">Status</th>
                                {/* <th className="md_tablet6_th" scope="col">Unsubcribe</th>
                                <th className="md_tablet6_th" scope="col">Actions</th> */}
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
export default EmbeddedForms;
