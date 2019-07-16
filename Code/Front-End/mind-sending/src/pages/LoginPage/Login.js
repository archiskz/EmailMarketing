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
			login:{
				isLoggedIn: false,   
				user: {},
			},
			posts: [],
				isLoading: true,
				errors: null
	};

}




tryLogin = () => {
	// const header = Authorization: `Bearer-${Config.TOKEN}`
	axios.post(`${Config.API_URL}groupContacts`)
	.then(response => {
	  
		console.log(response.headers.authorization)

	})
	.catch(error => {
	  console.log(error);
	});
}


handleChange =(e)=> {
	const { name, value } = e.target;
	// let contact = state.contact;
	// contact = {...contact, [name]: value};
	this.setState({ user: {
  ...this.state.user,
	[name]: value
}
	
	} );
	console.log(this.state.user)
 }

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
						BE THE REASON SOMEONE SMILES
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter username" >
					
						<input value={this.state.user.username}  onChange={this.handleChange}  className="input100 myClass" type="text" name="username" placeholder="      Username"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input onChange={this.handleChange}  className="input100" type="password" name="password" placeholder="      Password"
							value = {
								this.state.user.password
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
						<a type="button" onClick={()=> {this.getPosts()}} className="btn_create_login">
							Login
						</a>
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
	console.log(this.state.user)
	axios.post(`http://103.79.141.134:8080/api/login`,this.state.user,{
		headers:{
			Authorization: ""
		}
	})
    .then(response => {
	  console.log(response.status)
      
		  console.log(response.headers.authorization)
		  if(response.status == 200){
			  let userData = {
				  auth_token: response.headers.authorization,
				  username: this.state.user.username
			  };
			  let appState = {
				isLoggedIn: true,
				user: userData
			  }
			  localStorage["appState"] = JSON.stringify(appState);
			  this.setState({
				login:{
					isLoggedIn: appState.isLoggedIn,
					user: appState.user
				}
			  });
		  } else alert("Login Failed!");
    })
    .catch(error => {
      console.log(error);
    });
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
