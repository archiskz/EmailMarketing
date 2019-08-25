import React, { Component } from 'react';
import axios from 'axios';
import * as Config from './../../constants/Config';
import AddContactRow from './../../components/row/AddContactRow';
import ContactRow from './../../components/row/ContactRow';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withRouter } from "react-router";
import Modal from 'react-awesome-modal';

 
class Segmentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "sonnlh53@gmailas.com",
      name: "Hong Son",
      contacts: [{
        select1:"Contact details",
        select2:"Name",
        select3:"is",
        select4:"",
      }],
      lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}],
      selectValue:"",
      selectId: 0,
      auth_token:"",
      choose:0,
      group:[],
      list: false,
      listCampaigns:[],
      listAppointments:[],
      noneList: true,
      condition: "or",
      contactSegment:[],
      createGroupVisibility: false,
      newList:{
        name: "",
        description:"",
        subcriberGCDTOS: [
          {
            subcriberId: 0
          }
        ]
      },
      isApply: false,
      existedGroup:""
    };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.onChangeListsSelect = this.onChangeListsSelect.bind(this)
    this.fields = { text: 'name', value: 'id' };
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Save Group Contact",
      message: "Save Group Contact Successfully!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
    
  }
  onChangeListsSelect(args){
    var numbers = args.value;
    let selectValue = numbers.map((select)=>{
      var select= select;
      return {
            groupContactId: select
      }
    });
   
    this.setState({selectValue}, () => { console.log('------------------', this.state)})
  }

  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }
  componentDidMount (){
    console.log(this.props.history.location.state)
    if(this.props.history.location.state != null){
      this.setState({
        group: [
          this.props.history.location.state.id
        ],
        list: true,
        noneList:false,choose:true
      })
    }
    const appState = JSON.parse(sessionStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> {this.getAllGroupContacts()
    this.getAllAppointment()
      this.getAllCampaign()
  } )
    
  }
  getAllGroupContacts=()=>{
    console.log(`${Config.API_URL}groupContacts`);
    axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(response => {
      this.setState({
        lists: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getAllCampaign=()=>{
    var self = this
    axios.get(`${Config.API_URL}campaigns/segment`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      var listCampaigns = res.data
      // listCampaigns = listCampaigns.filter(function(item){
      //   return item.status == "Done";
      // })
      console.log(res.data);
      this.setState({listCampaigns: listCampaigns});
    }) 
  }
  getAllAppointment=()=>{
    axios.get(`${Config.API_URL}appointment/segment`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      this.setState({listAppointments:res.data})
    }).catch(function (error) {
      });
  }

  onSave= () => {
    var contactList = this.state.contacts;
    var self = this;
    if(this.state.noneList == true ){
      let contacts = contactList.map((contact)=>{
        var contact= contact;
        return {
          ...contact,
          gcSubcriberDTOS:  [{
            groupContactId: 1
          }]
            
        }
        });
        this.setState({contacts: contacts},()=> {
          console.log(`${Config.API_URL}subcriber/createListSubcriber`)
    axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts,{'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then((response) => {
        if(response != null){
          // this.addNotification()
          self.props.history.push({
            pathname:'/dashboard/contacts',
            state: {
              success: "New Contacts"
            }
        });
        } 
      })
      .catch((error) => {
        console.log(error);
      });
        })
    } else {
      let contacts = contactList.map((contact)=>{
        var contact= contact;
        return {
          ...contact,
          gcSubcriberDTOS:  this.state.selectValue
            
        }
        });
        this.setState({contacts: contacts},()=> {
          console.log(`${Config.API_URL}subcriber/createListSubcriber`)
    axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts,{'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then((response) => {
        self.props.history.push({
          pathname:'/dashboard/contacts',
          state: {
            success: "New Contacts"
          }
      });
      })
      .catch((error) => {
        console.log(error);
      });
        })
    }
    
     
    
}
handleCheck=(event)=>{
  console.log(event.target.value);
  this.setState({
    list: !this.state.list,
    noneList: !this.state.noneList
  })

    }
    openModal() {
      this.setState({
        createGroupVisibility: true
      });
  }

  closeModal() {
      this.setState({
        createGroupVisibility: false
      });
  }

  saveNewList=()=>{
    var self = this
    var contactSegment = this.state.contactSegment;
   var subcriberGCDTOS=  contactSegment.map(subcriber =>({
    subcriberId: subcriber.id
   }))
   
   this.setState({
     newList:{
       ...this.state.newList,
       subcriberGCDTOS: subcriberGCDTOS
     }
   }, ()=>{
    console.log(this.state.newList)
    axios.post(`${Config.API_URL}groupContact/create/segment`,this.state.newList,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data)
      this.closeModal()
      this.addNotification()
    }).catch(function (error) {
      self.setState({
        existedGroup: "This group name is existed"
      })
    }); 
   })
  }



  render() {
    const keys = [
      "firstName",
      "lastName",
      "email",
      "address",
    ]
    var lists = this.state.lists;
    var listCampaigns = new Array;
    listCampaigns = this.state.listCampaigns
    var listAppointments =new Array;
    listAppointments = this.state.listAppointments
    var listSegment = this.state.contactSegment
    return (

      <div className role="main">
        <div className="flash_notice">
        <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
        </div>
        <div className="container" data-role="main-app-container">
          <div>
          <article>
        <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span style={{"font-family": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Segmentation
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
{/*                             
                                <a onClick={()=>this.openModal()} icon="segment" className="btn_create_contact">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save As Group
                                </a> */}
                            
                        </div>
                    </header>

            <div className="md_tablet1">
            <p className="fix_size_add_h2" style={{"color": "black" }}>
                  {/* Please note that the contact will not receive a confirmation email. */}
                </p>
            </div>
                 <div className="md_tablet1">
                  <div className="md_tablet2">
                    <div className="md_tablet3">
                    <h4 class="md_tablet_h4">Create a segment</h4>
                    </div>
                    
                      <div className="md_tablet4">
                      <div style={{fontSize:"16px",fontWeight:"600",display:"flex",justifyContent: "flex-start",alignItems:"baseline",marginLeft:"10px","marginTop":"10px"}}>
                      Contacts match
                      <select value={this.state.condition} onChange={this.handleChangeCondition.bind(this)} style={{"width":"70px",marginLeft:"5px",marginRight:"5px"}} ref="selectCondition" name="select1" class="form-control"  id="exampleFormControlSelect1" >
                        
                        <option value="or">Any</option>
                        <option value="and">All</option>
                      </select>
                      of the following conditions
                       </div> 
                      <table class="table">
                      
                        <thead>
                          <tr>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.createUI(listCampaigns,listAppointments,lists)}   
                        <button onClick={this.applySegment} style={{"marginLeft":"10px", marginTop:"10px"}} type="button" class="btn btn-primary">Apply</button>
                        </tbody>
                      </table>
                       
                    
                    
                  </div>
                 
                </div>
                </div>  


                {/* TABLECONTACT MATCH */}
                <div className="md_tablet1" >
                  <div className="md_tablet2">
                  
                    {/* <div className="md_tablet3">
                    </div> */}
                      <div className={`md_tablet4 ${this.state.isApply ? '' : 'activeText'}`} >
                      <p style={{"fontSize":"17px", fontStyle:"bold"}}>  Found: {listSegment.length} contact(s)</p>
                      <table class="table">
                      
                        <thead>
                          <tr>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Engagement Score</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                        {listSegment.length >0 ? listSegment.map(list=>(
                          <ContactRow
                                id = {list.id}
                                firstName={list.firstName}
                                key={list.index}
                                email={list.email}
                                lastName={list.lastName}
                                address={list.address}
                                dob={list.dob}
                                phone={list.dob}
                                createdTime={list.createdTime}
                                type={list.type}
                                update = {this.updatePage}
                            />
                                    )) : <tr style={{"color":"red", "textAlign":"center", "width":"100%"}}><td className=" border_bottom_none"></td><td className=" border_bottom_none"></td><p style={{"color":"red", "textAlign":"center", "width":"100%"}}>No record found</p></tr> }
                        </tbody>
                        <button onClick={()=>this.openModal()} style={{"marginLeft":"10px", marginTop:"10px"}} type="button" class={`btn btn-primary ${listSegment.length > 0 ? '':'activeText'}`}>Save as Group</button>
                      
                      </table>
                       
                    
                    
                  </div>
                  <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.createGroupVisibility} width="410" height="360" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<span class="contact1-form-title">
					Save segment as Group
				</span>

                        <div className="wrap-input1 validate-input">
                            <input value={this.state.newList.name} onChange={this.handleChangeList} className="name input1"
                                   type="text" name="name" placeholder="New Name"/>
                            
                        </div>
                        <div style={{"width":"100%","textAlign":"center"}}>
                        <p style={{"color":"red","textAlign":"center"}} class="">{this.state.existedGroup}</p>
                        </div>
                        
                        <div class="wrap-input1 validate-input">
                            <input value={this.state.newList.description} onChange={this.handleChangeList}
                                   className="description input1" type="text" name="description"
                                   placeholder="New Description"/>
                            <span class="shadow-input1"></span>
                        </div>
                        <div class="modal-footer">
                    <button type="button" onClick={()=>this.closeModal()} class="btn btn-info">Cancel</button>
                    <button type="button" onClick={() => this.saveNewList()}  className={`btn btn-danger ${this.state.newList.name ? "" : "disabled"}`} >Create</button>
                    
                  </div>
                    </form>
                </Modal>
                </div>
                </div> 
          </article>
          </div>
        </div>
      </div>
    );
  }

  handleChangeList=(e)=>{
    var value = e.target.value
    var name = e.target.name
    this.setState({
      newList: {
        ...this.state.newList,
        [name]:value
      }
    },()=>{
      console.log(this.state.newList)
    })
  }
  addClick(){
    this.setState(prevState => ({ 
    	contacts: [...prevState.contacts, {select1:"Contact details", select2:"Name" }]
    }))
    console.log(this.state.contacts)
  }
  applySegment=()=>{

    axios.post(`${Config.API_URL}subcriber/getSubcriberBySegment?condition=${this.state.condition}`,this.state.contacts,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
   .then(response => {
     this.setState({
       contactSegment: response.data,
       isApply: true
     },()=>console.log(response.data));
   })
   .catch(error => {
     console.log(error);
   });
  }
  
  createUI(listCampaigns, listAppointments,lists){
    console.log(listCampaigns)
    console.log(listAppointments)
     return this.state.contacts.map((el, i) => (
       <tr key={i}>
       <td style={{"alignItems":"baseline"}} className="pd5 border_bottom_none">
       {/* <input className="form-control" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />      */}
       
    <select ref="selectCondition" name="select1" value={el.select1 ||'Contact details'} class="form-control" id="exampleFormControlSelect1" 
      onChange={this.handleChange.bind(this, i)}>
        <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
        <option>Contact details</option>
        <option>Contact actions</option>
      </select>
  
       </td>
       <td className="pd5 border_bottom_none">
       {/* <input   className={`form-control ${el.email == 'Contact details' ? '' : 'activeText'}`}  placeholder="First Name" name="firstName" value={el.firstName ||''} onChange={this.handleChange.bind(this, i)} />       */}
       <select ref="selectFieldDetail"  name="select2" value={el.select2 ||'Name'} className={`form-control ${el.select1 == 'Contact details' ? '' : 'activeText'}`} id="exampleFormControlSelect2" 
        onChange={this.handleChange.bind(this, i)}>
      <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
      <option>Name</option>
      <option>Email</option>
      <option>Birthday</option>
      <option>Address</option>
      <option>Subscription date</option>
      <option>Engagement Score</option>
      <option>Group</option>
      
    </select>
    <select ref="selectFieldAction" name="select2" value={el.select2 ||''} className={`form-control ${el.select1 == 'Contact actions' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
        onChange={this.handleChange.bind(this, i)}>
        <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
      <option>Mail not opened</option>
      <option>Mail opened</option>
      <option>Mail clicked</option>
      <option>Mail not clicked</option>
    </select>
       </td>
       <td className="pd5 border_bottom_none">
      
          <select ref="selectFieldAction1" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Email' || el.select2 == 'Name' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is</option>
          <option>is not</option>
          <option>contains</option>
          <option>doesn't contain</option>
        </select>
        <select ref="selectFieldAction1" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Address' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option value="" selected style={{display:"none"}}>---select an option---</option>
          <option>contains</option>
          {/* <option>doesn't contain</option> */}
        </select>
        <select ref="selectFieldAction2" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Birthday' || el.select2 == 'Subscription date' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is before</option>
          <option>is after</option>
          <option>is on</option>
        </select>
        <select ref="selectFieldAction3" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Mail clicked' || el.select2 == 'Mail not opened' ||el.select2 == 'Mail opened' ||  el.select2 == 'Mail not clicked' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>campaign</option>
          <option>appointment</option>
        </select>
        <select ref="selectFieldAction4" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Engagement Score'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is equal to</option>
          <option>is not equal to</option>
        </select>
        <select ref="selectFieldAction2" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Group' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option>is group</option>
          <option>is not group</option>
        </select>
       </td>
       <td className=" border_bottom_none">
          <input className={`form-control ${el.select3 == 'is' || el.select3 == "is not" || el.select3 == "contains" || el.select3 == "doesn't contain"  ? '' : 'activeText'}`}  placeholder="" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
          <select ref="selectFieldAction5" name="select4" value={el.select4 ||'1 bar'} className={`form-control ${el.select3 == 'is equal to'||el.select3 == 'is not equal to'|| el.select3 == 'is not equal to'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value="" disabled selected style={{display:"none"}}>---select an option---</option>
          <option value="1">1 bar</option>
          <option value="2">2 bars</option>
          <option value="3">3 bars</option>
          <option value="4">4 bars</option>
          <option value="5">5 bars</option>
        </select>
        <select ref="selectFieldAction5" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'is group'||el.select3 == 'is not group'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
            <option value=""  selected style={{display:"none"}}>---select an option---</option>
          {lists.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
        </select>

        <select ref="selectFieldAction6" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'campaign'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
        <option value=""  selected style={{display:"none"}}>---select an option---</option>
          {listCampaigns.map(list=>(
            <option value={list.id}>{list.campaignName}</option>  
                                    ))}
           
        </select>
        <select ref="selectFieldAction7" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'appointment'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
        <option value=""  selected >---select an option---</option>
          {listAppointments.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
           
        </select>

        
        <input className={`form-control ${el.select3 == 'is before'||el.select3 == 'is after'|| el.select3 == 'is on'  ? '' : 'activeText'}`} type="date"  placeholder="date" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
        
       
       </td>
       <td className=" border_bottom_none" style={{ height:'100%'}} >
        <div style={{"alignItems":"baseline" , "display":"flex"}}  className="md_tablet6_tbody_td_add font_awsome_size">
          <a className="fas fa-plus-square icon_sz_add margin_td_fontawsome font_awsome_size" title="Add more" onClick={this.addClick.bind(this)}/>
          <a className={`fas fa-trash-alt icon_sz_add ${i == 0 ? 'activeText' : ''}`} title="Delete" onClick={this.removeClick.bind(this, i)} />
          </div>
        </td>
     </tr>  
      
      
          
     ))
  }
  handleChangeSelect=(event)=> {
    const { value } = event.target;

  this.setState({
    selectValue: value
  });
  // console.log(this.state.contacts)

}

handleChangeCondition=(event)=>{
  this.setState({
    condition: event.target.value
  },()=> console.log(this.state.condition))
}

  handleChange(i, e) {
    const { name, value } = e.target;
    if(name == "select1" && value =="Contact actions"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact actions", select2: "Mail not opened", select3: "campaign",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select1" && value =="Contact details"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: "Name", select3: "is",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    }
    else if((name == "select2" && value =="Birthday") || (name == "select2" && value =="Subscription date")){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is before",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select2" && value =="Engagement Score"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is equal to",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    } else if(name == "select2" && value =="Group"){
      let contacts = [...this.state.contacts];
    contacts[i] = {select1: "Contact details", select2: value, select3: "is group",select4:""};
    this.setState({ contacts });
    console.log(this.state.contacts)
    }
    
    else {
      let contacts = [...this.state.contacts];
      contacts[i] = {...contacts[i], [name]: value};
      this.setState({ contacts },()=>{
        console.log(this.state.contacts)
      });
      
    }
    
 }
 
 removeClick(i){
    let contacts = [...this.state.contacts];
    contacts.splice(i, 1);
    this.setState({ contacts });
 }

  addRowContact(){
this.setState({contacts: [...this.state.contacts,{name:"", email: ""}]})
// console.log(this.state.contacts)
  }
}
export default withRouter(Segmentation);
