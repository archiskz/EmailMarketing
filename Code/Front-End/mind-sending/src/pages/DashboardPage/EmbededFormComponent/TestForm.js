import React, {Component} from 'react';
import {isEmpty, chain, assignIn} from 'lodash';
import $ from 'jquery';
import service from '../../../utils/subcriberRepository';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { select } from '@syncfusion/ej2-base';
import { withRouter } from "react-router";


class TestForm extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            address: true,
            birth:true,
            submit: "Subcribe"
        }     
        this.handleBtn = this.handleBtn.bind(this);
        };
        
    render(){
        /* Simply pass myCustoms to */
        return(
            <div id="code_preview" style={{"width":"360px", "border":"1px solid black","padding":"10px", "borderRadius":"10px"}}>
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
                     );
    }
    
    onSubcribe=()=>{
        
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
export default withRouter(TestForm);
