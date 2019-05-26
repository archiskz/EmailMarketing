import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import img from '../access/img/logo.PNG';
import Radium, { Style } from 'radium';

class Login extends Component {
	render(){
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

					<div className="wrap-input100 validate-input" data-validate = "Enter username">
					<Style scopeSelector='.myClass' 
					rules={{'::-webkit-input-placeholder': {color: '#2c3e50'}}} />
						<input className="input100 myClass" type="text" name="username" placeholder="Username"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" name="pass" placeholder="Password"/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="contact100-form-checkbox">
						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
						<label className="label-checkbox100">
							Remember me
						</label>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
						{/*<Link to="/"  className="login100-form-btn">Login</Link>*/}
					</div>

					<div className="text-center p-t-10">
						<a className="txt1" >
							Forgot Password?
						</a>
					</div>
					<div className="text-center p-t-60">
						<a className="txt1" >
							Not a member? SIGN UP
						</a>
					</div>

				</form>
			</div>
		</div>
	</div>
  );
	}
 
}

export default Login;
