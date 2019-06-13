import React, {Component} from 'react';
import Modal from 'react-awesome-modal';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
class TemplateNameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible : true
    }
}
closePreviewModal=() => {
  this.props.onCloseModal();
}

  render(){
     return (
     
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
                <a onClick={this.closePreviewModal}  icon="segment" className="btn-create-segment" >
                  <i className="sg-icon sg-icon-segment"></i>
                    Cancel
                </a>
            </nav>
          </div>
          <div className="previewImg">

          </div>
          
        </div>
  );
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
  export default connect(mapStateToProps, mapDispatchToProps) (TemplateNameModal);