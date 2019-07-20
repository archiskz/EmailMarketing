import React, {Component} from 'react';
import { withRouter } from "react-router";
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
      <tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
          <td>
          <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
          </td>
          <td class="md_tablet6_tbody_td">
          <a onClick={()=> this.toContactDetail(this.props.id)}>{this.props.email}</a>
          </td>
          <td class="md_tablet6_tbody_td">{this.props.firstName}</td>
          <td class="md_tablet6_tbody_td">{this.props.lastName}</td>
         
          <td class="md_tablet6_tbody_td">{this.props.type}</td>
          <td class="md_tablet6_tbody_td">
          {this.props.contactActions}
          <a class="fas fa-edit margin_td_fontawsome" title="Edit"> </a>
          <a class="fas fa-trash-alt" title="Delete"> </a>
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
    toContactDetail = (id)=> {        
        this.props.history.push({
            pathname:`/contacts/detail/:${id}`,
            state : id
        });
        }
    
}





export default withRouter(ContactRow);



