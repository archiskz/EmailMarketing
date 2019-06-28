import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmailEditor from 'react-email-editor';
import returnic from './../../../access/img/return_icon.png';
import {Link} from 'react-router-dom';
import sample from './../../../sample.json';
import TemplateNameModal from './../../../components/modals/TemplateNameModal';
import * as actions from './../../../actions/index';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import * as Config from './../../../constants/Config'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class NewTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {"counters":{"u_content_image":5,"u_content_text":19,"u_content_divider":5,"u_content_button":5,"u_column":15,"u_row":12},"body":{"rows":[{"cells":[1],"columns":[{"contents":[{"type":"image","values":{"containerPadding":"30px 20px","_meta":{"htmlID":"u_content_image_1","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"deletable":true,"src":{"url":"https://emailmonster-production.s3.amazonaws.com/1503088010018-yourlogo.png","width":150,"height":25},"fullWidth":false,"textAlign":"center","maxWidth":"100%","altText":"Image","action":{"url":"","target":""}}}],"values":{"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"rgba(255,255,255,0)","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":false,"cover":false},"padding":"10px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"10px 10px 5px","_meta":{"htmlID":"u_content_text_1","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"center","lineHeight":"120%","text":"<div><span style=\"font-family: Montserrat, sans-serif; font-size: 40px; line-height: 48px;\"><span style=\"line-height: 48px; font-size: 40px;\"><span style=\"color: #00ccff; font-size: 40px; line-height: 48px;\">Webinar</span> <span style=\"color: #00ccff; font-size: 40px; line-height: 48px;\">Invite</span></span></span></div>"}},{"type":"image","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_image_5","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"deletable":true,"src":{"url":"https://emailmonster-production.s3.amazonaws.com/1503088455917-agent.png","width":200,"height":200},"fullWidth":false,"textAlign":"center","maxWidth":"100%","altText":"Image","action":{"url":"","target":""}}},{"type":"text","values":{"containerPadding":"5px 10px 10px","_meta":{"htmlID":"u_content_text_4","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"center","lineHeight":"160%","text":"<div>\n<p style=\"font-size: 14px; line-height: 160%;\"><span style=\"font-size: 18px; line-height: 28.8px;\"><span style=\"color: #ffffff; font-size: 18px; line-height: 28.8px;\">Join us for a free webinar with</span> <span style=\"color: #2affd9; font-size: 18px; line-height: 28.8px;\">Emily Smith</span>,</span></p>\n<p style=\"font-size: 14px; line-height: 160%;\"><span style=\"font-size: 18px; line-height: 28.8px; color: #ffffff;\">marketing expert and successful entrepreneur.</span></p>\n</div>"}}],"values":{"_meta":{"htmlID":"u_column_2","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"rgba(255,255,255,0)","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"https://emailmonster-production.s3.amazonaws.com/1503088437109-congruent_outline.png","width":300,"height":300,"fullWidth":false,"repeat":true,"center":true},"padding":"10px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_2","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_15","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"center","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 20px; line-height: 28px;\">Learn the top strategies for <strong>effectively</strong></span></p>\n<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 20px; line-height: 28px;\"><strong>marketing your online business</strong>.</span></p>"}},{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_16","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"center","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 20px; line-height: 28px;\">During the webinar, Emily&nbsp;will discuss how to be</span></p>\n<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 20px; line-height: 28px;\">effective in a demanding and competitive market.</span></p>"}},{"type":"divider","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_divider_5","htmlClassNames":"u_content_divider"},"selectable":true,"draggable":true,"deletable":true,"width":"100%","border":{"borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#BBBBBB"},"textAlign":"center"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_15","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_12","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_17","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"center","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"color: #008080; font-size: 14px; line-height: 19.6px;\"><strong><span style=\"font-size: 30px; line-height: 42px;\">Join us on August&nbsp;27th, 11:00 AM</span></strong></span></p>\n<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-size: 16px; line-height: 22.4px; color: #000000;\"><span style=\"line-height: 22.4px; font-size: 16px;\">and learn how to boost your business</span></span></p>"}},{"type":"button","values":{"containerPadding":"20px 20px 50px","_meta":{"htmlID":"u_content_button_5","htmlClassNames":"u_content_button"},"selectable":true,"draggable":true,"deletable":true,"href":"","buttonColors":{"color":"#FFFFFF","backgroundColor":"#3ae0c9","hoverColor":"#2A92BF"},"textAlign":"center","lineHeight":"100%","border":{"borderTopWidth":"0px","borderTopStyle":"solid","borderTopColor":"#CCC","borderLeftWidth":"0px","borderLeftStyle":"solid","borderLeftColor":"#CCC","borderRightWidth":"0px","borderRightStyle":"solid","borderRightColor":"#CCC","borderBottomWidth":"0px","borderBottomStyle":"solid","borderBottomColor":"#CCC"},"borderRadius":"50px","padding":"10px","text":"<strong><span style=\"font-size: 30px; line-height: 30px;\">SIGN UP NOW</span></strong>","calculatedWidth":243,"calculatedHeight":50}}],"values":{"_meta":{"htmlID":"u_column_3","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"rgba(255,255,255,0)","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":false,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_3","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_19","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"deletable":true,"color":"#000","textAlign":"left","lineHeight":"140%","text":"<p style=\"font-size: 14px; line-height: 140%;\">You are receiving this email because you subscribed at My Company Inc.</p>\n<p style=\"font-size: 14px; line-height: 140%;\">&nbsp;</p>\n<p style=\"font-size: 14px; line-height: 140%;\">Unsubscribe here</p>"}}],"values":{"_meta":{"htmlID":"u_column_6","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"rgba(255,255,255,0)","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":false,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_5","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[],"values":{"_meta":{"htmlID":"u_column_13","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"rgba(255,255,255,0)","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":false,"cover":false},"padding":"10px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_10","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"20px","_meta":{"htmlID":"u_content_text_14","htmlClassNames":"u_content_text"},"selectable":false,"draggable":false,"deletable":false,"color":"#000","textAlign":"left","lineHeight":"120%","text":"<div style=\"font-family: arial, helvetica, sans-serif;\"><span style=\"font-size: 12px; color: #999999; line-height: 14.4px;\">You received this email because you signed up for .</span></div>\n<div style=\"font-family: arial, helvetica, sans-serif;\">&nbsp;</div>\n<div style=\"font-family: arial, helvetica, sans-serif;\"><span style=\"font-size: 12px; color: #999999; line-height: 14.4px;\"></span></div>"}}],"values":{"_meta":{"htmlID":"u_column_14","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"#f0f0f0","columnsBackgroundColor":"rgba(255,255,255,0)","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":false,"cover":false},"padding":"30px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_11","htmlClassNames":"u_row"},"selectable":false,"draggable":false,"deletable":false}}],"values":{"backgroundColor":"#ffffff","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"contentWidth":"600px","fontFamily":{"label":"Montserrat","value":"'Montserrat',sans-serif","type":"google","weights":"400,700"},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}}} 
      ,
      templates:[
        {
            id: 1,
            nameTemplate: "",
            type: "",
            contentHtml: "", 
            contentJson:"",
            created_time: null,
            updated_time: null
        }
        
    ],
      template:{
            nameTemplate: "",
            contentJson: "", 
            contentHtml:"",
            type:""
      },
      nameTemplate:"",
      content: "",
      html: "",
      visible: false,
    };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount(){
    // axios.get("http://45.77.172.104:8080/api/template",{
    // })
    // .then(res => {
    //   // console.log(res.data);
    //   this.setState({templates: res.data});
    //   // console.log("template day ne: " + this.state.templates);
    //   var a = this.state.templates;
    //   let obj = a.find(obj => obj.id == 2);
    //   this.setState({
    //     content: obj.content
    //   })
    //   console.log(this.state.content)
    // }) 
   }	
   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Add Contact Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
   
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
        <nav class="toolbar-css__nav___27cII">
            <span data-role="code-button" class="navToggleButton-css__btn___2zvVd toolbar-css__nav-item___2KoOr navToggleButton-css__active___2QGUn">
                <span class="navToggleButton-css__code___2bWGz">
                </span>
                <strong class="navToggleButton-css__toggle-name___3Y4ez">Create New Template</strong>
            </span>
        </nav>
        <span class="toolbar-css__save-container___2x7qH">
    </span>
    <span class="toolbar-css__send-container___AbB6n">
        <a onClick={()=>this.openModal()} icon="airplane-fill" data-role="send-or-schedule-btn" class="btn btn-primary btn-on-dark  btn-with-icon btn-with-icon">
            <i class="sg-icon sg-icon-airplane-fill">

            </i>Save Template
        </a>
    </span>
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
    if(res.data=='Okay'){
      this.addNotification()
      this.closeModal()
    }
    // this.setState({count: res.data})
   }).catch(function (error) {
    console.log(error);
  });
  }
  onLoad = () => {
    // this.editor.loadDesign(this.state.content)
}


exportHtml = () => {
  this.editor.exportHtml(data => {
    const { design, html } = data
    this.setState({
      content: JSON.stringify(design),
      template:{
        ...this.state.template,
        contentJson: JSON.stringify(design),
        contentHtml: html
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
export default connect(mapStateToProps, mapDispatchToProps) (NewTemplate);
