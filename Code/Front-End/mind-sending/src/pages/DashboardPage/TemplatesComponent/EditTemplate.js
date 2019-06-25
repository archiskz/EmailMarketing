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

class EditTemplate extends Component {
  constructor(props) {
    super(props);
    this.editor = null; 
    this.isComponentMounted = false;
    this.isEditorLoaded = false;
    this.state = {
      // content: {} 
      id: this.props.history.location.state.id,
      template: {
        nameTemplate: this.props.history.location.state.nameTemplate,
        content: this.props.history.location.state.content
      }
      ,
      content: JSON.parse(this.props.history.location.state.content) ,
          html: "",
      visible: false,
    };
    this.onLoad = this.onLoad.bind(this);
    this.exportHtml = this.exportHtml.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
  }

   componentDidMount(){
     console.log(this.state.template)
    this.isComponentMounted = true; 
    this.loadTemplate(); 
   }	

   onLoad = () => { this.isEditorLoaded = true; this.loadTemplate(); }

   loadTemplate = () => { 
     if (!this.isEditorLoaded || !this.isComponentMounted) 
     return; 
     this.editor.loadDesign(JSON.parse(this.state.template.content)) }
   
   
  render(){
    
     return (
      <div>
       <div className="fullscreen"></div>

       <div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Create Campaign</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
    </span>
    <span class="toolbar-css__send-container___AbB6n">
        <a onClick={()=>this.saveTemplate()} icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Save Template
        </a>
    </span>
    </div>
    <EmailEditor
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
      minHeight="780px"
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

  saveTemplate(){
  this.exportHtml();
  console.log(this.state.template)
  axios.put(`${Config.API_URL}${this.state.id}`,this.state.template)
  .then(res => {
    console.log("contact ID: " + res.data)
    // this.setState({count: res.data})
   }).catch(function (error) {
    console.log(error);
  });
  this.closeModal();
  }

   exportHtml=()=>{
  this.editor.exportHtml(data => {
    const { design, html } = data
     this.setState({
      content: JSON.stringify(design),
      template:{
        nameTemplate:"may ngu a",
        content: JSON.stringify(design)
      }
    });
    console.log(this.state.template)
  })
}
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
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(EditTemplate));
