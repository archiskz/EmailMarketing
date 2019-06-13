import React, {Component} from 'react';
import Modal from 'react-awesome-modal';
import OneTemplate from '../../components/OneTemplate';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import Templates from './../../pages/DashboardPage/TemplatesComponent/Templates';
class ChooseTemplateModal extends Component {
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
      <Modal visible={this.props.isDisplayTemplatesList} width="90%" height="96%" effect="fadeInUp" 
      onClickAway={this.closePreviewModal}>
            
            
          <div className="flash_notice">
          </div>
        <div className="container" data-role="main-app-container">
        <div>
  <div data-role="marketing-templates-app" className="container">
    <div className="templates-list-views listView-css__list-view___1G-eZ">
      <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"fontFamily": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Templates
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            <nav className="btn-list pull-right">
                                <Link icon="segment" className="btn-create-segment" to="/new-template">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create New Template
                                </Link>
                            </nav>
                        </div>
        <div className="col-md-12">
         
          <div className="filter">
            <ul className="filter">
            <li><a className="">Filter By</a></li>
              <li><a  href="#home" className="active">All</a></li>
              <li><a href="#news">Custom Templates</a></li>
              <li><a href="#contact">MindSending templates</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
        </div>
      </header>
      <div className="thumbnail-views">
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
        <OneTemplate         
          />
        <OneTemplate         
        />
          
         />
      </div>
    </div>
  </div>
</div>

        </div>
        
    
        
  </Modal>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayTemplatesList: state.isDisplayTemplatesList
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
        onCloseModal: ()=> {
          dispatch(actions.closePreviewTemplate())
        }
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps) (ChooseTemplateModal);