import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isSelected: false,
          checked: false,
        };
     
    
    }

      render(){
          return( 
            <div class="rowt">
        <div  class="cellt" data-title="email">
        <a onClick = {()=> this.toListContact(this.props.contactId)} >{this.props.contactEmail}</a>
        
        </div>
        <div class="cellt" data-title="status">
        {this.props.contactStatus}
        </div>
        <div class="cellt" data-title="dateAdded">
        {this.props.contactDateAdded}
        </div>
        <div class="cellt" data-title="action">

           {this.props.contactActions}
        </div>
    </div> 
          );
      }

      toListContact = (id)=> {        
        this.props.history.push({
            pathname:`/dashboard/contacts/:${id}`,
            state : id
        
        });
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



export default withRouter(ListRow);



