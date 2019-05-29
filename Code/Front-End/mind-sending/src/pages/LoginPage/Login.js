import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import img from './../../access/img/logo.PNG';
import callApi from './../../utils/apiCaller';
import axios from 'axios';
import {
	connect
} from 'react-redux';

class Login extends Component {

constructor(props) {
	super(props);
	this.state = {
			usernameInput: '',
			passwordInput: '',
	};
}

componentDidMount(){
    //gọi sau khi component render lần đầu
callApi('accounts', 'GET', null).then(res => {
    this.setState({
        accounts : this.refs.data
    })
})
}

tryLogin = () =>{
alert('Email address is ' + this.state.usernameInput + ' Password is ' + this.state.passwordInput);
axios.post('api/accounts', {
		email: this.state.email,
		password: this.state.password
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
}

	render(){
		var string = "";
		 return (
    <div className="limiter">
    
		<div className="container-login100" >
		<div className="container-loginafter" ></div>
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-logo">
						{/*<i className="zmdi zmdi-landscape"></i>*/}
						<img className="zmdi zmdi-landscape logo" alt="" src={img}/> 
					</span>

					<span className="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter username" value={this.state.username} 
					onChange = { evt => this.updateUsernameInput(evt)} >
					
						<input className="input100 myClass" type="text" name="username" placeholder="Username"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" name="pass" placeholder="Password"
							value = {
								this.state.username
							}
							onChange = {
								evt => this.updatePasswordInput(evt)
							}
						/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="contact100-form-checkbox">
						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
						<label className="label-checkbox100">
							Remember me
						</label>
					</div>

					<div className="container-login100-form-btn">
						<button type="button" onClick={()=> {this.tryLogin()}} className="login100-form-btn">
							Login
						</button>
						{/*<Link to="/"  className="login100-form-btn">Login</Link>*/}
					</div>

					<div className="text-center p-t-20">
						<a href="/register"  className="a-link">Forgot Password?</a>
					</div>
					<div className="text-center p-t-20">
						<a href="/register"  className="a-link">Not a member? SIGN UP</a>
					</div>

				</form>
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
}
const mapStateToProps = (state) => {
	return {
		loginReducer: state.loginReducer
	}
};


export default connect(mapStateToProps, null)(Login);
