import React, { Component } from 'react';
import BpmnModelerComponent from './../../components/bpmn.modeler.component';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

class Automations extends Component {
  render() {
    return (
      <div>
        <BpmnModelerComponent />
      </div>
    );
  }
}

export default Automations;
