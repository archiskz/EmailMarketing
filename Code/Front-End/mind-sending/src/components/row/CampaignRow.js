import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import * as Config from '../../constants/Config';
import Modal from 'react-awesome-modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import imgLoad from './../../assets/img/ajax-loader.gif'

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
         sendCampaignVisible: false,
         auth_token:"",
         isModalVisible:false,
         isLoading: false,
         isSend:false
        };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
    //  this.sendCampaign = this.sendCampaign.bind(this);
      }
      addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Send Campaign",
          message: "Send Campaign Success!",
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
     }

      render(){
          return( 
<tr className={"md_tablet6_tbody_tr " + (this.state.checked ? " rowSelected " : "") } onClick={this.onSelectedRow}>
<td class="md_tablet6_tbody_td"><a>{this.props.status == "Draft" && this.state.isSend? "Sending" : this.props.status}</a></td>
    <td class="md_tablet6_tbody_td">
    <a onClick={()=> this.toCampaignDetail(this.props.id)}> {this.props.campaignName} </a>
    </td>
    <td class="md_tablet6_tbody_td">
      {`${this.props.delivery == null ? `0` : this.props.delivery}`}
    </td>
    
    <td class="md_tablet6_tbody_td">
    {`${this.props.open == null ? `0` : this.props.open}`}
    </td>
    <td class="md_tablet6_tbody_td">
    {`${this.props.click == null ? `0` : this.props.click}`}
    </td>
    <td class="md_tablet6_tbody_td">
    <i 
    style={{"pointer":"cursor", marginRight: "10px"}}
    //  onClick={() => this.sendCampaign()} 
       onClick={()=>this.openModal()}
      class={`fas fa-paper-plane ${this.props.status == "Sending" || this.props.status == "Done" ? "activeText" : ''}`}></i>
      <a class="fas fa-copy" title="Copy Embeded Code" onClick={()=>this.copyCampaign()} > </a>
    
    </td>
   {/* MODAL */}
   <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.isModalVisible} width="440" height="250" effect="fadeInUp" onClickAway={() => this.closeModal()}>
      <div class="modal-header">
        <h4 class="modal-title">Are you sure?</h4>	
           <button type="button" onClick={()=>this.closeModal()} class="close" data-dismiss="modal" aria-hidden="true">×</button>
             </div>
                       <div class="modal-body">
                         <p className={`${!this.state.isLoading ? "" : "activeText"}`}>Do you want to start your campaign</p>
                         <p className={`${this.state.isLoading ? "" : "activeText"}`}>Your Campaign is ready for sending 
                         Please Wait</p><img className={`${this.state.isLoading ? "" : "activeText"}`} style={{"marginLeft":"15px"}} src={imgLoad} alt="loading..." />
                       </div>
                       <div class="modal-footer">
                         <button type="button" onClick={()=>this.closeModal()} class="btn btn-info" >Cancel</button>
                         <button type="button" onClick={()=>this.sendCampaign()} class="btn btn-danger">Start</button>
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

      async sendCampaign(){
        var self = this
       this.setState({isLoading: true})
       this.addNotification()
       // this.props.updateList();
       this.setState({isSend: true})
       this.closeModal()
      const data = await axios.post(`${Config.API_URL}campaign/send/?id=${this.props.id}`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
        .then(res => {
          console.log(res.data);
          this.addNotification()
          this.props.updateList();
          this.closeModal()
        }).catch(error=>{
          console.log(error.response)
        }) 
       
       
        
      }

      toListContact = (id)=> {        
        this.props.history.push({
            pathname:`/dashboard/contacts/:${id}`,
            state : id
        });
        }
        renderLoading(){
          if (this.state.isLoading &&
            this.state.msElapsed > this.showSpinnerIfReturnGreaterThanMs) {
            return <h1>LOADING</h1>;
        } else if (this.state.isLoading &&
            this.state.msElapsed <= this.showSpinnerIfReturnGreaterThanMs) {
            return (null);
        }
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
              bodyJson: this.props.bodyJson,
              status: this.props.status
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



export default withRouter(ListRow);



