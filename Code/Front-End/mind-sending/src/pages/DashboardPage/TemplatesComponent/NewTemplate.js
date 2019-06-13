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

class NewTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        "counters":{"u_column":2,"u_row":2,"u_content_html":1},"body":{"rows":[{"cells":[1],"columns":[{"contents":[],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_2","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_2","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"html","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_html_1","htmlClassNames":"u_content_html"},"selectable":true,"draggable":true,"deletable":true,"html":"<div data-role=\"module-unsubscribe\" class=\"module unsubscribe-css__unsubscribe___2CDlR\" role=\"module\" data-type=\"unsubscribe\" style=\"color: rgb(68, 68, 68); font-size: 12px; line-height: 20px; padding: 16px; text-align: center;\"><div class=\"Unsubscribe--addressLine\"><p class=\"Unsubscribe--senderName\" style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 20px;\">[Sender_Name]</p><p style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 20px;\"><span class=\"Unsubscribe--senderAddress\">[Sender_Address]</span>, <span class=\"Unsubscribe--senderCity\">[Sender_City]</span>, <span class=\"Unsubscribe--senderState\">[Sender_State]</span> <span class=\"Unsubscribe--senderZip\">[Sender_Zip]</span> </p></div><p style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"#\">Unsubscribe</a> - <a class=\"Unsubscribe--unsubscribePreferences\" href=\"#\">Unsubscribe Preferences</a></p></div>"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"deletable":true}}],"values":{"backgroundColor":"#e7e7e7","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}}
      },
      
      templates:[
        {
            id: 1,
            nameTemplate: "",
            type: "",
            content: "", 
            created_time: null,
            updated_time: null
        }
        
    ],
      html: "",
      visible: false,
    };
  }

  componentDidMount(){
    axios.get("http://45.77.172.104:8080/api/template",{
    })
    .then(res => {
      // console.log(res.data);
      this.setState({templates: res.data});
      
      var a = this.state.templates;
      let obj = a.find(obj => obj.id == 2);
      this.setState({
        content: obj.content
      })
      console.log(this.state.content)
    }) 
   }	
   
  render(){
    
     return (
      <div>
       <div className="fullscreen"></div>

      <div>
        <button onClick={this.exportHtml}>Export HTML</button>
      </div>
      <div>
        <button onClick={this.onLoad}>Load HTML</button>
      </div> 

      
   
      <div className = "height150" >
      <div className="" style={{"paddingTop":"18px", "paddingLeft": "5%"}}>
        <span className="pageTitle-css__title-heading___3H2vL" style={{"height": "100%", "float": "left"}}>
          Create New Template
          <span>&nbsp;</span>
                                                           
          </span>
          {/* <input style={{"width":"20%", "height":"100%", "float": "left", "marginLeft":"3%"}} type="text" className="inputContact" placeholder="Template Name"/>       */}
      </div>
            
          <nav className="pull-right">
             <div icon="segment" className="btn-create-segment" onClick={()=>this.openModal()}>
              <i className="sg-icon sg-icon-segment"></i>
                Save Template
              </div>
          </nav>
            
      </div>
      <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      
      <div class="header-top-template" >Save Template</div>
      
        <h4 style={{"textAlign": "left", "marginTop": "30px", "marginLeft":"20px"}}>
        Name your template   
       </h4>
       <form>
       <input required className=" ml10" type="text" />
       <div style={{"width":"100%"}}>
                 <Link to="/dashboard/templates" icon="segment" type="submit" className="btn-save btn-create-segment" onClick={()=>this.openModal()}>
                    Save
                  </Link>

                  <a icon="segment" className="btn-cancel btn-create-segment" onClick={()=>this.closeModal()}>
                    Cancel
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
            
          ],
        }}
      minHeight="780px"
        ref={editor => this.editor = editor}
      />
      
    </div>
    
    );
  }

  
  onLoad = () => {
    // console.log(sample)
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    this.editor.loadDesign(this.state.content)
}


exportHtml = () => {
  this.editor.exportHtml(data => {
    const { design, html } = data
    console.log('exportHtml', JSON.stringify(design))
    this.setState({
      html: JSON.stringify(design)
    })
  })
}
openModal() {
  this.setState({
      visible : true
  });
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
