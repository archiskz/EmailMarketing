import React, {Component} from 'react';

import {connect} from 'react-redux';
import PreviewModal from '../../../components/modals/PreviewModal';
import OneTemplate from '../../../components/OneTemplate';
import * as Config from '../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
class Templates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlImage: "",
      templates: [],
      modalIsOpen: false,
      visible: true,
      visibleAll: true,
      visibleCustom: false,
      visibleMs: false,
      auth_token:"",
      templateType:0
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getTemplateByType = this.getTemplateByType.bind(this);
    this.getAllTemplates = this.getAllTemplates.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});
    console.log(this.state.modalIsOpen)
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    if(this.props.history.location.state != null && this.props.history.location.state != undefined){
      if(this.props.history.location.state.success != null && this.props.history.location.state.success != undefined){
        this.addNotification(this.props.history.location.state.success)
        this.props.history.replace({});
      }
    }
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllTemplates() )
   }	

   addNotification=(title)=>{
    this.notificationDOMRef.current.addNotification({
      title: `${title}`,
      message: `${title} Success!`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
	
   getAllTemplates=()=>{
     this.setState({templateType:0})
    axios.get(`${Config.API_URL}template`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({templates: res.data});
    }).catch(error =>{
      console.log(error)
    }) 
   }

   getTemplateByType(type){
      if(type == "custom"){
        this.setState({templateType:1})
        axios.get(`${Config.API_URL}getAllTemplatesByType?type=ct`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.setState({templates: res.data});
        }).catch(error =>{
          console.log(error)
        }) 
      } else if( type == "mindsending"){
        this.setState({templateType:2})
        axios.get(`${Config.API_URL}getAllTemplatesByType?type=mindsending`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.setState({templates: res.data});
        }).catch(error =>{
          console.log(error)
        }) 
      }
   }

	
  render(){
     return (
      
	  <div className = "" >
        <div className >
          <div className="flash_notice">
          <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
          </div>
        <div className="container" data-role="main-app-container">
        <div>
  <div data-role="marketing-templates-app" className="container">
    <div className="templates-list-view listView-css__list-view___1G-eZ">
      <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Templates
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                           
                                <Link icon="segment" className="btn_create_contact" to="/new-template">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    New Template
                                </Link>
                            
                        </div>
        <div className="col-md-12">
         
          <div className="filter">
            <ul className="">
            <li><a  className="text-muted">Filter By</a></li>
              <li><button className={`${this.state.templateType == 0 ? 'activeTemplate' : 'inactiveTemplate'}`} style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getAllTemplates()} >All</button></li>
              <li><button className={`${this.state.templateType == 2 ? 'activeTemplate' : 'inactiveTemplate'}`} style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getTemplateByType("mindsending")}>MindSending templates</button></li>
              <li><button className={`${this.state.templateType == 1 ? 'activeTemplate' : 'inactiveTemplate'}`} style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getTemplateByType("custom")}>Custom Templates</button></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-view">
          {this.state.templates.map(list=>(
               <OneTemplate
               content = {list.contentJson}
               update = {this.getAllTemplates}
                   key={list.index}
                   id={list.id}
                    templateName={list.nameTemplate}   
                    image={list.contentHtml}
                    imagePreview={list.preview}
                    preview={true}
                     />
          ))}     
      
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
        
    </div>
      );
  }

}


const mapStateToProps = (state) => {
return {
  isPreviewOpen: state.models
}
};
const mapDispatchToProps = (dispatch, props) => {
  return{

  };
};
export default connect(mapStateToProps, mapDispatchToProps) (Templates);
