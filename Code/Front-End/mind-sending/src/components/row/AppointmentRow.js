import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from '../../constants/Config';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class AppointmentRow extends Component {
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
         auth_token:""
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
      const appState = JSON.parse(sessionStorage.getItem('appState'));
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
<td class="md_tablet6_tbody_td"><a onClick = {()=> this.toListContact(this.props.contactId)} >{this.props.name}</a></td>
    <td class="md_tablet6_tbody_td">{this.props.time}</td>
    {/* <td class="md_tablet6_tbody_td">{this.props.group}</td> */}
    <td class="md_tablet6_tbody_td">{this.props.invited}</td>
    <td class="md_tablet6_tbody_td">{this.props.registed}</td>
    <td class="md_tablet6_tbody_td">
    {this.props.contactActions}
    <a class="fas fa-chart-bar margin_td_fontawsome" onClick = {()=> this.toListContact(this.props.contactId)} title="View"> </a>
    {/* <i class="fal fa-poll-h"></i> */}
    {/* <a class="fas fa-trash-alt" title="Delete"> </a> */}
    
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

				<div class="container-contact1-form-btn">
					<a onClick={()=>this.saveUpdatedList()} style={{"marginLeft":"30px","width":"150px", "float":"left", "color":"white"}} 
           className={`btn_begin_create_campaign ${this.state.updateList.name ? "" : "disabled"}`}>
						<span>
							Update
						</span>
					</a>
          <a style={{"marginLeft":"30px","width":"150px", "float":"left", "color":"white"}} onClick={() => this.closeModal()} class="btn_begin_create_campaign">
						<span>
                            Cancel
						</span>
                            </a>
				</div>
			</form>
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

      toListContact = (id)=> {        
        this.props.history.push({
            pathname:`/appointment/:${id}`,
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



export default withRouter(AppointmentRow);



