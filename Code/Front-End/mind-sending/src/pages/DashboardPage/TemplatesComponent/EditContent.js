import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmailEditor from 'react-email-editor';
import returnic from './../../../access/img/return_icon.png';
import {Link} from 'react-router-dom';
import sample from './../../../sample.json';
import TemplateNameModal from '../../../components/modals/TemplateNameModal';
import * as actions from '../../../actions/index';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { withRouter } from "react-router";
import * as Config from '../../../constants/Config'
import { template } from '@babel/core';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { browserHistory } from 'react-router'

class EditContent extends Component {
  constructor(props) {
    super(props);
    this.editor = null; 
    this.isComponentMounted = false;
    this.isEditorLoaded = false;
    this.state = {
      // content: {} 
      id: this.props.history.location.state.id,
      content: "" ,
          html: "",
      visible: false,
      newCampaign:{
        bodyJson: "string",
        content: "string",
        id: this.props.history.location.state.campaignId,
      } 
    };
    this.onLoad = this.onLoad.bind(this);
    // this.exportHtml = this.exportHtml.bind(this)
    this.saveCampaign = this.saveCampaign.bind(this)
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Template",
      message: "Edit Template Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
   
  }
   componentDidMount(){
    this.isComponentMounted = true; 
    this.loadTemplate(); 
   }	

   onLoad = () => { this.isEditorLoaded = true; this.loadTemplate(); }

   loadTemplate = () => { 
     if (!this.isEditorLoaded || !this.isComponentMounted) 
     return; 
     var id = this.props.history.location.state.id
     var self = this
     axios.get(`${Config.API_URL}${id}`)
      .then(res => {
        self.editor.loadDesign(JSON.parse(res.data.contentJson))
        console.log(res.data)        
       }).catch(function (error) {
        console.log(error.response.data);
      });
      }
   
   
  render(){
    
     return (
      <div>
       <div className="fullscreen">
       <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
       </div>

       <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Edit Content</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
    </span>
    <span class="toolbar-css__send-container___AbB6n">
        <a onClick={()=>this.saveCampaign()} icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Save Campaign
        </a>
    </span>
    </div>
    <EmailEditor
    displayMode= {'email'}
      projectId={1071}
      onLoad={this.onLoad}
      options={{
          customCSS: [
            `
              #u_body{
                background-color: white !important;
              }
            `,
            `
              .blockbuilder-layer-control.blockbuilder-delete{
                display: none !important;
                invisibility: hidden !important;
              }
            `,
            `
              .blockbuilder-branding {
                display: none !important;
              }
            `,
            `
            .tab-content {
              height: 100% !important;
              background-color: white !important;
            }
            `,
            `#u_row_11 {
              display: none;
              visibility: hidden
            }`
            
          ],
        }}
      minHeight="700px"
        ref={editor => this.editor = editor}
      />
      
    </div>
    
    );
  }
// handleChange = (event)=>{
//   const target = event.target;
//   const value = target.value;
//   console.log(value);
//   const name = target.name;
//   this.setState({
//     template: {
//       ...this.state.template,
//       nameTemplate: value
//     }
//   })
  
 
// }

  saveCampaign(){
  // this.exportHtml();
  this.editor.exportHtml(data => {
    const { design, html } = data
      this.setState({
      newCampaign:{
        ...this.state.newCampaign,
        bodyJson: JSON.stringify(design),
        content: html
      }
    }, ()=> {
      console.log(`${Config.API_URL}campaign/edit`)
      console.log(this.state.newCampaign)
      axios.put(`${Config.API_URL}campaign/edit`,this.state.newCampaign)
      .then(res => {
        console.log(res.data)
        this.addNotification()
        
       }).catch(function (error) {
        console.log(error.response.data);
      });
      this.closeModal();
    });
    
  })
  
  }

  //  exportHtml=()=>{
  // )

openModal() {
  this.setState({
      visible : true
  });
  this.exportHtml();
}

closeModal() {
  this.setState({
      visible : false
  });
}



}

const mapStateToProps = (state) => {
  return {
    isDisplayPreviewModal: state.isDisplayPreviewModal
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
        onCloseModal: ()=> {
          dispatch(actions.closePreviewTemplate())
        }
    };
  };
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(EditContent));
