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
      //       <div class={"rowt " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
      //     <div class="cellt" data-title="email">
      //     {this.props.contactEmail}
      //     </div>
      //     <div class="cellt" data-title="status">
      //     {this.props.contactStatus}
      //     </div>
      //     <div class="cellt" data-title="dateAdded">
      //     {this.props.contactDateAdded}
      //     </div>
      //     <div class="cellt" data-title="action">
      //        {this.props.contactActions}
      //        <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
      //     </div>
      // </div> 
      <tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
          <td class="md_tablet6_tbody_td">
          <a href="/contacts/detail">{this.props.email}</a>
          </td>
          <td class="md_tablet6_tbody_td">{this.props.firstName}</td>
          <td class="md_tablet6_tbody_td">{this.props.lastName}</td>
          <td class="md_tablet6_tbody_td">{this.props.dob}</td>
          <td class="md_tablet6_tbody_td">{this.props.type}</td>
          <td class="md_tablet6_tbody_td">
          {this.props.contactActions}
          <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
          </td>
         
      </tr>
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



