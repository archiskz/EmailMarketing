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
        email:""
      }]
    };
  }
  onToggleDropdown = () => {
    this.setState({
      dropdown_visible: !this.state.dropdown_visible
    })
  }

  onSave= () => {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...'
    }
    this.setState({
        // account_id: this.state.account_id,
        email: this.state.email,
        name: this.state.name
    });
    var json = JSON.stringify(this.state);
    alert(json);
    axios.post(`${Config.API_URL}subcriber/create`, 
        {json}, 
        headers
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
}




  render() {
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
                  <span className="title-h3">
                    Contact Info
                </span>
                  {this.createUI()}        
                    <a type='button' className="btn-create-segment" value='add more' onClick={this.addClick.bind(this)}>Add More</a>
                    <a onClick={this.onSave} icon="segment" className="btn-create-segment">
                      <i className="sg-icon sg-icon-segment"></i>
                        Save Contact
                  </a>
                </form>
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
    console.log(this.state.contacts)
  }
  
  createUI(){
     return this.state.contacts.map((el, i) => (
        <div className="row" key={i}>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
    	      <input className="inputContact" placeholder="Name" name="name" value={el.name ||''} onChange={this.handleChange.bind(this, i)} />
          </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <input className="inputContact" placeholder="Email" name="email" value={el.email ||''} onChange={this.handleChange.bind(this, i)} />   	  
       </div>
       <input type='button' className="btn-create-segment" value='remove' onClick={this.removeClick.bind(this, i)}/>
       </div>          
     ))
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let contacts = [...this.state.contacts];
    contacts[i] = {...contacts[i], [name]: value};
    this.setState({ contacts });
 }
 
 removeClick(i){
    let contacts = [...this.state.contacts];
    contacts.splice(i, 1);
    this.setState({ contacts });
 }

  addRowContact(){
this.setState({contacts: [...this.state.contacts,{name:"", email: ""}]})
console.log(this.state.contacts)
  }
}
export default AddContact;
