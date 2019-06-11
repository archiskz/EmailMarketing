import React, { Component } from 'react';
import axios from 'axios';
class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account_id:"1",
      email: "sonnlh3@gmailas.com",
      name: "Hong Son",
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
        account_id: this.state.account_id,
        email: this.state.email,
        name: this.state.name
    });
    var json = JSON.stringify(this.state);
    alert(json);
    axios.post('http://45.77.172.104:8080/api/subcriber/create', 
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
                                <a onClick={this.onSave} icon="segment" className="btn-create-segment">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Save Contact
                                </a>
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
                  <section className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                        <input type="text" className="inputContact" placeholder="First name"/>                                       
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div className="search">
                        <input type="text" className="inputContact" placeholder="Last name"/>                                       
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                          <input type="text" className="inputContact" placeholder="Email"/>                                       
                      </div>
                    </div>
                  </section>
                </form>
              </div>
            </div>
          </article>
          </div>
        </div>
      </div>
    );
  }

}
export default AddContact;
