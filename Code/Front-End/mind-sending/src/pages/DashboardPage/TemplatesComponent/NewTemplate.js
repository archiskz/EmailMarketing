import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmailEditor from 'react-email-editor';
import returnic from './../../../access/img/return_icon.png';
class NewTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

	
  render(){
    
     return (
      
    <div className="fullscreen">
      <div className = "height150" >
      <div className="" style={{"paddingTop":"18px", "paddingLeft": "5%"}}>
        <span className="pageTitle-css__title-heading___3H2vL" style={{"height": "100%", "float": "left"}}>
          Create New Template
          <span>&nbsp;</span>
                                                           
          </span>
          <input style={{"width":"20%", "height":"100%", "float": "left", "marginLeft":"3%"}} type="text" className="inputContact" placeholder="Template Name"/>      
      </div>
      <div className="col-md-6">
                            <nav className="pull-right">
                                <a icon="segment" className="btn-create-segment" href="/marketing_campaigns/ui/contacts/segment">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Template
                                </a>
                            </nav>
                        </div>
      </div>
      
      <EmailEditor
      projectId={1071}
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
export default connect(mapStateToProps, mapDispatchToProps) (NewTemplate);
