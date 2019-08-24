import React, {Component} from 'react';
import {isEmpty, chain, assignIn} from 'lodash';
import $ from 'jquery';
import service from '../../../utils/subcriberRepository';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import { withRouter } from "react-router";
import * as Config from '../../../constants/Config';
import axios from 'axios';


class TestForm extends Component {
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
            newSubcriber:{
                gcSubcriberDTOS: [
                    {
                      groupContactId: 0
                    }
                  ],
                email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            dob:"",
            },
            headline: "JOIN US",
            isShow:true,
            isEmpty: false,
            ok: false
        }     
        this.handleBtn = this.handleBtn.bind(this);
        this.onSubcribe = this.onSubcribe.bind(this);
        };
        componentDidMount(){
            console.log(window.location.pathname); //yields: "/js" (where snippets run)
            var id = window.location.pathname;
            id = id.slice(15,17)

            console.log("id"+ id)
            this.getFormById(id)
            console.log(window.location.href);     //yields: "https://stacksnippets.net/js"
            console.log(this.props.location.pathname)
        }

        getFormById=(id)=>{
            var self = this;
            axios.get(`${Config.API_URL}form/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
                .then(res => {
                console.log(res.data);
                if(res.data == null || res.data == undefined || res.data == ""){
                    self.setState({
                        isShow: false,
                        headline: res.data.code
                    })
                }
                var formDisplay = new String();
                formDisplay = res.data.form
                this.setState({
                    headline: res.data.code
                })
                if(formDisplay.includes('firstName')){  
                    this.setState({firstName: true})
                }
                if(formDisplay.includes('lastName')){
                    this.setState({lastName: true})
                }
                if(formDisplay.includes('phone')){
                    this.setState({phone: true})
                }
                if(formDisplay.includes('address')){
                    this.setState({address: true})
                }
                if(formDisplay.includes('birth')){
                    this.setState({birth: true})
                }
                var groupDTO = res.data.formGroupContacts
                var groups = []
                groups = groupDTO
                var group = groups[0]
                var id = group.groupContact.id
                console.log("GROUP" + id)
                this.setState({newSubcriber: {
                    ...this.state.newSubcriber,
                    gcSubcriberDTOS:[{groupContactId: id}]
                }});
                // sessionStorage["campaigns"] = JSON.stringify(selectOptions);
                }).catch(function (error) {
                console.log(error);
                // if(error != null ){
                //   errors = true
                // }
                }); 
        }
        
    render(){
        /* Simply pass myCustoms to */
        return(
            <div id="code_preview" className={`${this.state.isShow ? '':'activeText'}`} style={{"marginLeft":"0px !important","width":"360px","padding":"15px"}}>
          
            <form className="form-embed" onSubmit={this.onSubcribe}>
            <b>{this.state.headline}</b>
            <br/><br/>
                    <div class="form-group">
                        <input name="email" type="email" value={this.state.newSubcriber.email} onChange={this.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                    </div>
                    <div class={'form-group' +  (this.state.firstName ? " " : " activeText" )}>
                        <input name="firstName" value={this.state.newSubcriber.firstName} onChange={this.handleChange} type="text" class="form-control" id="exampleInputPassword1" placeholder="First Name"/>
                    </div>
                    <div class={'form-group' +  (this.state.lastName ? " " : " activeText" )}>
                        <input name="lastName" value={this.state.newSubcriber.lastName} onChange={this.handleChange} type="text" class="form-control" id="exampleInputPassword1" placeholder="Last Name"/>
                    </div>
                    <div class={'form-group' +  (this.state.phone ? " " : " activeText" )}>
                        <input name="phone" value={this.state.newSubcriber.phone} onChange={this.handleChange} type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone"/>
                    </div>
                    <div class={'form-group' +  (this.state.address ? " " : " activeText" )}>
                        <input name="address" value={this.state.newSubcriber.address} onChange={this.handleChange} type="text" class="form-control" id="exampleInputPassword1" placeholder="Address"/>
                    </div>
                    <div class={'form-group' +  (this.state.birth ? " " : " activeText" )}>
                        <input name="dob" value={this.state.newSubcriber.dob} onChange={this.handleChange} type="text" class="form-control" id="exampleInputPassword1" placeholder="Birth Date"/>
                    </div>
                    <button  class="btn btn-primarys">{this.state.ok ? 'SUCCESSFULLY' : 'Subscribe'}</button>
                    {/* <a style={{"marginLeft":"10px"}} onClick={this.closeIframe} id="close_btn_mindsending" class="btn btn-primary">Close</a> */}
                </form>    
            </div>
                     );
    }
    closeIframe=()=>{
        // var number=document.getElementById("number");  
        this.setState({isShow: false})

    }
    onSubcribe(event){
        event.preventDefault()
        console.log("haha")
        axios.post(`${Config.API_URL}subcriber/create`,this.state.newSubcriber,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(response => {
          this.setState({
            ok:true,
            listAllAccounts: response.data,
            listFilter: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    save(form){
        // you will receive form
        console.log(form);
    }

    handleBtn=(event)=>{
        console.log(event.target.value)
        const value = event.target.value
        this.setState({
            submit: value
        })
    }
    handleChange=(event)=>{
        console.log(event.target.name)
        const name = event.target.name
        const value= event.target.value
        this.setState({
           newSubcriber:{
               ...this.state.newSubcriber,
               [name]: value
           }
        },()=>console.log(this.state.newSubcriber))
    }
    
    updateForm(callback){
        // // fetch form and set it to callback
        // let form = axios.......
        // callback(form)
    }
}
export default withRouter(TestForm);
