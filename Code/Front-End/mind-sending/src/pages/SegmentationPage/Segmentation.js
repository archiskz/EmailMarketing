import React, { Component } from 'react';
import axios from 'axios';
import * as Config from './../../constants/Config';
import AddContactRow from './../../components/row/AddContactRow';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withRouter } from "react-router";

 
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
      noneList: true
    };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.onChangeListsSelect = this.onChangeListsSelect.bind(this)
    this.fields = { text: 'name', value: 'id' };
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Add Contact Success!",
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
    axios.get(`${Config.API_URL}campaigns`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
    .then(res => {
      console.log(res.data);
      this.setState({listCampaigns: res.data});
    }) 
  }
  getAllAppointment=()=>{
    axios.get(`${Config.API_URL}appointments`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
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
  // if(event.target.value == '0'){
  //   this.setState({
  //     noneList: true,
  //     list: false,
  //     choose: event.target.value
  //   })
  // } else{
  //   this.setState({
  //     noneList: false,
  //     list: true,
  //     choose: event.target.value
  //   })
  this.setState({
    list: !this.state.list,
    noneList: !this.state.noneList
  })
  
  // this.setState({choose: event.target.value},()=>console.log(this.state.choose))
  
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
         {/*<section className="culture-section">
  <div className="container">
    <div className="col-md-8 col-md-offset-2">
      <h2>Slider Popup</h2>
      <h3>Easily Customized to Meet Your Needs</h3>
      <p>Create a unique slider embedded in a popup. Include valuable information while perserving space and optimizing your deisgn.</p>
    </div>
    <span className="btn_pop_up_add btn-slider">Are You Ready?</span>
  </div>
</section>*/}
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
                            
                                <a onClick={this.onSave} icon="segment" className="btn_create_contact">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Contact
                                </a>
                            
                        </div>
                    </header>

            <div className="md_tablet1">
            <p className="fix_size_add_h2" style={{"color": "black" }}>
                  {/* Please note that the contact will not receive a confirmation email. */}
                </p>
              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_size_add md_tablet2">
                
                  <div className="pd20" >
                    <div class="col-sm-6" >
                    <label className="container-cb">Add contacts and include in an existing group
                    <input onChange={this.handleCheck} checked={this.state.list} value="1" type="checkbox" name="list" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        
                        <div className={`col-sm-8 `}>
                        <h5>Choose Groups</h5>
                        <MultiSelectComponent 
                              style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important","marginBottom":"15px"}} 
                              id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                              ref={(scope) => { this.mulObj = scope; }}
                              value={this.state.group}  
                              change={this.onChangeListsSelect}
                              placeholder="Group"/>
                              
                        </div>
                        <br/>
                        
                    </div>
                            </div>
                    
              </div>
            */}
            </div>
                 <div className="md_tablet1">
                  <div className="md_tablet2">
                    <div className="md_tablet3">
                    <h4 class="md_tablet_h4">Create a segment</h4>
                    {/* <p class="md_tablet_p">Here is the list of your contacts you will add </p> */}
                    </div>
                    
                      <div className="md_tablet4">
                      <div style={{fontSize:"16px",fontWeight:"500",display:"flex",justifyContent: "flex-start",alignItems:"baseline",marginLeft:"10px","marginTop":"10px"}}>
                      Contacts match
                      <select style={{"width":"70px",marginLeft:"5px",marginRight:"5px"}} ref="selectCondition" name="select1" value="Any" class="form-control" id="exampleFormControlSelect1" >
                        <option>Any</option>
                        <option>All</option>
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
                        {this.createUI(listCampaigns,listAppointments)}   
                        </tbody>
                      </table>
                       
                    
                    
                  </div>
                 
                </div>
                </div>  


                {/* TABLECONTACT MATCH */}
                <div className="md_tablet1">
                  <div className="md_tablet2">
                  
                    {/* <div className="md_tablet3">
                    </div> */}
                      <div className="md_tablet4">
                      <p>Contacts match</p>
                      <table class="table">
                      
                        <thead>
                          <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Score</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                       
                        </tbody>
                      </table>
                       
                    
                    
                  </div>
                 
                </div>
                </div> 
          </article>
          </div>
        </div>
      </div>
    );
  }
  addClick(){
    this.setState(prevState => ({ 
    	contacts: [...prevState.contacts, {select1:"Contact details", select2:"Name" }]
    }))
    console.log(this.state.contacts)
  }
  
  createUI(listCampaigns, listAppointments){
     return this.state.contacts.map((el, i) => (
       <tr key={i}>
       <td style={{"alignItems":"baseline"}} className="pd5">
       {/* <input className="form-control" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />      */}
       
    <select ref="selectCondition" name="select1" value={el.select1 ||'Contact details'} class="form-control" id="exampleFormControlSelect1" 
    onChange={this.handleChange.bind(this, i)}>
      <option disabled selected value> -- select an option -- </option>
      <option>Contact details</option>
      <option>Contact actions</option>
    </select>
  
       </td>
       <td className="pd5">
       {/* <input   className={`form-control ${el.email == 'Contact details' ? '' : 'activeText'}`}  placeholder="First Name" name="firstName" value={el.firstName ||''} onChange={this.handleChange.bind(this, i)} />       */}
       <select ref="selectFieldDetail"  name="select2" value={el.select2 ||'Name'} className={`form-control ${el.select1 == 'Contact details' ? '' : 'activeText'}`} id="exampleFormControlSelect2" 
        onChange={this.handleChange.bind(this, i)}>
      <option disabled selected value> -- select an option -- </option>
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
      <option>Mail not opened</option>
      <option>Mail opened</option>
      <option>Mail clicked</option>
      <option>Mail not clicked</option>
    </select>
       </td>
       <td className="pd5">
      
          <select ref="selectFieldAction" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Email' || el.select2 == 'Name' || el.select2 == 'Address' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option>is</option>
          <option>is not</option>
          <option>contains</option>
          <option>doesn't contain</option>
        </select>
        <select ref="selectFieldAction" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Birthday' || el.select2 == 'Subscription date' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option>is before</option>
          <option>is after</option>
          <option>is on</option>
        </select>
        <select ref="selectFieldAction" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Mail clicked' || el.select2 == 'Mail not opened' ||el.select2 == 'Mail opened' ||  el.select2 == 'Mail not clicked' || el.select2 == 'Last click date' || el.select2 == 'Last open date' ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option>campaign</option>
          <option>appointment</option>
        </select>
        <select ref="selectFieldAction" name="select3" value={el.select3 ||''} className={`form-control ${el.select2 == 'Engagement Score'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option>is equal to</option>
          <option>is not equal to</option>
        </select>
       </td>
       <td>
          <input className={`form-control ${el.select3 == 'is' || el.select3 == "is not" || el.select3 == "contains" || el.select3 == "doesn't contain"  ? '' : 'activeText'}`}  placeholder="" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
          <select ref="selectFieldAction" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'is equal to'||el.select3 == 'is not equal to'|| el.select3 == 'is not equal to'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
          <option>1 bar</option>
          <option>2 bars</option>
          <option>3 bars</option>
          <option>4 bars</option>
          <option>5 bars</option>
        </select>

        <select ref="selectFieldAction" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'campaign'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
        
          {listCampaigns.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
           
        </select>
        <select ref="selectFieldAction" name="select4" value={el.select4 ||''} className={`form-control ${el.select3 == 'appointment'  ? '' : 'activeText'}`} id="exampleFormControlSelect1" 
            onChange={this.handleChange.bind(this, i)}>
        
          {listAppointments.map(list=>(
            <option value={list.id}>{list.name}</option>  
                                    ))}
           
        </select>

        
        <input className={`form-control ${el.select3 == 'is before'||el.select3 == 'is after'|| el.select3 == 'is on'  ? '' : 'activeText'}`} type="date"  placeholder="date" name="select4" value={el.select4 ||''} onChange={this.handleChange.bind(this, i)} />      
        
       
       </td>
       <td style={{ height:'100%'}} >
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
  handleChange(i, e) {
    const { name, value } = e.target;
    let contacts = [...this.state.contacts];
    contacts[i] = {...contacts[i], [name]: value,gcSubcriberDTOS: this.state.selectValue,};
    this.setState({ contacts });
    console.log(this.state.contacts)
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
