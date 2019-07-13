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
                    <form className="relative_embed">
                        <textarea name="content"
                                  className="full-width-embed"
                                  readOnly={true}
                                  value={'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"\n' +
                                  '        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">\n' +
                                  '    </head>\n' +
                                  '\n' +
                                  '    <h2>Subscribe</h2>\n' +
                                  '    <div class="indicates-Required"><span class="asterisk">*</span> indicates Required</div>\n' +
                                  '    <form class="need-validation" novalidate\n' +
                                  '        action="http://103.79.141.134:8080/api/subcriber/createForm" method="POST">\n' +
                                  '        <div class="form-group">\n' +
                                  '            <label for="email">Email Address</label>\n' +
                                  '            <input type="email" name="email" class="form-control" id="email" required>\n' +
                                  '            <div class="invalid-feedback">\n' +
                                  '                Invalid email\n' +
                                  '            </div>\n' +
                                  '        </div>\n' +
                                  '        <div class="form-group">\n' +
                                  '            <label for="firstName">First Name</label>\n' +
                                  '            <input type="text" name="firstName" class="form-control" id="firstName" required>\n' +
                                  '            <div class="invalid-feedback">\n' +
                                  '                Required\n' +
                                  '            </div>\n' +
                                  '        </div>\n' +
                                  '        <div class="form-group">\n' +
                                  '            <label for="lastName">Last Name</label>\n' +
                                  '            <input type="text" name="lastName" class="form-control" id="lastName" required>\n' +
                                  '            <div class="invalid-feedback">\n' +
                                  '                Required\n' +
                                  '            </div>\n' +
                                  '        </div>\n' +
                                  '        <button type="submit" class="btn btn-primary">Subscribe</button>\n' +
                                  '    </form>\n' +
                                  '    <script>\n' +
                                  '        (function () {\n' +
                                  '            \'use strict\';\n' +
                                  '            window.addEventListener(\'load\', function () {\n' +
                                  '                // Fetch all the forms we want to apply custom Bootstrap validation styles to\n' +
                                  '                var forms = document.getElementsByClassName(\'need-validation\');\n' +
                                  '                // Loop over them and prevent submission\n' +
                                  '                var validation = Array.prototype.filter.call(forms, function (form) {\n' +
                                  '                    form.addEventListener(\'submit\', function (event) {\n' +
                                  '                        if (form.checkValidity() === false) {\n' +
                                  '                            event.preventDefault();\n' +
                                  '                            event.stopPropagation();\n' +
                                  '                        }\n' +
                                  '                        form.classList.add(\'was-validated\');\n' +
                                  '                    }, false);\n' +
                                  '                });\n' +
                                  '            }, false);\n' +
                                  '        })();\n' +
                                  '    </script>'}
                                  id="embed-form-code">
                        </textarea>
                    </form>
                </div>
            </div>
        );
    }
}

export default EmbededForm;
