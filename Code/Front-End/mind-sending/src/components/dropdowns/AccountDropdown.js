import React, {Component} from 'react';

class Home extends Component {
  render(){
     return (
    <div >
	    <div class="dropdown">
	  		<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">SonNLH
	  		<span class="caret"></span></button>
	  		<ul class="dropdown-menu">
		    	<li>
		    		<a >Subcriber</a>
		    	</li>
		    	<li>
		    		<a >Campaigns</a>
		    	</li>
		    	<li>
		    		<a >Reports</a>
		    	</li>
		    	<li>
		    		<a >Template</a>
		    	</li>
		    	<li>
		    		<a >Account</a>
		    	</li>
		    	<li>
		    		<a >Login</a>
		    	</li>
	  		</ul>
		</div>
    </div>
  );
  }
}

export default Home;
