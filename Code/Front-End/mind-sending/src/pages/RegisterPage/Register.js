import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import {callApi} from './../../utils/apiCaller';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {   
        username: "son123",
        password: "123121242",
        email: "sonnlh57@gmail.com"
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
                  
                </form>
                <div className="p-t-10 al-center ">
                    <button onClick={this.onRegister} className="login100-form-btn" type="">Register</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
  );
  }
  updateUsernameInput(evt) {
    this.setState({
      username: evt.target.value
    });
    // alert(evt.target.value)
  }


  updatePasswordInput(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  updateEmailInput(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  getPosts() {
    axios.post("http://25.36.135.233:8080/api/sign-up")
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          posts: response.data.posts,
          isLoading: false
        });
        console.log(response);
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  

  onRegister= () => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...'
    }
    this.setState({
        username: this.state.usernameInput,
        password: this.state.passwordInput,
        email: this.state.emailInput
    });
    var json = JSON.stringify(this.state);
    alert(json);
    axios.post('http://25.36.135.233:8080/api/sign-up', 
        {json}, 
        headers
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
}
  
 
}

export default Register;
