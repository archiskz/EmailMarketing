import React, { Component } from 'react';
import BpmnModelerComponent from './../../components/bpmn.modeler.component';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { withRouter } from "react-router";
class Automations extends Component {
componentDidMount(){

}
  render() {
    return (
      <div>
        <BpmnModelerComponent automationName={this.props.history.location.state.campaignName} />
      </div>
    );
  }
}

export default withRouter(Automations);
