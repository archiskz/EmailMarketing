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
        return (
            <div className="container">
                <nav className="navbar navbar-light  bg-faded fixed-top">
                    <div className="clearfix">
                        <div className="container w-100">
                            <h3 className="mr-auto">Drag & Drop Bootstrap Form Builder</h3>
                            <button className="btn btn-info export_html mt-2 pull-right">
                                Export HTML
                            </button>
                        </div>
                    </div>
                </nav>
                <br/>
                <div className="clearfix"/>
                <div className="form_builder mt-2">
                    <div className="row">
                        <div className="col-sm-2">
                            <nav className="nav-sidebar">
                                <ul className="nav">
                                    <li className="form_bal_textfield">
                                        <a href="javascript:;">Text Field
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_textarea">
                                        <a href="javascript:;">Text Area
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_select">
                                        <a href="javascript:;">Select
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_radio">
                                        <a href="javascript:;">Radio Button
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_checkbox">
                                        <a href="javascript:;">Checkbox
                                            <i className="fa fa-plus-circle pull-right/"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_email">
                                        <a href="javascript:;">Email
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_number">
                                        <a href="javascript:;">Number
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_password">
                                        <a href="javascript:;">Password
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_date">
                                        <a href="javascript:;">Date
                                            <i className="fa fa-plus-circle pull-right"/>
                                        </a>
                                    </li>
                                    <li className="form_bal_button">
                                        <a href="javascript:;">Button
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
                                        <textarea rows="50" className="form-control"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewEmbededForm;
