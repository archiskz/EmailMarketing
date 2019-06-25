import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ListRow from './../../../components/row/ListRow';
import Modal from 'react-awesome-modal';
import * as Config from './../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
 


class Lists extends Component {
   constructor(props) {
     super(props);

     this.state = {
         newList:{
            name: "",
            description: ""
         },
        createListVisible: false,
         groupContacts: [{}],
       visible: true,
       dropdown_visible: false,
       existedGroup:""
       
     };
     this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
     this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
     this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
   }
   showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

   addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Create New Group",
      message: "Add Group Success!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
   onToggleDropdown = () => {
     this.setState({
       dropdown_visible: !this.state.dropdown_visible
     })
   }
   componentDidMount(){
     this.getAllListContact();
   }	
  render(){
    var lists = this.state.groupContacts;
     return (
	  <div className = "" >
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
                                    <span className="pageTitle-css__title-heading___3H2vL">Contact Lists
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        <div className="col-md-6">
                            

                                <Link  className="btn_create_contact" to="/dashboard/create-list">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Segment
                                </Link>
                                
                                {/* <a onClick={this.onToggleDropdown} className="btn_create_contact" > */}
                                    {/* <i className="fa fa-users"></i> */}
                                    {/* Add Contacts */}
                                {/* </a> */}
                                
                            <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </Link>
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts" className="dropdown-link dropdown-link-with-icon" >
                                            <i className="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </Link>
                                    </ul>
                        </div>
                    </header>
                    <section className="row">
                        <div className="col-md-3">
                            <section>
                                <div className="wrap">
                                <form class="subscribe-box" id="newsletter-form">
                                    <div class="input-field input-field-medium sticky-button">
                                        <label for="newsletter-email">
                                            <input id="newsletter-email" type="email" name="email" placeholder="Search list"/>
                                        </label>
                                        <button class="button button-primary button-big" id="subscribe-button-footer" type="submit"><i class="btn_searching fa fa-search"></i></button>
                                    </div>
                                    <div class="error-label"></div></form>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section>
                        <div className="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                        <section>
                    <div className="md_tablet1">
                    <div className="md_tablet2">
                        <div className="md_tablet3">
                        <h4 className="md_tablet_h4">Groups List</h4>
                        <p className="md_tablet_p">Here is the list of your Groups </p>
                        </div>
                    <div className="md_tablet4">
                        <div className="md_tablet5">
                        <table className="md_tablet6">
                            <thead className="md_tablet6_thead">
                            <tr className="md_tablet6_tr">
                                <th className="md_tablet6_th" scope="col">Group's Name</th>
                                <th className="md_tablet6_th" scope="col">Description</th>
                                <th className="md_tablet6_th" scope="col">Contacts</th>
                                <th  className="md_tablet6_th" role="presentation">
                                
                                <div className="ul_create_contact2" onClick={this.showDropdownMenu} tabindex="0" type="text('Action')" data-dropdown-toggle="true" data-role="bulk-actions-toggle2">
                                    
                                    Action
                                    <i class="fa fa-caret-down"></i>
                                    </div>
                                   { this.state.displayMenu ? (
                                    <ul className="">
                                    <li><a href="# ">Import</a></li>
                                     {this.props.contactActions}
                                   <li><a title="Edit">Edit </a></li>
                                   <li><a href="# ">Delete</a></li>

                                    </ul>
        ):
        (
          null
        )
        }
                                
                                </th>
                            </tr>
                                
                            </thead>
                            <tbody>
                            {lists.map(list=>(
                                        <ListRow
                                        update={this.getAllListContact}
                                        key={list.index}
                                        contactId={list.id}
                                         contactEmail={list.name}
                                    contactStatus={list.description}
                                    contactDateAdded={list.totalContacts} />
                                    ))}

                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>
                    <a onClick={()=>this.openModal()}  className="btn_create_contact " >
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Group
                                </a>
                    </section>

             
                        
                    </div>
                </section>
                   
            </article>
        </div>
    </div>
  {/* MODAL */}
                <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.createListVisible} width="410" height="360" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<span class="contact1-form-title">
					Create New Group
				</span>

				<div className="wrap-input1 validate-input" >
					<input  value={this.state.newList.name} onChange={this.handleChange1} className="name input1" type="text" name="name" placeholder="New Name"/>
					<span class="">{this.state.existedGroup}</span>
				</div>

				<div class="wrap-input1 validate-input" >
					<input value={this.state.newList.description} onChange={this.handleChange2}  className="description input1" type="text" name="email" placeholder="New Description"/>
					<span class="shadow-input1"></span>
				</div>

				<div class="container-contact1-form-btn">
					<a onClick={()=>this.saveNewList()}  class="contact1-form-btn">
						<span>
							Create
						</span>
					</a>
                    <a onClick={()=>this.closeModal()}  class="contact1-form-btn">
						<span>
                            Cancel
						</span>
					</a>
				</div>
			</form>
                </Modal>
    
{/* END MODAAL */}
    </div>
      );
  }
  

  getAllListContact=()=>{
    let config = {};
    config = {headers: 
        {Authorization : Config.TOKEN
}};

    console.log(config);
    axios.get(`${Config.API_URL}groupContacts`,config)
    .then(res => {
      const listContacts = res.data;
      console.log(listContacts);
      this.setState({groupContacts:listContacts})
    }).catch(function (error) {
        console.log(error.response.data);
      });
  }

  saveNewList(){

    axios.post(`${Config.API_URL}groupContact/create`, this.state.newList,{headers: {'Authorization' : Config.TOKEN}})
      .then(res => {
        console.log(res.data)
        this.getAllListContact();
        this.closeModal();
        this.addNotification()
      })
      .catch( (error)=> {
        console.log(error.response.data);
        this.setState({
          existedGroup: error.response.data
        })
      })
  }


  handleChange1=(event)=> {
      var name = event.target.value;
    this.setState({
        newList: {
            name: name,
            description: this.state.newList.description
        }
    });
}
handleChange2=(event)=> {
    var desc = event.target.value
    this.setState({
        newList: {
            name: this.state.newList.name ,
            description: desc
        }
    });
}

  openModal() {
    this.setState({
        createListVisible : true
    });
  }
  
  closeModal() {
    this.setState({
        createListVisible : false
    });
  }

}
export default Lists;
