import React, { Component }  from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { emptyBpmn } from '../assets/empty.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import customModule from '../custom/palete';
import qaExtension from './../resources/qa'
import propertiesProviderModule from '../custom/provider'
import magicModdleDescriptor from '../custom/descriptors/magic.json';
import BpmnModdle from 'bpmn-moddle';
class BpmnModelerComponent extends Component {

    modeler = null;

// you may hook into any of the following events


    componentDidMount = () => {
        this.modeler = new BpmnModeler({
            container: '#bpmnview',
            propertiesPanel: {
                parent: '#propview'
            },
            additionalModules: [
                customModule,
                propertiesPanelModule,
                propertiesProviderModule
            ],
            moddleExtensions: {
                qa: qaExtension,
                magic: magicModdleDescriptor
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
    this.modeler.on('element.click', function(event) {
        var element = event.element;
        //  console.log(element);
        // console.log(element.id);
        console.log(element.id);
        var moddle = new BpmnModdle();
        moddle.fromXML(xmlClone, function(err, definitions) {

          // update id attribute
          definitions.set('id', 'NEW ID');

          // add a root element
          var bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
          definitions.get('rootElements').push(bpmnProcess);

          moddle.toXML(definitions, function(err, xmlStrUpdated) {
              console.log("Hello")

            // xmlStrUpdated contains new id and the added process

          });

        });


        // the element was changed by the user
      });
    console.log(xmlClone);
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
