import React, {Component} from 'react';
import Modal from 'react-awesome-modal';
import OneTemplate from '../../components/OneTemplate';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import Templates from './../../pages/DashboardPage/TemplatesComponent/Templates';
import * as Config from '../../constants/Config';
import axios from 'axios';
class ChooseTemplateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible : true,
        templates: [],
        campaignId: this.props.campaignId,
        auth_token:""
    }
}
closePreviewModal=() => {
  this.props.onCloseModal();
}
componentDidMount(){
  console.log(this.state.campaignId)
  const appState = JSON.parse(localStorage.getItem('appState'));
  this.setState({
      auth_token: appState.user.auth_token
  },()=> this.getAllTemplates() )

   
 }	
 getAllTemplates=()=>{
  axios.get(`${Config.API_URL}template`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
  .then(res => {
    console.log(res.data);
    this.setState({templates: res.data});
  })
 }
 
 componentWillReceiveProps(newProps) {
  console.log(newProps.campaignId)
}

  render(){
     return (
      <Modal visible={this.props.isDisplayTemplatesList} width="90%" height="96%" effect="fadeInUp" 
      onClickAway={this.closePreviewModal}>
            
            
          <div className="flash_notice">
          </div>
        <div className="container" style={{"background":"white", "height":"96%"}} data-role="main-app-container">
        <div>
  <div data-role="marketing-templates-app" className="container">
    <div className="templates-list-views listView-css__list-view___1G-eZ">
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
                        <div className="col-md-6" style={{"display": "block", "textAlign":"left", "paddingLeft":"13%"}}>
                            
                            <Link icon="segment" style={{"float":"left","display": "inline-block"}} className="width50 btn_create_contact" to="/new-template">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Continue
                                </Link>
                                <Link icon="segment" style={{"float":"left","display": "inline-block"}} className="width50 btn_create_contact" to="/new-template">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Cancel
                                </Link>
                            
                        </div>
        <div className="col-md-12">
         
          <div className="filter">
            <ul className="filter">
            <li><a className="">Filter By</a></li>
              <li><a  href="#home" className="active">All</a></li>
              <li><a href="#news">Custom Templates</a></li>
              <li><a href="#contact">MindSending templates</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-views">
      {this.state.templates.map(list=>(
               <OneTemplate
                    campaignId={this.props.campaignId}
                    id={list.id}
                    key={list.index}
                    templateName={list.nameTemplate}   
                    image={this.state.htmlImage}
                    preview={false}
                    content={list.content}
                     />
          ))}    
      </div>
    </div>
  </div>
</div>

        </div>
        
    
        
  </Modal>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayTemplatesList: state.isDisplayTemplatesList
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
        onCloseModal: ()=> {
          dispatch(actions.closePreviewTemplate())
        }
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps) (ChooseTemplateModal);