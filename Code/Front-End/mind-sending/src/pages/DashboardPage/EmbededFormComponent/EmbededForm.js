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
import imgLoad from './../../../assets/img/ajax-loader.gif'


class EmbededForm extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            generated:false,
            email: true,
            firstName: false,
            lastName: false,
            phone: false,
            address: false,
            birth:false,
            submit: "Subcribe",
            auth_token:"",
            lists:[],
            groupId:0,
            isLoading:false,
            newForm:{
                form: "",
                gcFormDTOS: [
                    {
                    groupContactId: 0
                    }
                ],
                name: ""
            },
            formId:0
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

           onChangeListsSelect=(args)=>{
            var numbers = args.value;
            console.log(numbers)
            this.setState({
                newForm:{
                    ...this.state.newForm,
                    gcFormDTOS:[
                        {groupContactId: numbers}
                    ]
                }
            }, () => { console.log('------------------', this.state.newForm)})
          }
        
    render(){
        var lists = this.state.lists;
        /* Simply pass myCustoms to */
        return(
            <div class="plain-html-editor-v2">
                <div class="editor">
                    <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                        <h3 class="StyledHeading-dhDQR dsbhyt">
                            <span>Create Embedded Form</span>
                        </h3>
                    </div>
                <div class="preview_code">
                <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                    <h3 class="StyledHeading-dhDQR dsbhyt">
                        <span>Preview</span>
                    </h3>
                </div>
                
                <div id="code_preview" className="ml30p" style={{"marginLeft":"0px !important","width":"360px", "border":"1px solid black","padding":"15px", "borderRadius":"10px"}}>
            JOIN US <br/><br/>
            <form>
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                    </div>
                    <div class={'form-group' +  (this.state.firstName ? " " : " activeText" )}>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="First Name"/>
                    </div>
                    <div class={'form-group' +  (this.state.lastName ? " " : " activeText" )}>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last Name"/>
                    </div>
                    <div class={'form-group' +  (this.state.phone ? " " : " activeText" )}>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone"/>
                    </div>
                    <div class={'form-group' +  (this.state.address ? " " : " activeText" )}>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Address"/>
                    </div>
                    <div class={'form-group' +  (this.state.birth ? " " : " activeText" )}>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Birth Date"/>
                    </div>
                    <button type="submit" onClick={this.onSubcribe} class="btn btn-primary">Subcribe</button>
                </form>
                    
            </div>
            <button onClick={this.generateCode} class="copy-button ButtonContainer-cCzDqJ dbshwx" type="button" color="primary">
                    <div class="ButtonContent-dNFcBm ijrtmX">
                        <span class="ButtonText-cgEyiP kPJhKT">GENERATE CODE <img className={`${this.state.isLoading && !this.state.generated ? "" : "activeText"}`} style={{"marginLeft":"15px"}} src={imgLoad} alt="loading..." /></span>
                    </div>
                </button>
        </div>
        <div class={`plain-code ${this.state.formId != 0 ? '' : 'activeText'}`}>
            <div class="code-area">
                
                {/* <a onClick={this.toFormRegister}>To form</a> */}
                <br/>
                    <div class="heading-text heading-text-level-3 HeadingContainer-kEsQfH fWsXGo" role="heading">
                        <h3 class="StyledHeading-dhDQR dsbhyt">
                            <span>Copy and paste onto your site:</span>
                        </h3>
                    </div>
                <div>
                <p class="info-text">
                    {/* <span>Please note that Web Forms created with the Plain HTML Editor won't be saved. Copy the generated code right away.</span> */}
                </p>
                
            </div>
            
            <div class="" id="code_plain">
            <button class=" ButtonContainer-cCzDqJ dbshwx copycode" type="button" color="primary">
                    <div class="ButtonContent-dNFcBm ijrtmX">
                        <span class="ButtonText-cgEyiP kPJhKT">COPY CODE</span>
                    </div>
                </button>
                <div class="">
                
                    <div class="plain-code__textarea StyledTextarea-giTpQe hUwqAX" readonly="" name="plain_code" rows="8">
                    {`<iframe style="border:none;z-index:1000;background:none;position: fixed;bottom:0;right:0;width:360px; height: 415px" src="http://localhost:3000/form-register/${this.state.formId}?${this.state.auth_token}">
  <p>Your browser does not support iframes.</p>
</iframe>`}
                    </div>
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
                                <span>Form Name</span>
                                <span class="InfoBoxContainer-hgOnVC chmwKn"></span>
                            </div>
                            <input onChange={this.handleChange} value={this.state.newForm.name} class="user_profile_w3_input" name="button" type="text" autocomplete="off" maxlength="64"/>
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

    handleChange=(event)=>{
        const value = event.target.value
        this.setState({
            newForm: {
                ...this.state.newForm,
                name: value
            }
        })
    }
    generateCode=()=>{
        this.setState({isLoading:true})
        console.log(this.state.newForm)
        axios.post(`${Config.API_URL}form/create`,this.state.newForm,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
            .then(response => {
                console.log(response)
                this.setState({isLoading: false,
                    generated: true,
                formId: response.data})
            })
            .catch(error => {
                console.log(error);
            });
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
        },()=>{
            var s = new String();
        if(this.state.firstName){
            s += 'firstName '
        }
        if(this.state.lastName){
            s += 'lastName '
        }
        if(this.state.phone){
            s += 'phone '
        }
        if(this.state.address){
            s += 'address '
        }
        if(this.state.birth){
            s += 'birth '
        }
        this.setState({
            newForm:{
                ...this.state.newForm,
                form: s
            }
        })
        })
    }
    
    updateForm(callback){
        // // fetch form and set it to callback
        // let form = axios.......
        // callback(form)
    }
}
export default withRouter(EmbededForm);
