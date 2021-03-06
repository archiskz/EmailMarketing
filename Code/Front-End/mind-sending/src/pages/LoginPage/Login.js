import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import img from './../../access/img/logo.PNG';
import {callApi} from './../../utils/apiCaller';
import axios from 'axios';
import {commonCallApi} from './../../utils/commonCallApi';
import * as Config from './../../constants/Config';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
// import * as Config from '../../../constants/Config'
import {
	connect
} from 'react-redux';

class Login extends Component {

constructor(props) {
	super(props);
	this.timeIncrementMs = 50;
	this.showSpinnerIfReturnGreaterThanMs = 200;
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
			msElapsed: 0,
			errors: false,
			hidden: true
	};

}


componentWillUnmount() {
	clearInterval(this.incrementer);
}

toggleShow=()=> {
	console.log("halo")
    this.setState({ hidden: !this.state.hidden });
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
					{/* <span className="login100-form-logo"> */}
						{/*<i className="zmdi zmdi-landscape"></i>*/}
					{/* </span> */}
						{/* <img className="zmdi zmdi-landscape logo" alt="" src='images/logo1.png'/>  */}

					<h5 className="card-title text-center">
						Sign In
					</h5>
					

					{/* <div className="wrap-input100 validate-input" data-validate = "Enter username" >
					
						<input value={this.state.user.username}  onChange={this.handleChange}  className="input100 myClass" type="text" name="username" placeholder="      Username"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div> */}
					<div class="form-label-group">
					<label for="inputEmail">Username</label>
                <input type="email" id="inputEmail" name="username"  value={this.state.user.username}  onChange={this.handleChange} class="form-control1" placeholder="Username" required="" autofocus=""/>
                
              </div>
			  <div class="form-label-group">
			  <label for="inputEmail">Password</label>
                <input type="password" id="inputEmail" name="password"  onChange={this.handleChange} value = {this.state.user.password}
				 class="form-control1" placeholder="Password" required="" autofocus=""/>
                
              </div>

					{/* <div className="wrap-input100 validate-input" data-validate="Enter password">
						<input onChange={this.handleChange} value = {
								this.state.user.password
							}  className="input100" type={this.state.hidden ? "password" : "text"} name="password" placeholder="      Password"
							
						/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
						<span onClick={this.toggleShow} toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
					</div> */}
					<div 
					className={"wrap-input100 validate-input " + (this.state.errors ? "active" : "inactive")}
					 style={{"textAlign":"center"}}>
					<i style={{"color":"red","textAlign":"center"}} 
					className="fas fa-exclamation-circle "
					 > The email or password you entered are incorrect</i> 
					</div>
					<div className="contact100-form-checkbox">
					<label><input type="checkbox" name="checkbox-02" class="blue" /><span style={{"color":"gray"}}>Remember me</span></label>
					</div>

					<div className="">
						<a style={{"color": "#fff", "backgroundColor": "#007bff", "borderColor": "#007bff", "borderRadius":"50px"}} 
						onClick={()=> {this.getPosts()}} className="btn btn-lg btn-primary btn-block text-uppercase">
							Login	
						</a>
						{/*<Link to="/"  className="login100-form-btn">Login</Link>*/}
					</div>

					{/* <div className="text-center p-t-20">
						<Link to="/register"  className="a-link">Forgot Password?</Link>
					</div> */}
					<div className="text-center p-t-20">
						<Link to="/register"  className="a-link">Not a member? SIGN UP</Link>
						{this.renderLoading()}
					</div>

				</form>

			</div>
		</div>
	</div>
	
  );
}

renderLoading(){
	if (this.state.isLoading &&
		this.state.msElapsed > this.showSpinnerIfReturnGreaterThanMs) {
		return <h3>Loading...</h3>;
	} else if (this.state.isLoading &&
		this.state.msElapsed <= this.showSpinnerIfReturnGreaterThanMs) {
		return (null);
	}
}

getPosts() {
	this.incrementer = setInterval(() =>
                this.setState({
                    msElapsed: this.state.msElapsed + this.timeIncrementMs
                })
            , this.timeIncrementMs);
	axios.post(`${Config.API_URL}login`,this.state.user,{
		headers:{
			Authorization: ""
		}
	})
    .then(response => {
		  if(response.status == 200){
			  console.log(response)
			  axios.get(`${Config.API_URL}accountByToken`,{ 'headers': { 'Authorization': `${response.headers.authorization}` } })
			  .then((res) => {
				  console.log(res)
				let userData = {
					auth_token: response.headers.authorization,
					username: this.state.user.username,
					role: res.data
				};
				let appState = {
				  isLoggedIn: true,
				  user: userData
				}
				sessionStorage["appState"] = JSON.stringify(appState);
				this.setState({
				  login:{
					  isLoggedIn: appState.isLoggedIn,
					  user: appState.user
				  }
				});
				this.setState({
				  isLoading: false
			  });
			  this.props.history.push({
				  pathname:`/dashboard`,
			  });
			  })
			  .catch((error) => {
				console.log(error);
			  });


			  
		  } else alert("Login Failed!");
    })
    .catch(error => {
		this.setState({
			isLoading: false,
			errors:true
		});
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


export default connect(mapStateToProps, null) (withRouter(Login));
