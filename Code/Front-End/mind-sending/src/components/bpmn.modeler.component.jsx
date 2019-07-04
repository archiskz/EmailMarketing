import React, { Component }  from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { emptyBpmn } from '../assets/empty.bpmn';
// import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import customModule from './../custom';
import qaExtension from './../resources/qa'
class BpmnModelerComponent extends Component {
    
    modeler = null;

// you may hook into any of the following events

    
    componentDidMount = () => {
        this.modeler = new BpmnModeler({
            container: '#bpmnview',
            additionalModules: [
                customModule
            ],
            moddleExtensions: {
                qa: qaExtension
            }
        });

        this.newBpmnDiagram();
    }

//
//


//
////



onClickToExport = () =>{
        this.modeler.saveXML({ format: true }, (err: any, xml: any) => {
    if (err) {
      return console.error('could not export BPMN 2.0 diagram xml', err);
    }
    const xmlClone = xml;

    console.log(xmlClone);
    });

        this.modeler.on('element.click', function(event) {
  var element = event.element;
  //  console.log(element);
  // console.log(element.id);
  alert(element.id);
  // the element was changed by the user
});

    }

    newBpmnDiagram = () => {
        this.openBpmnDiagram(emptyBpmn);
    }

    openBpmnDiagram = (xml) => {
        this.modeler.importXML(xml, (error) => {
            if (error) {
                return console.log('fail import xml');
            }

            var canvas = this.modeler.get('canvas');

            canvas.zoom('fit-viewport');
        });
    }

    render = () => {
        return(
            <div id="bpmncontainer">
                <div id="propview" style={{ width: '25%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
                <div id="bpmnview" style={{ width: '75%', height: '98vh', float: 'right' }}></div>
                <button type="button" className="btn btn-default" onClick={this.onClickToExport}>button</button>
            </div>
        )
    }
}

export default BpmnModelerComponent;
