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
      visibleMs: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.getAllTemplates();
   }	
   getAllTemplates = ()=>{
    axios.get(`${Config.API_URL}template`,{
    })
    .then(res => {
      console.log(res.data);
      this.setState({templates: res.data});
    }) 
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
              <li><a  href="#home" className="active">All</a></li>
              <li><a href="#news">Custom Templates</a></li>
              <li><a href="#contact">MindSending templates</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-view">
          {this.state.templates.map(list=>(
               <OneTemplate
               content = {list.content}
               update = {this.getAllTemplates}
                   key={list.index}
                   id={list.id}
                    templateName={list.nameTemplate}   
                    image={this.state.htmlImage}
                    preview={true}
                     />
          ))}     
        <PreviewModal  isOpen={true}
         />
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
