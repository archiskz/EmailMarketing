import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from './../../constants/Config';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: "",
          contactId: 0,
          isSelected: false,
          checked: false,
          updateList:{
            name: "",
            description: ""
         },
         updateListVisible: false,
         auth_token:"",
         deleteListVisible:false
        };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
      }
      addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Update List",
          message: "Updated Success!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }

      getCountById=(id)=>{
        axios.get(`${Config.API_URL}groupContact/countContact/${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
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
         this.setState({contactId: prevState.contactId})
         this.getCountById(this.state.contactId);
       }
     }
     componentDidMount(){
      const appState = JSON.parse(localStorage.getItem('appState'));
      this.setState({
          auth_token: appState.user.auth_token
      },()=>{
        this.getCountById(this.props.contactId);
      } )
       
       this.setState({
        updateList:{
          name: this.props.contactEmail,
          description: this.props.contactStatus
       }
       })
     }



    


      render(){
          return( 
<tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
<td>
<input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
</td>
<td class="md_tablet6_tbody_td"><a onClick = {()=> this.toListContact(this.props.contactId)} >{this.props.contactEmail}</a></td>
    <td class="md_tablet6_tbody_td">{this.props.contactStatus}</td>
    <td class="md_tablet6_tbody_td">{this.state.count}</td>
    
    <td class="md_tablet6_tbody_td">
    {this.props.contactActions}
    <a class="fas fa-edit margin_td_fontawsome" onClick={()=>this.openModal()} title="Edit"> </a>
    <a class="fas fa-trash-alt" onClick={()=>this.openModalDelete()} title="Delete"> </a>
    
    </td>
   {/* MODAL */}
   <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.updateListVisible} width="440" height="380" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<div className="modal-body">
        <span class="contact1-form-title">
					{this.props.contactEmail}
				</span>
        </div>
        <div class="modal-body" style={{"textAlign":"center"}}>
				<div className="wrap-input1 validate-input" >
					<input  value={this.state.updateList.name} onChange={this.handleChange3} className="updatename input1" type="text"  placeholder="New Group Name"/>
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" >
					<input value={this.state.updateList.description} onChange={this.handleChange2}  className="updatedescription input1" type="text" name="email" placeholder="Description"/>
					<span class="shadow-input1"></span>
				</div>
        </div>
        <div class="modal-footer">
                    <button type="button" onClick={()=>this.closeModal()} class="btn btn-info">Cancel</button>
                    <button type="button" onClick={()=>this.saveUpdatedList()}  className={`btn btn-danger ${this.state.updateList.name ? "" : "disabled"}`} >Update</button>
                    
                  </div>
			</form>
    </Modal>
    {/* modal deLETE */}
    <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.deleteListVisible} width="440" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      <div class="modal-header">
        <h4 class="modal-title">Are you sure?</h4>	
           <button type="button" onClick={()=>this.closeModalDelete()} class="close" data-dismiss="modal" aria-hidden="true">×</button>
             </div>
                       <div class="modal-body">
                         <p>Do you really want to delete this GROUP? This process cannot be undone.</p>
                       </div>
                       <div class="modal-footer">
                         <button type="button" onClick={()=>this.closeModalDelete()} class="btn btn-info" >Cancel</button>
                         <button type="button" onClick={()=>this.deleteGroup()} class="btn btn-danger">Delete</button>
                       </div>
    </Modal>
        <ReactNotification types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]} ref={this.notificationDOMRef} />
{/* END MODAAL */}
</tr>

          );
      }
      openModalDelete(){
        this.setState({deleteListVisible: true})
      }
      closeModalDelete(){
        this.setState({deleteListVisible: false})
      }
      toListContact = (id)=> {        
        this.props.history.push({
            pathname:`/dashboard/contacts/:${id}`,
            state : {
              id: id,
              name:this.props.contactEmail
            },
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

    deleteGroup(){
     
      console.log(`${Config.API_URL}groupcontact/edit/${this.props.contactId}`);

      axios.post(`${Config.API_URL}delete/${this.props.contactId}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res)
          // this.getAllListContact();

          this.closeModal();
          this.addNotification()
          this.props.update();
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    saveUpdatedList(){
     
      console.log(`${Config.API_URL}groupcontact/edit/${this.props.contactId}`);

      axios.put(`${Config.API_URL}groupcontact/edit/${this.props.contactId}`,
       this.state.updateList,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res)
          // this.getAllListContact();

          this.closeModal();
          this.addNotification()
          this.props.update();
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
  
    handleChange3=(event)=> {
     
        var name = event.target.value;
      this.setState({
          updateList: {
          ...this.state.updateList,
              name: name,
          }
      });
  }

  handleChange2=(event)=> {
      var desc = event.target.value
      this.setState({
          updateList: {
          ...this.state.updateList,
              description: desc
          }
      });

  }
  
    openModal() {
      this.setState({
          updateListVisible : true,
         
      });
    }
    
    closeModal() {
      this.setState({
         updateListVisible : false
      });
    }
}



export default withRouter(ListRow);



