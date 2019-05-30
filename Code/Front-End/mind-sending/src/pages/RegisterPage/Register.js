import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

class Register extends Component {
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
                    <input className="input--style-3" type="text" placeholder="Username" name="name" />
                  </div>
            
                  <div className="input-group">
                    <input className="input--style-3" type="email" placeholder="Email" name="email" />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Password" name="password" />
                  </div>
                  <div className="input-group">
                    <input className="input--style-3" type="password" placeholder="Re-Confirm Password" name="confirm" />
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

export default Register;
