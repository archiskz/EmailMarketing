import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class ContactRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isSelected: false,
          checked: false,
        };
     
    
    }

      render(){
          return( 
            <div class={"rowt " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
          <div class="cellt" data-title="email">
          {this.props.contactEmail}
          </div>
          <div class="cellt" data-title="status">
          {this.props.contactStatus}
          </div>
          <div class="cellt" data-title="dateAdded">
          {this.props.contactDateAdded}
          </div>
          <div class="cellt" data-title="action">
             {this.props.contactActions}
             <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
          </div>
      </div> 
          );
      }

      handleCheck=()=> {
        this.setState({checked: !this.state.checked});
      }

      onSelectedRow =()=>{
        this.setState({
            isSelected: !this.state.isSelected
        })
    }
}



export default ContactRow;



