import React, { Component } from 'react';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import AddContactRow from './../../../components/row/AddContactRow';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
 
class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "sonnlh53@gmailas.com",
      name: "Hong Son",
      contacts: [{
        firstName: "",
        lastName:"",
        email:"",
        address:"",
        gcSubcriberDTOS: [
          {
            groupContactId: 0
          }
        ]
      }],
      lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}],
      selectValue:"",
      selectId: 0,
      auth_token:"",
      choose:0
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
    const appState = JSON.parse(localStorage.getItem('appState'));
    this.setState({
        auth_token: appState.user.auth_token
    },()=> this.getAllGroupContacts() )
    
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

  onSave= () => {
    var contactList = this.state.contacts;
    if(this.state.choose == 0 ){
      let contacts = contactList.map((contact)=>{
        var contact= contact;
        return {
          ...contact,
          gcSubcriberDTOS:  [{
            groupContactId: 1
          }]
            
        }
        });
        this.setState({contacts: contacts},()=> console.log(this.state.contacts))
    } else {
      let contacts = contactList.map((contact)=>{
        var contact= contact;
        return {
          ...contact,
          gcSubcriberDTOS:  this.state.selectValue
            
        }
        });
        this.setState({contacts: contacts},()=> console.log(this.state.contacts))
    }
    
     
    console.log(`${Config.API_URL}subcriber/createListSubcriber`)
    axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts,{'headers': { 'Authorization': `${this.state.auth_token}` } })
      .then((response) => {
        if(response != null){
          this.addNotification()
        } 
      })
      .catch((error) => {
        console.log(error);
      });
}
handleCheck=(event)=>{
  console.log(event.target.value)
  this.setState({choose: event.target.value},()=>console.log(this.state.choose))
    }



  render() {
    const keys = [
      "firstName",
      "lastName",
      "email",
      "address",
    ]
    var lists = this.state.lists;
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
                                    <span style={{"font-family": "Calibri"}} className="pageTitle-css__title-heading___3H2vL">Add Contacts Manually
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
                  Please note that the contact will not receive a confirmation email.
                </p>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_size_add md_tablet2">
                
                  <div className="pd20" >
                    <div class="col-sm-6" >
                      <label className="container-cb">
                        Add Contacts
                          <input onChange={this.handleCheck}  value="0" type="radio" name="list" class="blue" />
                          <span class="checkmark-cb"></span></label><br/>  
                                         
                    </div>
                    <div class="col-sm-6" >
                    <label className="container-cb">Add contacts and include in an existing list
                    <input onChange={this.handleCheck} value="1" type="radio" name="list" class="blue" /><span class="checkmark-cb"></span></label><br/>
                        
                        <div className={`col-sm-8 ${this.state.choose==1? '' : 'activeText'}`}>
                        <h5>Choose Lists</h5>
                        <MultiSelectComponent 
                              style={{"width": "250px !important", "borderBottom":"1px solid #ccc !important","marginBottom":"15px"}} 
                              id="defaultelement" dataSource={lists} mode="Default" fields={this.fields}  
                              ref={(scope) => { this.mulObj = scope; }}  
                              change={this.onChangeListsSelect}
                              placeholder="Favorite Sports"/>
                              
                        </div>
                        <br/>
                        
                    </div>
                            </div>
                    
              </div>
           
            </div>
                 <div className="md_tablet1">
                  <div className="md_tablet2">
                    <div className="md_tablet3">
                    <h4 class="md_tablet_h4">Add Contacts List</h4>
                    <p class="md_tablet_p">Here is the list of your contacts you will add </p>
                    </div>
                      <div className="md_tablet4">
                      <table class="table1">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">&emsp;Email&emsp;</th>
                            <th scope="col">&emsp;First Name&emsp;</th>
                            <th scope="col">&emsp;Last Name&emsp;</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.createUI()}   
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
    	contacts: [...prevState.contacts, { email: "", firstName: "",lastName: "", "address":"",dob:"" }]
    }))
    console.log(this.state.contacts)
  }
  
  createUI(){
     return this.state.contacts.map((el, i) => (
       <tr key={i}>
       <th scope="row">{i+1}</th>
       <td className="pd5">
       <input className="form-control" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />     
       </td>
       <td className="pd5">
       <input className="form-control" placeholder="First Name" name="firstName" value={el.firstName ||''} onChange={this.handleChange.bind(this, i)} />      
       </td>
       <td className="pd5">
       <input className="form-control" placeholder="Last Name" name="lastName" value={el.lastName ||''} onChange={this.handleChange.bind(this, i)} />      
       </td>
       <td>
        <div className="md_tablet6_tbody_td_add font_awsome_size">
          <a className="fas fa-plus-square icon_sz_add margin_td_fontawsome font_awsome_size" title="Add more" onClick={this.addClick.bind(this)}/>
          <a className="fas fa-trash-alt icon_sz_add " title="Delete" onClick={this.removeClick.bind(this, i)} />
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
    console.log(this.state.selectValue)
    const { name, value } = e.target;
    let contacts = [...this.state.contacts];
    contacts[i] = {...contacts[i], [name]: value,gcSubcriberDTOS: this.state.selectValue,};
    this.setState({ contacts });
    // console.log(this.state.contacts)
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
export default AddContact;
