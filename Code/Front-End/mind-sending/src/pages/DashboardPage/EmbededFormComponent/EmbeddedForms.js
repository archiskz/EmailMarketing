import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Config from '../../../constants/Config';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";


import FormRow from './../../../components/row/FormRow'

class EmbeddedForms extends Component {
   constructor(props) {
     super(props);

     this.state = {
       visible: true,
       dropdown_visible: false,
       campaigns: [],
       auth_token:"",
       forms:[]
     };
   }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }

   componentDidMount(){
    
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllForms() )
   }
   getAllForms=()=>{
    axios.get(`${Config.API_URL}forms`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({forms: res.data});
    }) 

   }


	
  render(){
    var listForms = this.state.forms
     return (
	  <div className = "" >
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
            <div>
                <article>
                    <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">Manage Forms
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            
                                
                              <Link class="btn_create_contact" to="/dashboard/create-form">Create Form</Link>
                           
                        </div>
                    </header>
                    <section className="row">
                                <div className="col-md-3">
                                    <section>
                                        <div className="wrap">
                                            <form class="subscribe-box" id="newsletter-form">
                                              
                                                <div class="form-group has-search">
                                                    <span class="fa fa-search form-control-feedback"></span>
                                                    <input onChange={this.handleSearch} type="text" class="form-control" placeholder="Search Form"/>
                                                </div>
                                                <div class="error-label"></div>
                                                
                                            </form>
                                        </div>

                                    </section>
                                </div>
                            </section>
                    <section>
                    {/* end filter */}
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Form Lists</h4>
                        <p className="md_tablet_p">Here is the list of your embedded form </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col">Form name</th>
                                <th className="md_tablet6_th" scope="col">Create On</th>
                                <th className="md_tablet6_th" scope="col">Group Contact</th>
                                <th className="md_tablet6_th" scope="col">Status</th>
                                {/* <th className="md_tablet6_th" scope="col">Unsubcribe</th>
                                <th className="md_tablet6_th" scope="col">Actions</th> */}
                            </tr>
                                
                            </thead>
                            <tbody>
                            {listForms.map(list=>(
                                        <FormRow
                                        id={list.id}
                                        key={list.index}
                                        formName={list.name}
                                         createTime={list.createdTime}
                                         group = {list.formGroupContacts}
                                     />
                                    ))}

                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>
                  
                          </section>
            </article>
        </div>
    </div>
  
    </div>
      );
  }

}
export default EmbeddedForms;
