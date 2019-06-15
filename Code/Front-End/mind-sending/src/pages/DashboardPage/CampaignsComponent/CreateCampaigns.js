import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';
import apiCaller from './../../../utils/apiCaller';
import ChooseTemplateModal from './../../../components/modals/ChooseTemplateModal';
import axios from 'axios';
import * as Config from './../../../constants/Config';

class CreateCampaign extends Component{
   constructor(props) {
     super(props);

     this.state = {
      modalIsOpen: false,
       selectValue: "",
      campaignName:this.props.newCampaign,
       visible: true,
       dropdown_visible: false,
       toVisible: false,
       fromVisible: false,
       subjectVisible: false,
       contentVisible: false,
        lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}]
       
     };
     this.handleChange = this.handleChange.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
   }
  
   
  //  componentDidMount (){
  //    console.log(`${Config.API_URL}groupContacts`);
  //   axios.get(`${Config.API_URL}groupContacts`)
  //   .then(response => {
  //     this.setState({
  //       lists: response.data
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  //  }


   clickToOpen= (id)=>{
     switch(id){
       case 1: 
         this.setState({toVisible:true});
          break;
       case 2: 
          this.setState({fromVisible:true});
          break;
        case 3: 
        this.setState({subjectVisible:true});
        break;
      case 4: 
        this.setState({contentVisible:true})
        break;
        default: return;
     }
   }
   handleChange(event) {
    this.setState({selectValue: event.target.value});
    console.log("now" + this.state.selectValue);
  }

	
  render(){
    var lists = this.state.lists;
     return (
      <div className="new-campaign-container">
      <div className="new-campaign-header">
        <h3>Campaign Name: 
          <span style={{"color": "#007bff"}}>{this.props.newCampaign}</span> 
        </h3>   
      </div>
      <table className="full">
        <tr>
          <td><div className="c-slatMeta c-checklistSlat flex padding--lv3 ">
            <div className="c-slatMeta_info flex">
              
              <div className="c-slatInfo flex">
                <div className="c-slatInfoBody min-width--lv0">
                  <h4 className="c-slatInfoTitle !margin--lv0">To</h4>
                  <div data-dojo-attach-point="itemContent">
                    <div id="uniqName_47_103" widgetid="uniqName_47_103">
                      <div>
                        <p className="c-slatInfoType !margin--lv0 full-width fsi dim-el">
                          Who are you sending this campaign to?
                        </p>
                        <div className={"open-div " + (this.state.toVisible ? " visibleTrue ": "")}>
                          <table className="tb-list">
                              <tr>
                                  <th><label for="audience-list">Choose A List</label></th>
                                  <th><span role="option" class="">Segment List</span></th>
                              </tr>
                              <tr>
                                  <td><select className="inputContact" style={{"width": "250px"}} value={this.state.selectValue} onChange={this.handleChange} type="text" tabindex="-1" readonly="readonly" role="presentation">
                            {lists.map(list => <option value={list.name}  key={list.id}>{list.name}</option>)}
                            </select></td>
                                  <td><select className="inputContact" style={{"width": "250px"}} value="Χ " type="text" tabindex="-1" readonly="readonly" role="presentation">
                            {lists.map(list => <option value={list.name} key={list.id}>{list.name}</option>)}
                            </select></td>
                              </tr>
                          </table>
                        </div>
                      
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     </td>
    <td><div className="c-slatMeta_action centered">
              <a 
                onClick={()=>this.clickToOpen(1)}
                className={"btn-create-segment " + (this.state.toVisible ? "open-div " : "")}
              >
                Add Recipients
              </a>
            </div></td>
  </tr>
          <tr>
          <td><div className="c-slatMeta c-checklistSlat flex padding--lv3 ">
            <div className="c-slatMeta_info flex">
              <div className="c-slatInfoImage justify-content--center v-slatInfoImage--visible">
                <div className="c-slatInfoIcon">
                  <span className="freddicon tick-circle dim2" />
                </div>
              </div>
              <div className="c-slatInfo flex">
                <div className="c-slatInfoBody min-width--lv0">
                  <h4 className="c-slatInfoTitle !margin--lv0">From</h4>
                  <div data-dojo-attach-point="itemContent">
                    <div id="uniqName_47_103" widgetid="uniqName_47_103">
                      <div>
                        <p className="c-slatInfoType !margin--lv0 full-width fsi dim-el">
                          Who is sending this campaign?
                        </p>
                        <div className={"open-div " + (this.state.fromVisible ? " visibleTrue ": "")}>
                          <table className="tb-list">
                              <tr>
                                  <th><label for="audience-list">Sender Name</label></th>
                                  <th><span role="option" class="">Email Address</span></th>
                              </tr>
                              <tr>
                                  <td><input className="inputContact" style={{"width": "250px"}}  type="text" />
                            </td>
                                  <td><input className="inputContact" style={{"width": "250px"}}  type="text" />
                            </td>
                              </tr>
                          </table>
                        </div>
                       </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     </td>
    <td><div className="c-slatMeta_action centered">
              <a onClick={()=>this.clickToOpen(2)}
               className={"btn-create-segment " + (this.state.fromVisible ? "open-div " : "")}
              >
                Add From
              </a>
            </div></td>
  </tr>
  <tr>
          <td><div className="c-slatMeta c-checklistSlat flex padding--lv3 ">
            <div className="c-slatMeta_info flex">
              <div className="c-slatInfoImage justify-content--center v-slatInfoImage--visible">
                <div className="c-slatInfoIcon">
                  <span className="freddicon tick-circle dim2" />
                </div>
              </div>
              <div className="c-slatInfo flex">
                <div className="c-slatInfoBody min-width--lv0">
                  <h4 className="c-slatInfoTitle !margin--lv0">Subject</h4>
                  <div data-dojo-attach-point="itemContent">
                    <div id="uniqName_47_103" widgetid="uniqName_47_103">
                      <div>
                        <p className="c-slatInfoType !margin--lv0 full-width fsi dim-el">
                          What's the subject line for this campaign?
                        </p>
                        <div className={"open-div " + (this.state.subjectVisible ? " visibleTrue ": "")}>
                          <table className="tb-list">
                              <tr>
                                  <th><label for="audience-list">Subject</label></th>
                                 
                              </tr>
                              <tr>
                                  <td><input cols="1" rows="1" className="inputContact"  type="text" />
                            </td>
                                  
                              </tr>
                          </table>
                        </div>
      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     </td>
    <td><div className="c-slatMeta_action centered">
              <a
               onClick={()=>this.clickToOpen(3)}
               className={"btn-create-segment " + (this.state.subjectVisible ? "open-div " : "")}
              >
                Add Subject
              </a>
            </div></td>
  </tr>
  
  <tr>
          <td><div className="c-slatMeta c-checklistSlat flex padding--lv3 ">
            <div className="c-slatMeta_info flex">
              <div className="c-slatInfoImage justify-content--center v-slatInfoImage--visible">
                <div className="c-slatInfoIcon">
                  <span className="freddicon tick-circle dim2" />
                </div>
              </div>
              <div className="c-slatInfo flex">
                <div className="c-slatInfoBody min-width--lv0">
                  <h4 className="c-slatInfoTitle !margin--lv0">Content</h4>
                  <div data-dojo-attach-point="itemContent">
                    <div id="uniqName_47_103" widgetid="uniqName_47_103">
                      <div>
                        <p className="c-slatInfoType !margin--lv0 full-width fsi dim-el">
                          Design your email's content?
                        </p>
                       <div className="flex-half" />
      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     </td>
    <td><div className="c-slatMeta_action centered">
              <a
              
              onClick={this.showModal}
                className="btn-create-segment"
              >
                Design Email
              </a>
            </div></td>
  </tr>
  
</table>
<ChooseTemplateModal visible={this.state.modalIsOpen} />
      
      </div>

      );
  }
  openModal() {
    console.log("open now");
    this.setState({modalIsOpen: true});

    console.log("modal is open:" + this.state.modalIsOpen)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  showModal =()=>{
    this.props.onOpenModal();
  }
}
const mapStateToProps = (state) => {
  return {
    newCampaign: state.newCampaign
  }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return{
      onOpenModal: ()=> {
        dispatch(actions.openAllTemplatesList())
      }
    };
  };
export default connect(mapStateToProps, mapDispatchToProps) (CreateCampaign);
