import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from '../../constants/Config';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class AutoRow extends Component {
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
         sendCampaignVisible: false,
         auth_token:"",
         isModalVisible:false
        };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
    //  this.sendCampaign = this.sendCampaign.bind(this);
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

  
     componentDidMount(){
      const appState = JSON.parse(localStorage.getItem('appState'));
      this.setState({
          auth_token: appState.user.auth_token
      })
     }

      render(){
          return( 
<tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
<td class="md_tablet6_tbody_td"><a>{this.props.status}</a></td>
    <td class="md_tablet6_tbody_td">
    <a onClick={()=> this.toCampaignDetail(this.props.id)}> {this.props.campaignName} </a>
    </td>
    <td class="md_tablet6_tbody_td"></td>
    
    <td class="md_tablet6_tbody_td">
    <i 
    //  onClick={() => this.sendCampaign()} 
       onClick={()=>this.openModal()}
      class={`fas fa-pause-circle ${this.props.campaignName == "Starting" ? "" : 'activeText'}`}></i>
    
    </td>
   {/* MODAL */}
   <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.isModalVisible} width="440" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      <div class="modal-header">
        <h4 class="modal-title">Are you sure?</h4>	
           <button type="button" onClick={()=>this.closeModal()} class="close" data-dismiss="modal" aria-hidden="true">×</button>
             </div>
                       <div class="modal-body">
                         <p>Do you want to pause your automation campaign</p>
                       </div>
                       <div class="modal-footer">
                         <button type="button" onClick={()=>this.closeModal()} class="btn btn-info" >Cancel</button>
                         <button type="button" onClick={()=>this.sendCampaign()} class="btn btn-danger">Pause</button>
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
    toCampaignDetail = (id)=> {        
        this.props.history.push({
            pathname:`/campaigns/detail/:${id}`,
            state : {
              id: id,
              bodyJson: this.props.bodyJson
            }
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
        isModalVisible : true,
         
      });
    }
    
    closeModal() {
      this.setState({
        isModalVisible : false
      });
    }
}



export default withRouter(AutoRow);



