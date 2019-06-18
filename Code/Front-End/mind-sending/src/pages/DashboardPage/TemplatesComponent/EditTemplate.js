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

class EditTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // content: {} 
      id: this.props.history.location.state,
      template:{
            id: "",
            nameTemplate: "",
            content: {}, 
      },
      nameTemplate:"",
      content: {"counters":{"u_column":1,"u_row":1,"u_content_image":1,"u_content_text":2},"body":{"rows":[{"cells":[1],"columns":[{"contents":[{"type":"image","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_image_1","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"deletable":true,"src":{"url":"https://via.placeholder.com/500x100?text=IMAGE","width":500,"height":100},"fullWidth":false,"textAlign":"center","maxWidth":"100%","altText":"Image","action":{"url":"","target":""}}},{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_1","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"left","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 14px; line-height: 19.6px;\">This is a new Text block. Change the text.</span></p>"}},{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_2","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"left","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 14px; line-height: 19.6px;\">SON SON SON<br /></span></p>"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}}],"values":{"backgroundColor":"#e7e7e7","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}}},
      html: "",
      visible: false,
    };
  }

  componentWillMount(){
    console.log(this.props.history.location.state);
    const id = this.props.history.location.state;
    var self = this;
    
      axios.get(`${Config.API_URL}${id}`)
    .then(res => {
    var content = res.data.content;
    console.log(content)
     
    // content.replace(/[{\}]/g,'a');
   
      // console.log("Hello" + JSON.parse(JSON.stringify(res.data.content)))
       self.setState({content: JSON.parse(res.data.content)})
      //  console.log(this.state.content)
   }).catch(function (error) {
    console.log(error);
  });
   }	
   componentDidMount(){
    console.log(this.props.history.location.state);
    const id = this.props.history.location.state;
    var self = this;
    
      axios.get(`${Config.API_URL}${id}`)
    .then(res => {
    var content = res.data.content;
    console.log(content)
     
    // content.replace(/[{\}]/g,'a');
   
      // console.log("Hello" + JSON.parse(JSON.stringify(res.data.content)))
       self.setState({content: JSON.parse(res.data.content)})
      //  console.log(this.state.content)
   }).catch(function (error) {
    console.log(error);
  });
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
                Save Template
              </div>
          </nav>
            
      </div>
            <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                      <form class="contact1-form validate-form">
                  <span class="contact1-form-title">
                    Save Template
                  </span>

                  <div className="wrap-input1 validate-input" >
                    <input  value={this.state.template.nameTemplate}  onChange={this.handleChange} required className="name input1" type="text" name="name" placeholder="Template Name"/>
                    <span class="shadow-input1"></span>
                  </div>

                  <div class="container-contact1-form-btn">
                    <a onClick={()=>this.saveTemplate()}  class="contact1-form-btn">
                      <span>
                        Save
                      </span>
                    </a>
                        <a onClick={()=>this.closeModal()}  class="contact1-form-btn">
                      <span>
                                      Cancel
                      </span>
                    </a>
                  </div>
                </form>         
                      </Modal>
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
  }
  onLoad = () => {
    console.log(this.props.history.location.state);
    const id = this.props.history.location.state;
    var self = this;
    
      axios.get(`${Config.API_URL}${id}`)
    .then(res => {
    var content = res.data.content;
     
    // content.replace(/[{\}]/g,'a');
   
      // console.log("Hello" + JSON.parse(JSON.stringify(res.data.content)))
       self.setState({content: JSON.parse(JSON.stringify(res.data.content))})
       console.log(this.state.content)
   }).catch(function (error) {
    console.log(error);
  });
    const content = this.state.content
  
    console.log(content)
      this.editor.loadDesign(content)
      console.log("HI hohohohohohho IHIH IHI HI HI HI HI ")
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
