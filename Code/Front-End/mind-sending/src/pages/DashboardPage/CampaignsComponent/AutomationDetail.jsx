import React, { Component }  from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { emptyBpmn } from '../../../assets/empty.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import customModule from '../../../custom/palete';
import qaExtension from './../../../resources/qa'
import propertiesProviderModule from '../../../custom/provider'
import customRulesModule from '../../../custom/custom-rules'
import magicModdleDescriptor from '../../../custom/descriptors/magic.json';
import BpmnModdle from 'bpmn-moddle';
import KeyboardModule from '../../../custom/keyboard';
import axios from 'axios';
import * as Config from '../../../constants/Config'
import { withRouter } from "react-router";
import AutoRow from './../../../components/row/AutoRow'

import Modal from 'react-awesome-modal';
class BpmnModelerComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyboard: false,
            bpmn : {
              type: "string",
              workflowName: this.props.automationName,
              wtWorkflowDTOS: "",
              gcWorkflowDTOS: this.props.group
            },
            workflowDTO:{ 
              appointment: {
              account_id: 0,
              appointmentGroupContacts: [
                {
                  appointmentSubcribers: [
                    {
                      bounce: true,
                      confirmation: true,
                      createdTime: "",
                      delivery: true,
                      id: 0,
                      messageId: "",
                      opened: true,
                      send: true,
                      spam: true,
                      subcriberEmail: "",
                    updatedTime: ""
                    }
                  ],
                  createdTime: "",
                  id: 0,
                  updatedTime: ""
                }
              ],
              automation: true,
              body: "",
              bodyJson: "",
              clickRate: "",
              createdTime: "",
              fromMail: "",
              id: 0,
              messageId: "",
              name: "",
              openRate: "",
              sender: "",
              status: "",
              subject: "",
              time: "",
              token: "",
              updatedTime: ""
            },
            campaign: {
              account_id: 0,
              automation: true,
              bodyJson: "",
              bounce: "",
              campaignGroupContacts: [
                {
                  campaignSubcribers: [
                    {
                      bounce: true,
                      comfirmation: true,
                      createdTime: "",
                      delivery: true,
                      id: 0,
                      messageId: "",
                      opened: true,
                      send: true,
                      spam: true,
                      subcriberEmail: "",
                      updatedTime: ""
                    }
                  ],
                  createdTime: "",
                  id: 0,
                  updatedTime: ""
                }
              ],
              clickRate: "",
              content: "",
              createdTime: "",
              delivery: "",
              fromMail: "",
              id: 0,
              name: "",
              openRate: "",
              request: "",
              sender: "",
              spamRate: "",
              status: "",
              subject: "",
              timeStart: "",
              type: "",
              updatedTime: ""
            },
            subcriberInTask: [
              ""
            ],
            subcriersComing: [
              ""
            ]},
            auth_token:"",
            contacts:[],
            inTask: false,
            inComing: false,
            isModalVisible:false
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }

    modeler = null;

