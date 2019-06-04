import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import {callApi} from './../../utils/apiCaller';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      emailInput: "",
      user: {
        username: "",
        password: "",
        email: ""
      }
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
                    <input className="input--style-3" type="text" placeholder="Username" name="name" onChange = { evt => this.updateUsernameInput(evt)} />
                  </div>
            
                  <div className="input-group">
                    <input className="input--style-3" type="email" placeholder="Email" name="email" onChange = {
								evt => this.updateEmailInput(evt)
							} />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Password" name="password" onChange = {
								evt => this.updatePasswordInput(evt)
							} />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Re-Confirm Password" name="confirm" />
                  </div>
                  <div className="p-t-10 al-center ">
                    <button onClick={this.onRegister} className="login100-form-btn" type="">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
  }
  updateUsernameInput(evt) {
    this.setState({
      usernameInput: evt.target.value
    });
  }


  updatePasswordInput(evt) {
    this.setState({
      passwordInput: evt.target.value
    });
  }

  updateEmailInput(evt) {
    this.setState({
      emailInput: evt.target.value
    });
  }

  onRegister = () => {
    this.setState({
      user: {
        username: this.state.usernameInput,
        password: this.state.passwordInput,
        email: this.state.emailInput
      }
    });
      callApi('sign-up', 'POST', this.state.user).then(res => {
      
      	alert(res);
      	
      })
  }

  onRegister= () => {
    axios.post('http://25.36.135.233:8080/api/sign-up', {
        username: this.state.usernameInput,
        email: this.state.emailInput,
        password: this.state.passwordInput,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
}

export default Register;
