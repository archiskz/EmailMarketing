import React, {Component} from 'react';
import {isEmpty, chain, assignIn} from 'lodash';
import $ from 'jquery';
import service from '../../../utils/subcriberRepository';

class EmbededForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            lastName: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            },
            firstName: {
                value: '',
                isInputValid: false,
                errorMessage: ''
            }
        }
    }

    setErrorMessage = (error, text = '') => {
        return {
            isInputValid: error,
            errorMessage: text
        }
    };

    validateInput = (type, checkingText) => {
        switch (type) {
            case 'email':
                if (isEmpty(checkingText)) {
                    return this.setErrorMessage(false, 'Required')
                }
                if(!checkingText.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                    return this.setErrorMessage(false, 'Invalid Email')
                }
                return this.setErrorMessage(true);
            case 'firstName':
                if (isEmpty(checkingText)) {
                    return this.setErrorMessage(false, 'Required')
                }
                return this.setErrorMessage(true);
            case 'lastName':
                if (isEmpty(checkingText)) {
                    return this.setErrorMessage(false, 'Required')
                }
                return this.setErrorMessage(true);
            default:
                console.error('Invalid Type');
                break;
        }
    };

    handleInput = (event) => {
        const { name, value } = event.target;
        const newState = {...this.state[name]};
        newState.value = value;
        this.setState({[name]: newState});
    };

    handleInputValidation = (event) => {
        const { name } = event.target;
        console.log(this.state[name].value);
        const validateObj = this.validateInput(name, this.state[name].value);
        const newState = {...this.state[name]};
        newState.isInputValid = validateObj.isInputValid;
        newState.errorMessage = validateObj.errorMessage;
        this.setState({[name]: newState})
    };

    isFormValid = () => {
        let valid = true;
        Object.keys(this.state).forEach(name => {
            if(!this.state[name].isInputValid) {
                valid = false;
                return void(0);
            }
        });
        return valid;
    };

    save = (event) => {
      event.preventDefault();
      if(this.isFormValid()) {
          const value = chain($(event.target).serializeArray()).keyBy('name')
              .mapValues('value')
              .value();
          const defaultObject = {
              "address": "string",
              "dob": "string",
              "email": "abc@gmail.com",
              "firstName": "abc",
              "gcSubcriberDTOS": [
                  {
                      "groupContactId": 0
                  }
              ],
              "id": 0,
              "lastName": "abc",
              "phone": "string",
              "tag": "string",
              "type": "string"
          };
          service.createSubcriber(assignIn(defaultObject, value)).then(s => {
              alert('Success');
          }, er => {
              alert('Error');
          })
      }
    };

    render() {
        
        const getMessageTemplate = (validateObj) => {
            if (validateObj.isInputValid) {
                return null
            }
            return <div style={{color: 'red', paddingTop: '10px'}} className="error">{validateObj.errorMessage}</div>
        };

        return (
            <div className="">
                <div className="flash_notice">
                </div>
                <div className="container" data-role="main-app-container">
                    <div>
                        <article>
                            <header className="row">
                                <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">EmbededForm
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                                </div>

                            </header>
                        </article>
                        <div className="embed_signup">
                            <form onSubmit={this.save} className="embed_signup_form">
                                <div id="mc_embed_signup_scroll">
                                    <h2>Subscribe</h2>
                                    <div className="indicates-Required">
                                        <span className="asterisk">*</span> indicates Required
                                    </div>
                                    <div className="mc-field-group">
                                        <label htmlFor="email">Email Address <span className="asterisk">*</span>
                                        </label>
                                        <input type="email"
                                               onChange={this.handleInput}
                                               onBlur={this.handleInputValidation}
                                               name="email"
                                               id="email"
                                        />
                                        {getMessageTemplate(this.state.email)}
                                    </div>
                                    <div className="mc-field-group">
                                        <label htmlFor="firstName">First Name </label>
                                        <input type="text"
                                               onChange={this.handleInput}
                                               onBlur={this.handleInputValidation}
                                               name="firstName"
                                               id="firstName"
                                        />
                                        {getMessageTemplate(this.state.firstName)}
                                    </div>
                                    <div className="mc-field-group">
                                        <label htmlFor="lastName">Last Name </label>
                                        <input type="text"
                                               onChange={this.handleInput}
                                               onBlur={this.handleInputValidation}
                                               name="lastName"
                                               id="lastName"
                                        />
                                        {getMessageTemplate(this.state.lastName)}
                                    </div>

                                    <div className="clear"><input type="submit" value="Subscribe" name="subscribe"
                                                                  id="mc-embedded-subscribe"
                                                                  className="button_embed_form"/></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="section_embed">
                    <h3>Copy/paste onto your site</h3>
                
                    <pre>
                        {
                            `<form id='test-form' enctype='application/json'>
                                <h2>Subscribe</h2>
                                <div class="indicates-Required">
                                    <span class="asterisk">*</span> indicates Required
                                </div>
                                <div class="mc-field-group">    
                                    <label for="email">Email Address <span class="asterisk">*</span>
                                    </label>
                                    <input type="email" name="email" id="email">
                                    <div class="error" style="color: red; padding-top: 10px;"></div>
                                </div><div class="mc-field-group">
                                <label for="firstName">First Name </label><input type="text" name="firstName" id="firstName"><div class="error" style="color: red; padding-top: 10px;"></div></div><div class="mc-field-group"><label for="lastName">Last Name </label><input type="text" name="lastName" id="lastName"><div class="error" style="color: red; padding-top: 10px;"></div></div><div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button_embed_form" value="Subscribe"></div></div>
                            </form>
                            <script>
                            var testForm = document.getElementById('test-form');
                            testForm.onsubmit = function(event) {
                                event.preventDefault();
                                var email = document.getElementById("email").value
                            var fn = document.getElementById("firstName").value
                            var ln = document.getElementById("lastName").value
                                fetch('http://103.79.141.134:8080/api/subcriber/createForm', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob25nc29uNTciLCJKV1RBdXRob3JpdGllc0tleSI6IkN1c3RvbWVyIiwiZXhwIjoxNTYzOTg5MDA5fQ.oBE_cSorANBkQdjqjQ15ToLEHqy44K-l95_Lv64W3zqEC5WojAb2WLA-DriymgRcQgysB9snpQrr0qld55EnfQ'
                            },
                            body: JSON.stringify({email: email, firstName: fn, lastName: ln})
                            }).then(res=> console.log(res))
                            .then(res => console.log(res));
                            }
                            </script>`
                        }
                    </pre>
                    
                </div>
            </div>
        );
    }
}

export default EmbededForm;
