import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import img from './../../access/img/logo.PNG';
import {callApi} from './../../utils/apiCaller';
import axios from 'axios';
import {commonCallApi} from './../../utils/commonCallApi';
import * as Config from './../../constants/Config';
import {
	connect
} from 'react-redux';

class Login extends Component {

constructor(props) {
	super(props);
	this.state = {
			usernameInput: '',
			passwordInput: '',
			user: {
				username: '',
				password: ''
			},
			posts: [],
				isLoading: true,
				errors: null
	};

}




// tryLogin = () => {
// callApi('accounts', 'GET', null).then(res => {
// 	this.setState({
// 		accounts: this.res.data
// 	});
// 	alert(res);
// 	console.log(res);
// 	console.log('data' + this.refs.data)
// })
// }

	render(){
		const {
			isLoading,
			users,
			error
		} = this.state;
		var string = "";
		 return (
    <div className="limiter">
    
		<div className="container-login100" >
		<div className="container-loginafter" ></div>
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-logo">
						{/*<i className="zmdi zmdi-landscape"></i>*/}
						<img className="zmdi zmdi-landscape logo" alt="" src='images/logo.png'/> 
					</span>

					<span className="login100-form-title p-b-34 p-t-27">
						LOG IN
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
						<button type="button" onClick={()=> {this.getPosts()}} className="login100-form-btn">
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

{/* START TEST */}
				{/* <h2>Random Post</h2>
        <div>
          {!isLoading ? (
            this.state.posts.map(post => {
              const { _id, title, content } = post;
              return (
                <div key={_id}>
                  <h2>{title}</h2>
                  <p>{content}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
					</div> */}
			 {/* STOP */}
			</div>
		</div>
	</div>
  );
}

getPosts() {
	axios.get("http://25.36.135.233:8080/api/accounts")
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
