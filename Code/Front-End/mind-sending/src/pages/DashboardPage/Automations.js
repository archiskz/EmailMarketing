import React, { Component } from 'react';
import BpmnModelerComponent from './../../components/bpmn.modeler.component';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { withRouter } from "react-router";
class Automations extends Component {
componentDidMount(){
  console.log(this.props.history.location.state.gcWorkflowDTOS)
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
