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

class EditTemplate extends Component {
  constructor(props) {
    super(props);
    this.editor = null; 
    this.isComponentMounted = false;
    this.isEditorLoaded = false;
    this.state = {
      id: this.props.history.location.state.id,
      template: {
        id: this.props.history.location.state.id,
        nameTemplate: this.props.history.location.state.nameTemplate,
        contentJson: this.props.history.location.state.contentJson,
        contentHtml:""
      }
      ,
      content: JSON.parse(this.props.history.location.state.contentJson) ,
          html: "",
      visible: false,
      auth_token:""
    };
    this.onLoad = this.onLoad.bind(this);
    // this.exportHtml = this.exportHtml.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
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
    // this.props.history.goBack()
  }
   componentDidMount(){
     console.log(this.state.template)
    this.isComponentMounted = true; 
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.loadTemplate() )
    
   }	

   onLoad = () => { this.isEditorLoaded = true; this.loadTemplate(); }

   loadTemplate = () => { 
     if (!this.isEditorLoaded || !this.isComponentMounted) 
     return; 
     this.editor.loadDesign(JSON.parse(this.state.template.contentJson)) }
   
   
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
       <a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"40px","marginLeft":"10px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Edit Template</strong>
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
    displayMode= {'email'}
      projectId={1071}
      onLoad={this.onLoad}
      options={{
          customCSS: [
            `
              #u_body{
               
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
      minHeight="850px"
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
  // this.exportHtml();
  this.editor.exportHtml(data => {
    const { design, html } = data
      this.setState({
      content: JSON.stringify(design),
      template:{
        ...this.state.template,
        contentJson: JSON.stringify(design),
        contentHtml: html
      }
    }, ()=> {
      console.log(`${Config.API_URL}update`)
      axios.put(`${Config.API_URL}update`,this.state.template,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then(res => {
        console.log(res.data)
        this.goBack()
        this.addNotification();
        
        
       }).catch(function (error) {
        console.log(error.response.data);
      });
      this.closeModal();
    });
    
  })
  
  }
  goBack=()=>{
    this.props.history.goBack()
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
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(EditTemplate));
