import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from '../../constants/Config';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


class FormRow extends Component {
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
         deleteVisible: false,
         auth_token:"",
         groupName:""
        };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
    //  this.sendCampaign = this.sendCampaign.bind(this);
      }
      addNotification(message) {
        this.notificationDOMRef.current.addNotification({
          title: message,
          message: `${message} Success!`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }

  
     componentDidMount(){
      const appState = JSON.parse(sessionStorage.getItem('appState'));
      this.setState({
          auth_token: appState.user.auth_token
      })
      
      console.log(this.props.group)
      var groups = []
      groups = this.props.group
      var group = groups[0]
      var id = group.groupContact.id
      console.log(id)
      this.getGroupContactById(id)
     }
     getGroupContactById=(id)=>{
      axios.get(`${Config.API_URL}groupContact/contactById?id=${id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({groupName: res.data.name,
        contactId: res.data.id});
    }) 
     }
     copyCode = (e) => {
      var textField = document.createElement('textarea')
      textField.innerText = `<iframe style="border:none;z-index:1000;background:none;position: fixed;bottom:0;right:0;width:360px; height: 415px" src="http://localhost:3000/form-register/${this.props.id}?${this.state.auth_token}">
      <p>Your browser does not support iframes.</p>
    </iframe>`
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
      this.addNotification("Copy Code");
    };
  

      render(){
          return( 
<tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
    <td class="md_tablet6_tbody_td">
    <span 
    // onClick={()=> this.toCampaignDetail(this.props.id)}
    > {this.props.formName} </span><br/>
    {/* <a target="_blank" href={`http://localhost:3000/form-register/${this.props.id}`}>http://localhost:3000/form-register/{this.props.id}</a> */}
    </td>
    <td class="md_tablet6_tbody_td">
              {this.props.createTime}
    </td>
    <td class="md_tablet6_tbody_td">
    <a onClick = {()=> this.toListContact(this.props.contactId)} >{this.state.groupName} </a>
    </td>
    <td class="md_tablet6_tbody_td">
    <a class="fas fa-eye margin_td_fontawsome" onClick = {()=> this.toFormEdit(this.props.id)} title="Preview"> </a>
    {/* <a class="fas fa-trash-alt margin_td_fontawsome" title="Delete" onClick={()=>this.openModal()}  > </a> */}
    <a class="fas fa-copy" title="Copy Embeded Code" onClick={()=>this.copyCode()} > </a>
    </td>
   {/* MODAL */}
   <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.updateListVisible} width="410" height="360" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<span class="contact1-form-title">
					{this.props.contactEmail}
				</span>

				<div className="wrap-input1 validate-input" >
					<input  value={this.state.updateList.name} onChange={this.handleChange3} className="updatename input1" type="text"  placeholder="New Group Name"/>
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" >
					<input value={this.state.updateList.description} onChange={this.handleChange2}  className="updatedescription input1" type="text" name="email" placeholder="Description"/>
					<span class="shadow-input1"></span>
				</div>

			</form>
                </Modal>
                <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.deleteVisible} width="410" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                  <div class="">
                  <div class="modal-header">
                   			
                    <h4 class="modal-title">Are you sure?</h4>	
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  </div>
                  <div class="modal-body">
                    <p>Do you really want to delete this form? This process cannot be undone.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" onClick={()=>this.closeModal()} class="btn btn-info" >Cancel</button>
                    <button type="button" onClick={()=>this.deleteForm()} class="btn btn-danger">Delete</button>
                  </div>
                </div>
                </Modal>
    <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
{/* END MODAAL */}
</tr>

          );
      }

      sendCampaign(){
        axios.post(`${Config.API_URL}campaign/send/?id=${this.props.id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);

        }).catch(error=>{
          console.log(error.response.data)
        }) 
      }
    

    toListContact=(id)=>{        
        this.props.history.push({
            pathname:`/dashboard/contacts-group/:${this.state.contactId}`,
            state : {
              id: this.state.contactId,
              name:this.state.groupName
            }})
        }
      deleteForm=()=>{
        axios.post(`${Config.API_URL}form/delete/${this.props.id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.closeModal()
          
          this.props.update()
          this.addNotification("Delete Form")
        }).catch(error=>{
          console.log(error.response.data)
        }); 
      }

      toFormEdit = (id)=> {        
        this.props.history.push({
            pathname:`/edit-form/${id}`,
            state : {
              id: id
            }
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
    toCampaignDetail = (id)=> {        
        this.props.history.push({
            pathname:`/campaigns/detail/:${id}`,
            state : {
              id: id,
              bodyJson: this.props.bodyJson
            }
        });
        }

        deleteForm(){

        }
    saveUpdatedList(){
     
      console.log(`${Config.API_URL}groupcontact/edit/${this.props.contactId}`);

      axios.put(`${Config.API_URL}groupcontact/edit/${this.props.contactId}`,
       this.state.updateList,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res)
          // this.getAllListContact();

          this.closeModal();
         
          this.props.update();
          this.addNotification()
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
        deleteVisible : true,
         
      });
    }
    
    closeModal(){
      this.setState({
        deleteVisible : false
      },()=>console.log(this.state.deleteVisible));
    }
}



export default withRouter(FormRow);



