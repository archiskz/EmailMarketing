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

class EditContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: {} 
      id: this.props.history.location.state.id,
      template:{
            id: "",
            nameTemplate: "",
            content: {}, 
      },
      nameTemplate:"",
      content: JSON.parse(this.props.history.location.state.content) ,
          html: "",
      visible: false,
    };
  }

   
   componentDidMount(){
    console.log(this.props.history.location.state);
  //   const id = this.props.history.location.state;
  //   var self = this;
    
  //     axios.get(`${Config.API_URL}${id}`)
  //   .then(res => {
  //   var content = res.data.content;
  //   console.log(content)
     
  //   // content.replace(/[{\}]/g,'a');
   
  //     // console.log("Hello" + JSON.parse(JSON.stringify(res.data.content)))
  //      self.setState({content: res.data.content})
  //     //  console.log(this.state.content)
  //  }).catch(function (error) {
  //   console.log(error);
  // });
   }	
   
  render(){
    
     return (
      <div>
       <div className="fullscreen"></div>
      <div className = "height150" >
      <div className="" style={{"paddingTop":"18px", "paddingLeft": "5%"}}>
        <span className="pageTitle-css__title-heading___3H2vL" style={{"height": "100%", "float": "left"}}>
          Create New Template
          <span>&nbsp;</span>
                                                           
          </span>
          {/* <input style={{"width":"20%", "height":"100%", "float": "left", "marginLeft":"3%"}} type="text" className="inputContact" placeholder="Template Name"/>       */}
      </div>
            
          <nav className="pull-right">
             <div icon="segment" className="contact1-form-btn" onClick={()=>this.openModal()}>
              <i className="sg-icon sg-icon-segment"></i>
                Save &amp; Close
              </div>
          </nav>
            
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
handleChange = (event)=>{
  const target = event.target;
  const value = target.value;
  console.log(value);
  const name = target.name;
  this.setState({
    template: {
      ...this.state.template,
      nameTemplate: value
    }
  })
  
 
}

  saveTemplate = () =>{
  this.exportHtml();
  console.log(this.state.template)
 
  axios.post(`${Config.API_URL}template/create`,this.state.template)
  .then(res => {
    console.log("contact ID: " + res.data)
    // this.setState({count: res.data})
   }).catch(function (error) {
    console.log(error);
  });
  this.closeModal();
  }

  onLoad = () => {
    if(this.props.history.location.state != null){
      this.editor.loadDesign(JSON.parse(this.props.history.location.state.content))
    } else this.editor.loadDesign();
}


exportHtml = () => {
  this.editor.exportHtml(data => {
    const { design, html } = data
    this.setState({
      content: JSON.stringify(design),
      template:{
        ...this.state.template,
        content: JSON.stringify(design)
      }
    });
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
