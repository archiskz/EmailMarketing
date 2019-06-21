import React, { Component } from 'react';
import axios from 'axios';
import * as Config from './../../../constants/Config';
import AddContactRow from './../../../components/row/AddContactRow';
class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "sonnlh53@gmailas.com",
      name: "Hong Son",
      contacts: [{
        name: "",
        email:"",
        gcSubcriberDTOS: [
          {
            groupContactId: 0
          }
        ]
      }],
      lists:[{"id":3,"name":"TesTV3","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:35:30.025","updatedTime":"string","account_id":"1","account":{"id":1,"username":"admin","fullname":"Tan123","email":"string","password":"admin","phone":"0907403553","gender":"string","address":"q7","authorityId":1,"createdTime":"2019-06-11T06:01:25.959","updatedTime":"string"},"subcribers":[]},{"id":4,"name":"Test25894","description":"Son oi Test duoc roi ne","createdTime":"2019-06-12T06:39:49.668","updatedTime":"string","account_id":"2","account":{"id":2,"username":"archis","fullname":"Archis","email":"string","password":"Ahihihi","phone":"0907403553","gender":"Male","address":"HCM","authorityId":1,"createdTime":"2019-06-12T06:38:29.065","updatedTime":"string"},"subcribers":[]}],
      selectValue:"",
      selectId: 0
    };
  }
  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }
  componentDidMount (){
    console.log(`${Config.API_URL}groupContacts`);
   axios.get(`${Config.API_URL}groupContacts`)
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
    console.log(`${Config.API_URL}subcriber/createListSubcriber`)
    axios.post(`${Config.API_URL}subcriber/createListSubcriber`, this.state.contacts)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
}




  render() {
    var lists = this.state.lists;
    return (

      <div className role="main">
        <div className="flash_notice">
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
                            <nav className="btn-list pull-right">
                                
                            </nav>
                        </div>
                    </header>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <p style={{"color": "black"}}>
                  Please note that the contact will not receive a confirmation email.
                </p>
                <form>
                  <div className="listFormPresenter-css__list-form-presenter___1RHBp">
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG"  style={{ position: 'relative' }}>
                      <input type="radio" name="contacts" id="all" defaultChecked />
                      <label className="input-radio-label" htmlFor="all">
                        <span>
                          <span data-tooltip="Recipients will be added to All Contacts by default.  You can manage your contacts using Lists and Segments." data-tooltip-pos="up" data-tooltip-length="large" className="has-underline">
                            Add contacts
                          </span>
                        </span>
                      </label>
                      <span />
                    </div>
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG"  style={{ position: 'relative' }}>
                      <input type="radio" name="contacts" id="exist"/>
                      <label className="input-radio-label" htmlFor="exist">
                        Add contacts and include in an existing list
                      </label>
                       {/* Existing List */}
                       <h5>Choose A List</h5>
                      <select className="inputContact mt15" style={{"width": "250px", "borderBottom":"1px solid #ccc !important"}}  onChange={this.handleChangeSelect} type="text" tabindex="-1" readonly="readonly" role="presentation">
                       {lists.map(list => <option value={list.id}  key={list.id}>{list.name}</option>)}
                            </select>
                  
                       {/* Existing List */}
                      <span />
                    </div>
                    <div className="input-radio-wrap radioInput-css__radio-container___3sajG"  style={{ position: 'relative' }}>
                      <input type="radio" name="contacts" id="new"  />
                      <label className="input-radio-label" htmlFor="new">
                        Add contacts and include in a new list
                      </label>
                      <span />
                    </div>
                    <section className="row">
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <section />
                      </div>
                    </section>
                  </div>
                  
                </form>
              </div>
            </div>
                 <div className="md_tablet1">
                  <div className="md_tablet2">
                    <div className="md_tablet3">
                    <h4 class="md_tablet_h4">Groups List</h4>
                    <p class="md_tablet_p">Here is the list of your Groups </p>
                    </div>
                      <div className="md_tablet4">
                  {this.createUI()}        
                    <a type='button' className="btn_create_contact4" value='add more' onClick={this.addClick.bind(this)}>Add More</a>
                    <a onClick={this.onSave} icon="segment" className="btn_create_contact4">
                      <i className="sg-icon sg-icon-segment"></i>
                        Save Contact
                  </a>
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
    	contacts: [...prevState.contacts, { name: "", email: "" }]
    }))
    // console.log(this.state.contacts)
  }
  
  createUI(){
     return this.state.contacts.map((el, i) => (
        <div className="row" key={i}>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <input className="user_contact_inputContact" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />       
       </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
    	      <input className="user_contact_inputContact" placeholder="First Name" name="name" value={el.name ||''} onChange={this.handleChange.bind(this, i)} />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <input className="user_contact_inputContact" placeholder="Last Name" name="name" value={el.name ||''} onChange={this.handleChange.bind(this, i)} />
          </div>
        
       <input type='button' className="btn_create_contact3" value='remove' onClick={this.removeClick.bind(this, i)}/>
       </div>          
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
    contacts[i] = {...contacts[i], [name]: value,gcSubcriberDTOS: [
      {
        groupContactId: this.state.selectValue
      }
    ],};
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
