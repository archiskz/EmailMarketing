import React, {Component} from 'react';
import {isEmpty, chain, assignIn} from 'lodash';
import $ from 'jquery';
import service from '../../../utils/subcriberRepository';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from './../../../constants/Config';


class EmbededForm extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            email: true,
            firstName: false,
            lastName: false,
            phone: false,
            address: false,
            birth:false,
            submit: "Subcribe",
            auth_token:"",
            lists:[],
            groupId:0
        }     
        this.fields = { text: 'name', value: 'id' };
        this.handleBtn = this.handleBtn.bind(this);
        };

        componentDidMount(){
            const appState = JSON.parse(localStorage.getItem('appState'));
            this.setState({
                auth_token: appState.user.auth_token
            },()=> {
              this.getAllGroupContacts();
            });
        }
        getAllGroupContacts=()=>{
            axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
            .then(response => {
              this.setState({
                lists: response.data
              });
            })
            .catch(error => {
              console.log(error);
            });
           }

           onChangeListsSelect(args){
            var numbers = args.value;
            console.log(numbers)
            this.setState({groupId:numbers}, () => { console.log('------------------', this.state.groupId)})
          }
        
    render(){
        var lists = this.state.lists;
        /* Simply pass myCustoms to */
        return(
            <div class="plain-html-editor-v2">
                <div class="editor">
                    <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                        <h3 class="StyledHeading-dhDQR dsbhyt">
                            <span>The plain HTML form. Generate raw HTML without CSS or JavaScript.</span>
                        </h3>
                    </div>
                <div class="preview">
                <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                    <h3 class="StyledHeading-dhDQR dsbhyt">
                        <span>Preview:</span>
                    </h3>
                </div>
                <a onClick={this.toFormRegister}>To form</a>
                <div id="code_preview" style={{"marginLeft":"25%","width":"500px", "border":"1px solid black","padding":"10px", "borderRadius":"10px"}}>
                <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div class={'form-group' +  (this.state.firstName ? " " : " activeText" )}>
                            <label for="exampleInputPassword1">First Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="First Name"/>
                        </div>
                        <div class={'form-group' +  (this.state.lastName ? " " : " activeText" )}>
                            <label for="exampleInputPassword1">Last Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last Name"/>
                        </div>
                        <div class={'form-group' +  (this.state.phone ? " " : " activeText" )}>
                            <label for="exampleInputPassword1">Phone</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone"/>
                        </div>
                        <div class={'form-group' +  (this.state.address ? " " : " activeText" )}>
                            <label for="exampleInputPassword1">Address</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Address"/>
                        </div>
                        <div class={'form-group' +  (this.state.birth ? " " : " activeText" )}>
                            <label for="exampleInputPassword1">Birth Date</label>
                            <input type="date" class="form-control" id="exampleInputPassword1" placeholder="Birth Date"/>
                        </div>
                        <button type="reset" class="btn btn-primary">Subcribe</button>
                    </form>    
                </div>
        </div>
        <div class="plain-code">
            <div class="code-area">
                    <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                        <h3 class="StyledHeading-dhDQR dsbhyt">
                            <span>Copy and paste onto your site:</span>
                        </h3>
                    </div>
                <div>
                <p class="info-text">
                    <span>Please note that Web Forms created with the Plain HTML Editor won't be saved. Copy the generated code right away.</span>
                </p>
                <button class="copy-button ButtonContainer-cCzDqJ dbshwx" type="button" color="primary">
                    <div class="ButtonContent-dNFcBm ijrtmX">
                        <span class="ButtonText-cgEyiP kPJhKT">COPY CODE</span>
                    </div>
                </button>
            </div>
            <div id="code_plain">
                <div class="">
                    <pre class="plain-code__textarea StyledTextarea-giTpQe hUwqAX" readonly="" name="plain_code" rows="8">
                    {`<form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        ${this.state.firstName ? `<div class="form-group">
                            <label for="exampleInputPassword1">First Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="First Name"/>
                        </div>` : ``}
                        ${this.state.lastName ? `<div class="form-group">
                            <label for="exampleInputPassword1">Last Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last Name"/>
                        </div>` : ``}
                        ${this.state.lastName ? `<div class="form-group">
                            <label for="exampleInputPassword1">Phone</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone"/>
                        </div>` : ``}
                        ${this.state.address ? `<div class="form-group">
                            <label for="exampleInputPassword1">Address</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Address"/>
                        </div>` : ``}
                        ${this.state.birth ? `<div class="form-group">
                            <label for="exampleInputPassword1">Birth Date</label>
                            <input type="date" class="form-control" id="exampleInputPassword1" placeholder="Birth Date"/>
                        </div>` : ``}
                        <button type="submit" class="btn btn-primary">${this.state.submit}</button>
                    </form>  `}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</div>
                <div class="side-tool-box">
                    <form id="plain_text_form">
                    <fieldset class="form_options">
                        <div class="HeadingContainer-kEsQfH fWsXGo" role="heading">
                            <h3 class="StyledHeading-dhDQR jlfIGw">
                                <span>Form settings:</span>
                            </h3>
                        </div>
                        <div class="FormFieldContainer-cVnFXD gVnSPE">
                            <div class="FormFieldLabel-jJcHUJ foZsFZ">
                                <span>Group</span>
                                <span class="InfoBoxContainer-hgOnVC chmwKn"></span>
                            </div>
                            <DropDownListComponent ref={(scope) => { this.mulObj = scope; }}  
                          style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important"}} 
                          id="defaultelement"  mode="Default"  
                          dataSource={lists} mode="Default" fields={this.fields}  
                          change={this.onChangeListsSelect}
                          placeholder="Choose Group"/>  
                               </div>
                         
                        <div class="FormFieldContainer-cVnFXD gVnSPE">
                            <div class="FormFieldLabel-jJcHUJ foZsFZ">
                                <span>Submit button value</span>
                                <span class="InfoBoxContainer-hgOnVC chmwKn"></span>
                            </div>
                            <input onChange={this.handleBtn} value={this.state.submit} class="user_profile_w3_input" name="button" type="text" autocomplete="off" maxlength="64"/>
                        </div>
                        <div class="section-content">
                        <div class="FormFieldLabel-jJcHUJ foZsFZ">
                                <span>Add custom fields</span>
                                <span class="InfoBoxContainer-hgOnVC chmwKn"></span>
                            </div>
                            <br/>
                        <label className="container-cb">First Name<input onChange={this.handleCheck} type="checkbox" name="firstName" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        <label className="container-cb">Last Name<input onChange={this.handleCheck} type="checkbox" name="lastName" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        <label className="container-cb">Phone<input onChange={this.handleCheck} type="checkbox" name="phone" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        <label className="container-cb">Address<input onChange={this.handleCheck} type="checkbox" name="address" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        <label className="container-cb">Birth Date<input onChange={this.handleCheck} type="checkbox" name="birth" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        </div>
                    </fieldset>
                </form>
            </div>    
        </div>
                     );
    }
    
    save(form){
        // you will receive form
        console.log(form);
    }

    toFormRegister=()=>{
        
        this.props.history.push({
            pathname:'/form-register',
        });
    }

    handleBtn=(event)=>{
        console.log(event.target.value)
        const value = event.target.value
        this.setState({
            submit: value
        })
    }
    handleCheck=(event)=>{
        console.log(event.target.name)
        const name = event.target.name
        this.setState({
            [name]: event.target.checked
        })
    }
    
    updateForm(callback){
        // // fetch form and set it to callback
        // let form = axios.......
        // callback(form)
    }
}
export default withRouter(EmbededForm);
