import React, {Component} from 'react';
import AccountDropdown from './dropdowns/AccountDropdown';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
class OneTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      dropdown_visible: false,
    };
  }
  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }
  showModal =()=>{
    this.props.onOpenModal();
  }
  onSelectTemplate = ()=>{
      console.log("Hello true")
  }
  render(){
    console.log("Props is " +this.props.preview);
     return (
         
        <div className={"list-item-container" + (this.props.preview ? " " : " ontemplate")} >
        <div className="thumbnail-box">
          <div className="preview" onClick={()=>console.log("hello guy")}>
            <div
              className="thumbnail-container"
              style={{
                backgroundImage:
                  'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/16281fff-9e91-45c3-b27f-654b115b3435.png")'
              }}
            >
              <div className="thumbnail-actions">
                <a
                  className={"btn btn-secondary btn-on-dark " +(this.props.preview ? " " : "displayFalse") }
                  onClick={this.showModal} >
                  Preview
                </a>
                <a
                  className={"btn btn-secondary btn-on-dark " +(this.props.preview ? " displayFalse" : "") }
                  onClick = {()=> this.toTemplateEdit(this.props.id)}>
                  Choose
                </a>
              </div>
            </div>
          </div>
          <div className="thumbnail-details">
            <div className="template-name">
            <div className={"dropdown-btn " + (this.props.preview ? " " : "displayFalse")}><i class="fas fa-cog"></i>
                <ul  className={"dropdown-template " + (this.state.dropdown_visible ? "dropdown-template-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                  <Link data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                    <i className="sg-icon sg-icon-csv"></i>
                    <span>Create Campaign</span>
                  </Link>
                  <Link data-role="dropdown-link" to="/dashboard/add-contacts" className="dropdown-link dropdown-link-with-icon" >
                    <i className="sg-icon sg-icon-contacts-alt"></i>
                    <span>Duplicate</span>
                  </Link>
                </ul>
              </div>
              <a href="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview">
                {this.props.templateName}
              </a>
            </div>          
             <div className="clearfix" />
          </div>
                                    
        </div>
        
      </div>
       
  );
  }

  toTemplateEdit = (id)=> {        
    this.props.history.push({
        pathname:`/edit-template/:${id}`,
        state : id
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
      onOpenModal: ()=> {
        dispatch(actions.openPreviewTemplate())
      }
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(OneTemplate));
  
