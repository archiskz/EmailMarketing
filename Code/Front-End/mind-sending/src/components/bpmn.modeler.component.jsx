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
import customRulesModule from '../custom/custom-rules'
import magicModdleDescriptor from '../custom/descriptors/magic.json';
import BpmnModdle from 'bpmn-moddle';
import KeyboardModule from '../custom/keyboard';
import axios from 'axios';
import * as Config from '../constants/Config'
class BpmnModelerComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyboard: false,
            bpmn : {
              type: "string",
              workflowName: this.props.automationName,
              wtWorkflowDTOS: ""
            },
            auth_token:""
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }

    modeler = null;

// you may hook into any of the following events


    componentDidMount = () => {
      console.log(this.props.automationName);
        document.addEventListener('mousedown', this.handleClickOutside);
        this.modeler = new BpmnModeler({
            container: '#bpmnview',
            propertiesPanel: {
                parent: '#propview'
            },
            additionalModules: [
                customModule,
                propertiesPanelModule,
                propertiesProviderModule,
                customRulesModule
            ],
            moddleExtensions: {
                qa: qaExtension,
                magic: magicModdleDescriptor
            },
            keyboard: {bindTo: document}
        });

        this.newBpmnDiagram();
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    });
      }

      setWrapperRef(node) {
        this.wrapperRef = node;
      }
    
      /**
       * Alert if clicked on outside of element
       */
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log("halu")
          this.setState({
              keyboard: false
          },()=>console.log(this.state.keyboard))
        }
      }

     toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
          }
        }
      }

      openKeyboard=()=>{
          this.setState({
              keyboard: true
          })
      }



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
    this.setState({
      bpmn: {
        ...this.state.bpmn,
        wtWorkflowDTOS: xmlClone
      }
    },
    ()=>{
      console.log(this.state.bpmn)
      axios.post(`${Config.API_URL}workflow/create`,this.state.bpmn,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then(res => {
        console.log("contact ID: " + res.data)
        // this.setState({count: res.data})
       }).catch(function (error) {
        console.log(error);
      }); }
      )
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

    saveBpmn(){

    }

    render = () => {
        return(
            <div id="bpmncontainer">
            <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Export</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
    </span>
    <span class="toolbar-css__send-container___AbB6n">
        <a onClick={this.onClickToExport}  icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Save Design
        </a>
    </span>
</div>           
            <div  className={"io-dialog keybindings-dialog open " + (!this.state.keyboard ? " displayFalse" : "") } jswidget="keybindings-dialog">
            <div ref={this.setWrapperRef} class="content bindings-default">
  <h1>Keyboard Shortcuts</h1>
  <table>
    <tbody>
      <tr>
        <td>Undo</td>
        <td class="binding"><code>ctrl + Z</code></td>
      </tr>
      <tr>
        <td>Redo</td>
        <td class="binding"><code>ctrl + Y</code></td>
      </tr>
      <tr>
        <td>Select All</td>
        <td class="binding"><code>ctrl + A</code></td>
      </tr>
      <tr>
        <td>Scrolling</td>
        <td class="binding"><code>ctrl + Scrolling</code></td>
      </tr>
      <tr>
        <td>Direct Editing</td>
        <td class="binding"><code>E</code></td>
      </tr>
      <tr>
        <td>Hand Tool</td>
        <td class="binding"><code>H</code></td>
      </tr>
      <tr>
        <td>Lasso Tool</td>
        <td class="binding"><code>L</code></td>
      </tr>
      <tr>
        <td>Space Tool</td>
        <td class="binding"><code>S</code></td>
      </tr>
    </tbody>
  </table>
</div>
            </div>
           <div class="io-editing-tools" jswidget="editing-tools" style={{"display":"block","width":"100px"}}>
                    <ul class="io-control-list io-horizontal">
                    <li class="io-control">
                        <button title="Toggle keyboard shortcuts overlay" onClick={this.toggleFullScreen} jsaction="click:bio.showKeyboard">
                        <img src="https://img.icons8.com/ios/36/000000/full-screen.png"></img>
                        </button>
                    </li>
                    <li class="io-control">
                        <button title="Toggle Fullscreen" onClick={this.openKeyboard}  jsaction="click:bio.toggleFullscreen">
                        <img src="https://img.icons8.com/windows/36/000000/keyboard.png"></img>
                        </button>
                    </li>
                    </ul>
                </div>
                <div id="propview" style={{ width: '25%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
                <div id="bpmnview" style={{ width: '75%', height: '98vh', float: 'right' }}></div>
                {/* <button type="button" className="btn btn-default" onClick={this.onClickToExport}>button</button> */}
            </div>
        )
    }
}

export default BpmnModelerComponent;
