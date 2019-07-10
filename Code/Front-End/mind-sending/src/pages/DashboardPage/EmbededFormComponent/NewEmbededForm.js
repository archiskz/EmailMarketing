import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery-ui/themes/base/all.css'
import 'tether/dist/css/tether.min.css'
import '../../../assets/css/form_builder.css'
import setUp from '../../../utils/form_builder'
import 'bootstrap/dist/js/bootstrap.min'
import 'tether/dist/js/tether.min'

class NewEmbededForm extends Component {
    render() {
        setUp();
        return (<div style={{"width":"100%","height":"auto"}}>
           
            	<div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
            	<a onClick={this.goBack}
      style={{"fontSize":"60px", "width":"120px","marginLeft":"20px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
                <nav class="toolbar-css__nav___27cII_detail">
                    <div className="clearfix">
                        	 <div className="col-md-6">
                            <h3 className="embed_h3">MindSending Form Builder</h3>
                            </div>
                             
                            <button className="btn_create_contact_embed export_html">
                                Export HTML
                            </button>

                        
                    </div>
                </nav>
                </div>
                <br/>

                <div className="clearfix"/>
                <div className="container">
                <div className="form_builder mt-2">
                    <div className="row">
                        <div className="col-sm-2">
                            <nav className="nav-sidebar">
                                <ul className="nav">
                                    <li className="form_bal_textfield">
                                        <a className="embed_form_nav_a" href="javascript:;">Text Field
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_textarea">
                                        <a className="embed_form_nav_a" href="javascript:;">Text Area
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_select">
                                        <a className="embed_form_nav_a" href="javascript:;">Select
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_radio">
                                        <a className="embed_form_nav_a" href="javascript:;">Radio Button
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_checkbox">
                                        <a className="embed_form_nav_a" href="javascript:;">Checkbox
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_email">
                                        <a className="embed_form_nav_a" href="javascript:;">Email
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_number">
                                        <a className="embed_form_nav_a" href="javascript:;">Number
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_password">
                                        <a className="embed_form_nav_a" href="javascript:;">Password
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_date">
                                        <a className="embed_form_nav_a" href="javascript:;">Date
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_button">
                                        <a className="embed_form_nav_a" href="javascript:;">Button
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-5 bal_builder">
                            <div className="form_builder_area"/>
                        </div>
                        <div className="col-md-5">
                            <div className="col-md-12">
                                <form className="form-horizontal">
                                    <div className="preview"/>
                                    <div id={'preview'} style={{display: 'none'}} className="form-group plain_html">
                                        <textarea rows="50" className="form_control_embed"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            
            </div>
        );
    }
}

export default NewEmbededForm;
