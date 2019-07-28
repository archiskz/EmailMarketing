import React, {Component} from 'react';
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import * as Config from '../../constants/Config';
class ContactRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isSelected: false,
          checked: false,
          updateContactVisible:false,
          id:this.props.id,
           
          updateContact:{
            email: this.props.email,
              lastName:this.props.lastName,
              firstName:this.props.firstName,
              address: this.props.address,
              dob:this.props.dob,
              phone:this.props.phone
          },
          auth_token:"",
          deleteContactVisible:false
        };
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
     
    
    }
    addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Update Contact",
          message: "Updated Success!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2500 },
          dismissable: { click: true }
        });
      }
    componentDidMount(){
        const appState = JSON.parse(localStorage.getItem('appState'));
      this.setState({
          auth_token: appState.user.auth_token
      })
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
          <a class="fas fa-edit margin_td_fontawsome" onClick={()=>this.openModal()} title="Edit"> </a>
          <a class="fas fa-trash-alt" onClick={()=>this.openModalDelete()} title="Delete"> </a>
          </td>
          <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.updateContactVisible} width="440" height="660" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<div className="modal-body">
        <span class="contact1-form-title">
					{this.props.email}
				</span>
        </div>
        <div class="modal-body" style={{"textAlign":"center"}}>
                <div className="wrap-input1 validate-input" >
					<input  value={this.state.updateContact.email} onChange={this.handleChange} className="updatename input1" type="text" readOnly placeholder="Email"/>
					<span class="shadow-input1"></span>
				</div>
				<div className="wrap-input1 validate-input" >
					<input  value={this.state.updateContact.firstName} onChange={this.handleChange} className="updatename input1" type="text" name="firstName" placeholder="First Name"/>
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" >
					<input value={this.state.updateContact.lastName} onChange={this.handleChange}  className="updatedescription input1" type="text" name="lastName" placeholder="Last Name"/>
					<span class="shadow-input1"></span>
				</div>
                <div class="wrap-input1 validate-input" >
					<input value={this.state.updateContact.address} onChange={this.handleChange}  className="updatedescription input1" type="text" name="address" placeholder="Address"/>
					<span class="shadow-input1"></span>
				</div>
                <div class="wrap-input1 validate-input" >
					<input value={this.state.updateContact.dob} onChange={this.handleChange}  className="updatedescription input1" type="date" name="dob" placeholder="Birth Day"/>
					<span class="shadow-input1"></span>
				</div>
                <div class="wrap-input1 validate-input" >
					<input value={this.state.updateContact.phone} onChange={this.handleChange}  className="updatedescription input1" type="text" name="phone" placeholder="Phone"/>
					<span class="shadow-input1"></span>
				</div>
        </div>
        <div class="modal-footer">
                    <button type="button" onClick={()=>this.closeModal()} class="btn btn-info">Cancel</button>
                    <button type="button" onClick={()=>this.saveUpdatedContact()}  className={`btn btn-danger ${this.state.updateContact.firstName ? "" : "disabled"}`} >Update</button>
                    
                  </div>
			</form>
    </Modal>
    <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.deleteContactVisible} width="440" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      <div class="modal-header">
        <h4 class="modal-title">Are you sure?</h4>	
           <button type="button" onClick={()=>this.closeModalDelete()} class="close" data-dismiss="modal" aria-hidden="true">×</button>
             </div>
                       <div class="modal-body">
                         <p>Do you really want to delete this CONTACT? This process cannot be undone.</p>
                       </div>
                       <div class="modal-footer">
                         <button type="button" onClick={()=>this.closeModalDelete()} class="btn btn-info" >Cancel</button>
                         <button type="button" onClick={()=>this.deleteGroup()} class="btn btn-danger">Delete</button>
                       </div>
    </Modal>
    <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
      </tr>
          );
      }

      deleteGroup(){
     
        console.log(`${Config.API_URL}groupcontact/edit/${this.props.id}`);
  
        axios.delete(`${Config.API_URL}delete-subcriber?id=${this.props.id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
          .then(res => {
            console.log(res)
            // this.getAllListContact();
  
            this.closeModalDelete();
            this.addNotification()
            this.props.update();
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      saveUpdatedContact=()=>{
        axios.put(`${Config.API_URL}subcriber/edit/${this.state.id}`,this.state.updateContact,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.addNotification()
          this.closeModal()
          this.props.update();
        }) 
      }

      handleChange=(event)=>{
        const name = event.target.name
        const value = event.target.value
        this.setState({
            updateContact:{
                ...this.state.updateContact,
                [name]:value
            }
        },()=>console.log(this.state.updateContact))
      }
      openModalDelete(){
        this.setState({deleteContactVisible: true})
      }
      closeModalDelete(){
        this.setState({deleteContactVisible: false})
      }
      openModal(){
        this.setState({updateContactVisible: true})
      }
      closeModal(){
        this.setState({updateContactVisible: false})
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



