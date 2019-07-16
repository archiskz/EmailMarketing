import React, {Component} from 'react';
import AccountDropdown from './dropdowns/AccountDropdown';
import {connect} from 'react-redux';
import axios from 'axios';
import * as Config from './../constants/Config';
import * as actions from './../actions/index';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';
import Base64Image from './Base64Image';
class OneTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgp:"",
      visible: true,
      dropdown_visible: false,
      modalIsOpen: false,
      auth_token:""
      
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }

  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});
    console.log(this.state.modalIsOpen)
  }
  componentDidMount(){
    console.log(this.props.imagePreview)
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  onSelectTemplate = ()=>{
      console.log("Hello true")
  }
  render(){
    var image = this.props.image
     return (
         
        <div className={"list-item-container" + (this.props.preview ? " " : " ontemplate")} >
        <div className="thumbnail-box">
          <div className="preview" onClick={()=>console.log("hello guy")}>
            <div
              className="thumbnail-container"
            >
             
              <div className="thumbnail-actions" >
                <a
                  className={"previewBtn btn btn-secondary btn-on-dark " +(this.props.preview ? " " : "displayFalse") }
                  onClick={this.openModal} >
                  Preview
                </a>
                <a 
                  className={"previewBtn btn btn-secondary btn-on-dark " +(this.props.preview ? " displayFalse" : "") }
                  onClick = {()=> this.props.onChooseTemplate(this.props.id, this.props.content)}>
                  Choose
                </a>
              </div>
              <div  className="thumbnail-actions after" style={{"backgroundImage":`url(../assets/img/${this.props.id}.png)`}} >
              {/* <Base64Image />  */}
              <img
         src={require(`../assets/img/${this.props.id}.png`)}
       />
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
                  <Link onClick={()=> this.onDuplicate(this.props.id)} data-role="dropdown-link" className="dropdown-link dropdown-link-with-icon" >
                    <i className="sg-icon sg-icon-contacts-alt"></i>
                    <span>Duplicate</span>
                  </Link>
                  <a onClick={()=> this.toEditTemplate(this.props.id)} data-role="dropdown-link" className="dropdown-link dropdown-link-with-icon" >
                    <i className="sg-icon sg-icon-contacts-alt"></i>
                    <span>Edit</span>
                  </a>
                </ul>
              </div>
              <a>
                {this.props.templateName}
                
              </a>
              
            </div>         
            <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.modalIsOpen} width="50%" height="96%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div className="modalPreview">
          <div className="col-md-6">
              <span>
                <h1 className="">
               <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Preview
                    <span>&nbsp;</span>
                  </span> 
                  
                </h1>
              </span>
          </div>
          <div className="col-md-6">
            <nav className="btn-list pull-right">
                <a   icon="segment" className="btn-create-segment" >
                  <i onClick={()=>this.closeModal()} className="sg-icon sg-icon-segment"></i>
                    Cancel
                </a>
            </nav>
          </div>
          <div className="previewImg">            
          {/* <span dangerouslySetInnerHTML={{__html: image}} /> */}
          <img
         src={require(`../assets/img/${this.props.id}.png`)}
       />
         </div>
          
        </div>
 
                </Modal>
 
          </div>
                                    
        </div>
        
      </div>
       
  );
  }
  onDuplicate = (id)=>{
    // console.log(`${Config.API_URL}template/copy/${id}`);
    axios.post(`${Config.API_URL}template/copy/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
     this.props.update()
    })
    .catch(error => {
      console.log(error);
      this.props.update()
    });
  }

  toEditTemplate =(id)=>{
    // console.log(this.props.content)
    this.props.history.push({
      pathname:`/edit-template/:${id}`,
      state : {
        id: id,
        contentJson: this.props.content,
        nameTemplate: this.props.templateName
      }
  });

  }
  toCampaignContentEdit = (id)=> {        
    this.props.history.push({
        pathname:`/edit-template/:${id}`,
        state : {
          id: id,
          contentJson: this.props.content
        }
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
  
