import React, {Component} from 'react';

import {connect} from 'react-redux';
import PreviewModal from '../../../components/modals/PreviewModal';
import OneTemplate from '../../../components/OneTemplate';
import * as Config from '../../../constants/Config';
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
      auth_token:""
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getTemplateByType = this.getTemplateByType.bind(this);
    this.getAllTemplates = this.getAllTemplates.bind(this);
  }
  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});
    console.log(this.state.modalIsOpen)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllTemplates() )
   }	

   getAllTemplates=()=>{
     console.log("hasdsadsad")
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
        axios.get(`${Config.API_URL}getAllTemplatesByType?type=ct`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.setState({templates: res.data});
        }).catch(error =>{
          console.log(error)
        }) 
      } else if( type == "mindsending"){
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
    var { isDisplayModal } = this.props;
    
     return (
      
	  <div className = "" >
        <div className >
          <div className="flash_notice">
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
            <li><a className="">Filter By</a></li>
              <li><button style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getAllTemplates()} >All</button></li>
              <li><button style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getTemplateByType("custom")}>Custom Templates</button></li>
              <li><button style={{"marginRight":"15px", "color":"green"}} onClick={()=>this.getTemplateByType("mindsending")}>MindSending templates</button></li>
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
