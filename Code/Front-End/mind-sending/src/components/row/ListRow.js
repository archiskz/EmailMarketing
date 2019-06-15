import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from './../../constants/Config';
class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: "",
          contactId: 0,
          isSelected: false,
          checked: false,
        };
      }

      getCountById=(id)=>{
        console.log(`${Config.API_URL}groupContact/countContact/${id}`)
        axios.post(`${Config.API_URL}groupContact/countContact/${id}`,)
      .then(res => {
        // const listAccounts = res.data;
      //   console.log(listAccounts);
        console.log("contact ID: " + res.data)
        this.setState({count: res.data})
       })
      
      }

      static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.contactId !== prevState.contactId){
          return { contactId: nextProps.contactId };
       }
       else return null;
     }
     
     // ở đây chúng ta sẽ set state
     componentDidUpdate(prevProps, prevState) {
       if (prevState.contactId !== this.state.contactId) {
         // Thục hiện update state
         this.setState({contactId: prevState.contactId})
         this.getCountById(this.state.contactId);
       }
     }
     componentDidMount(){
       this.getCountById(this.props.contactId);
     }



    


      render(){
          return( 
            <div class="rowt">
        <div  class="cellt" data-title="listname">
        <a onClick = {()=> this.toListContact(this.props.contactId)} >{this.props.contactEmail}</a>
        
        </div>
        <div class="cellt" data-title="description">
        {this.props.contactStatus}
        </div>
        <div class="cellt" data-title="contacts">
        {this.state.count}
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



