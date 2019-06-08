import React, {Component} from 'react';
import AccountDropdown from './dropdowns/AccountDropdown';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class OneTemplate extends Component {
  showModal =()=>{
    this.props.onOpenModal();
  }
  render(){
    console.log("Props is " +this.props.isDisplayPreviewModal);
     return (
         
        <div className="list-item-container">
        <div className="thumbnail-box">
          <div className="preview">
            <div
              className="thumbnail-container"
              style={{
                backgroundImage:
                  'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/16281fff-9e91-45c3-b27f-654b115b3435.png")'
              }}
            >
              <div className="thumbnail-actions">
                <a
                  className="btn btn-secondary btn-on-dark"
                  onClick={this.showModal} >
                  Preview
                </a>
              </div>
            </div>
          </div>
          <div className="thumbnail-details">
            <div className="template-name">
              <a href="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview">
                Modern Holiday
              </a>
            </div>
             <div className="clearfix" />
          </div>
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
      onOpenModal: ()=> {
        dispatch(actions.openPreviewTemplate())
      }
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps) (OneTemplate);
  
