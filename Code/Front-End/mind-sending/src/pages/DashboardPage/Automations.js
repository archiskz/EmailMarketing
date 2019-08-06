import React, { Component } from 'react';
import BpmnModelerComponent from './../../components/bpmn.modeler.component';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { withRouter } from "react-router";
import axios from 'axios';

import * as Config from './../../constants/Config';
class Automations extends Component {
componentDidMount(){
  console.log(this.props.history.location.state.gcWorkflowDTOS)
  const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=>{
      this.getAllCampaign();
      this.getAllAppointment()
    } )

  
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
 getAllAppointment=()=>{
  var selectOptions = [
  ];
  axios.get(`${Config.API_URL}appointments`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
  .then(res => {
    console.log(res.data);
    this.setState({appointments: res.data});
    res.data.forEach(element => {
      console.log(element.name)
      selectOptions.push({value: element.name, name: element.name})
    });
    console.log(selectOptions)
    sessionStorage["appointments"] = JSON.stringify(selectOptions);
  }) 
  console.log(this.state.campaigns)

 }
  render() {
    return (
      <div>
        <BpmnModelerComponent group={this.props.history.location.state.gcWorkflowDTOS} automationName={this.props.history.location.state.campaignName} />
      </div>  
    );
  }
}

export default withRouter(Automations);
