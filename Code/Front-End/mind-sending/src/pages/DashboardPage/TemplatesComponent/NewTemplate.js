import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmailEditor from 'react-email-editor';
import returnic from './../../../access/img/return_icon.png';
import {Link} from 'react-router-dom';
import sample from './../../../sample.json';
import TemplateNameModal from './../../../components/modals/TemplateNameModal';
import * as actions from './../../../actions/index';
import Modal from 'react-awesome-modal';

class NewTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      html: "",
      visible: false,
    };
  }
   
  render(){
     return (
      <div>
       <div className="fullscreen"></div>

      {/* <div>
        <button onClick={this.exportHtml}>Export HTML</button>
      </div>
      <div>
        <button onClick={this.onLoad}>Load HTML</button>
      </div> 
      <div>{this.state.html}</div> */}

      
   
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
          customJS: [
            `
              console.log('I am custom JS!');
            `
          ]
        }}
      minHeight="780px"
        ref={editor => this.editor = editor}
      />
      
    </div>
    
    );
  }

  
  onLoad = () => {
    console.log(sample)
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    this.editor.loadDesign(sample)
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
