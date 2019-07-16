import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import {callApi} from './../../utils/apiCaller';
import axios from 'axios';
import * as Config from './../../constants/Config';
import bcrypt from 'bcryptjs'
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      newUser: {
        username: "",
        password: "",
        email: "",
        
      },
      confirmPass:""
     
    };

  }
	render(){
		 return (
    <div className="font-poppins container-login100">
   
          <div className="wrapper wrapper--w780">
            <div className="card card-3">
              <div className="card-heading" />
              <div className="card-body">
                <h2 className="title">Registration Info</h2>
                <form method="POST">
                  <div className="input-group">
                    <input className="input--style-3" type="text" placeholder="Username" name="username"
                     value={this.state.newUser.username} onChange={this.handleChange} />
                  </div>
            
                  <div className="input-group">
                    <input className="input--style-3" type="email" placeholder="Email" name="email"  
                    value={this.state.newUser.email} onChange={this.handleChange} />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Password" name="password"
                     value={this.state.newUser.password} onChange={this.handleChange} />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Re-Confirm Password" name="confirm"
                     value={this.state.confirmPass} onChange={this.handleChangeConfirm} />
                  </div>
                  
                </form>
                <div className="p-t-10 al-center ">
                    <a onClick={this.onRegister} className="btn_create_register" type="">Register</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
  );
  }
  handleChange=(evt)=> {
    const name = evt.target.name;
    const value = evt.target.value
    var self = this;
    self.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value
      }
    });
    // alert(evt.target.value)
    console.log(this.state.newUser)
  }
  handleChangeConfirm=(evt)=>{
    const value = evt.target.value
    var self = this;
    self.setState({
        ...this.state,
        confirmPass: value

    });
    // alert(evt.target.value)
    console.log(this.state.confirmPass)
  }


  

  onRegister= () => {
    var passUnCrypt = this.state.newUser.password
    const self = this;
    axios.post(`${Config.API_URL}sign-up`,self.state.newUser)
          .then(response => {
          console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          
          });
  //  bcrypt.genSalt(10,function(err, salt){
  //     bcrypt.hash(passUnCrypt, salt, function(err, hash) {
  //       self.setState({
  //         newUser:{
  //           ...self.state.newUser,
  //           password: hash
  //         }
  //       },()=>{
          
  //       })
  //   });
  //   })

   
}
  
 
}

export default Register;