// you may hook into any of the following events


    componentDidMount = () => {
      console.log(this.props.history.location.state.model)
        document.addEventListener('mousedown', this.handleClickOutside);
        this.modeler = new BpmnModeler({
            container: '#bpmnview',
            propertiesPanel: {
            },
            additionalModules: [
                // customModule,
                // propertiesPanelModule,
                // propertiesProviderModule,
                customRulesModule
            ],
            moddleExtensions: {
                qa: qaExtension,
                magic: magicModdleDescriptor
            },
            keyboard: {bindTo: document}
        });
        var eventBus = this.modeler.get('eventBus');

// you may hook into any of the following events
var events = [
  'element.click',
];
var self = this;
events.forEach(function(event) {

  eventBus.on(event, function(e) {
    // e.element = the model element
    // e.gfx = the graphical element

    console.log(e.element.id);
    self.getInfoATask(e.element.id)

  });
});

        this.newBpmnDiagram();
    }

    getInfoATask(shapeId){
      axios.get(`${Config.API_URL}workflow/view?shapeId=${shapeId}&workflowId=${this.props.history.location.state.id}`,
       this.state.updateList,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data)
          // this.getAllListContact();
          this.setState({
            workflowDTO: res.data
          })
          // this.openModal();
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    openModal(){
      this.setState({
        isModalVisible: true
      })
    }
    closeModal(){
      this.setState({
        isModalVisible: false
      })
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        const appState = JSON.parse(sessionStorage.getItem('appState'));
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
      console.log("hello")
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
      });
     }
      )
    });


    }

    newBpmnDiagram = () => {
        this.openBpmnDiagram(this.props.history.location.state.model);
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
    renderTask(){
     if(this.state.inTask == true){
       var array = new Array;
       array = this.state.workflowDTO.subcriberInTask
       var x = "No contacts pass this task"
      if(array != null && array.length != 0){
        x = array.toString();
        x =  x.split(',').join("</br>")
      }
       document.getElementById("workflow-task").innerHTML = x;
     } else if (this.state.inComing == true){
      array = this.state.workflowDTO.subcriersComing
      var x = "No contacts incoming"
      if(array != null){
        x = array.toString();
        x =  x.split(',').join('</br>')
      }
       document.getElementById("workflow-task").innerHTML = x;
     } 
    }
    
    getCompleted=()=>{
      console.log("completed")
      this.setState({
        inTask: true,
            inComing: false,
            isModalVisible: true
      },()=>this.renderTask())
    }
    getInComing=()=>{
      console.log("incoming")
      this.setState({
        inTask: false,
            inComing: true,
            isModalVisible:true
      },()=>this.renderTask())
    }

    render = () => {
      var contacts = this.state.workflowDTO
        return(
            <div id="bpmncontainer">
            <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Workflow: </strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
    </span>
</div>           
              
                <div id="propview"  style={{marginTop:"30px", width: '30%', height: 'auto', float: 'right', maxHeight: '98vh' }}>
                <div style={{marginTop:"-20px", width:"100%",height:"70px", backgroundColor:"#2e3544", color:"white" }}>
                  <h3 className={`${this.state.workflowDTO.campaign == null ? 'activeText' : ''}`} style={{ "padding":"10px", marginBottom:"30px", backgroundColor:"#2e3544", color:"white" }}>Campaign: {this.state.workflowDTO.campaign != null ? this.state.workflowDTO.campaign.name.substring(0,(this.state.workflowDTO.campaign.name.length - 36)) : ''}</h3>
                  <h3 className={`${this.state.workflowDTO.campaign == null ? '' : 'activeText'}`} style={{ "padding":"10px", marginBottom:"30px", backgroundColor:"#2e3544", color:"white" }}>Appointment: {this.state.workflowDTO.appointment != null ? this.state.workflowDTO.appointment.name.substring(0,(this.state.workflowDTO.appointment.name.length - 36)) : ''}</h3>
                </div>
                <div className={`${this.state.workflowDTO.campaign == null && this.state.workflowDTO.appointment == null  ? 'activeText' : ''}`} style={{"padding":"10px" }}> 
                <h4>Clicked: {this.state.workflowDTO.campaign != null ? this.state.workflowDTO.campaign.clickRate : ""} 
                {this.state.workflowDTO.appointment != null ? this.state.workflowDTO.appointment.clickRate : ""}
                </h4>
                <h4>Opened: { this.state.workflowDTO.campaign != null ? this.state.workflowDTO.campaign.openRate:"" }
                { this.state.workflowDTO.appointment != null ? this.state.workflowDTO.appointment.openRate : ""}
                </h4>
                  <span>Contacts have completed: {this.state.workflowDTO.subcriberInTask != null ? this.state.workflowDTO.subcriberInTask.length : '0'} contacts</span> <a onClick={this.getCompleted} style={{cursor:"pointer" }}> View</a>
                  <br/>
                  <span>Contacts incoming: {this.state.workflowDTO.subcriersComing != null ? this.state.workflowDTO.subcriersComing.length : '0'} contacts</span> <a onClick={this.getInComing} style={{cursor:"pointer" }}> View</a>
                
                </div>  
                  
                </div>
                <div id="bpmnview" style={{ width: '70%', height: '98vh', float: 'right' }}>
                  
                </div>
                
                <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.isModalVisible} width="440" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      <div class="modal-header"> 
        <h4 class="modal-title">{this.state.inTask ? 'Contacts have passed through' : 'Contacts incoming'} </h4>	
           <button type="button" onClick={()=>this.closeModal()} class="close" data-dismiss="modal" aria-hidden="true">×</button>
             </div>
                       <div id="workflow-task" class="modal-body">
                       
                       </div>
                       {/* <div class="modal-footer">
                         <button type="button" onClick={()=>this.closeModal()} class="btn btn-info" >Cancel</button>
                        
                       </div> */}
    </Modal>
            </div>
        )
    }
}

export default withRouter(BpmnModelerComponent);
