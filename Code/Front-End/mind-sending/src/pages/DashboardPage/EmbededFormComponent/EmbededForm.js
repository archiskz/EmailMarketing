import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EmbededForm extends Component {
  render() {
    return (
      <div className="">
        <div className="flash_notice">
        </div>
         <div className="container" data-role="main-app-container">
         <div>
          <article>
            <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">EmbededForm
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            

                                <Link  className="btn_create_contact" to="/new-embeded-form">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create EmbededForm
                                </Link>
                  
                        </div>
                    </header>
          </article>
         </div>
         </div>
      </div>
    );
  }
}

export default EmbededForm;