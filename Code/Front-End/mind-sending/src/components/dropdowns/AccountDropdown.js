import React, {Component} from 'react';

class AccountDropdown extends Component {
  render(){
     return (
    <div class="dropdown">
  <button onclick ={this.myFunction()} class="dropbtn">Dropdown</button>
  
</div>
  );
  }
}



myFunction = () => {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
	}
}

export default AccountDropdown;
