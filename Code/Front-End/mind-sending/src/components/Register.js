import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import img from '../access/img/logo.PNG';
import Radium, { Style } from 'radium';

class Login extends Component {
	render(){
		 return (
    <div className="font-poppins container-login100">
    <div className="container-loginafter"></div>
          <div className="wrapper wrapper--w780">
            <div className="card card-3">
              <div className="card-heading" />
              <div className="card-body">
                <h2 className="title">Registration Info</h2>
                <form method="POST">
                  <div className="input-group">
                    <input className="input100 validate-input" type="text" placeholder="Username" name="name" />
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                  </div>
                 {/* <div className="input-group">
                    <input className="input--style-3 js-datepicker" type="text" placeholder="Birthdate" name="birthday" />
                    <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                  </div>
                  <div className="input-group">
                    <div className="rs-select2 js-select-simple select--no-search">
                      <select name="gender">
                        <option disabled="disabled" selected="selected">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      <div className="select-dropdown" />
                    </div>
                  </div>*/}
                  <div className="input-group">
                    <input className="input100" type="email" placeholder="Email" name="email" />
                    <span className="focus-input100" data-placeholder="&#xf15a;"></span>
                  </div>
                  <div className="input-group">
                    <input className="input100 validate-input" type="password" placeholder="Password" name="password" />
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                  </div>
                  <div className="input-group">
                    <input className="input100 validate-input" type="password" placeholder="Re-Confirm Password" name="confirm" />
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                  </div>
                  <div className="p-t-10 al-center ">
                    <button className="login100-form-btn" type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
	}
 
}

export default Login;
