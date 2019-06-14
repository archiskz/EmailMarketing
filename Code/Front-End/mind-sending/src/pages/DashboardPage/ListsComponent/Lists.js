import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ListRow from './../../../components/row/ListRow';
import Modal from 'react-awesome-modal';

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
       
     };
     this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
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
                            <nav className="btn-list pull-right">

                                <Link  className="button button-primary button-big" to="/dashboard/create-list">
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create Segment
                                </Link>
                                
                                <a onClick={this.onToggleDropdown} className="button button-secondary-filled button-big" >
                                    {/* <i className="fa fa-users"></i> */}
                                    Add Contacts
                                </a>
                                
                            </nav>
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
                                        <button class="button button-primary button-big" id="subscribe-button-footer" type="submit"></button>
                                    </div>
                                    <div class="error-label"></div></form>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section>
                        <div className="infinitelyScrollable-css__container___pDiPC" data-infinitely-scrollable="true">
                            <section className="items-collection-container">
                                <section>           
                                <div class="tablet">

                                    <div class="rowt headert">
                                        <div class="cellt">
                                        List Name
                                        </div>
                                        <div class="cellt">
                                            Description
                                        </div>
                                        <div class="cellt">
                                            Contacts
                                        </div>
                                        <div class="cellt">
                                            Actions
                                        </div>
                                    </div>
                                    {lists.map(list=>(
                                        <ListRow
                                        key={list.index}
                                        contactId={list.id}
                                         contactEmail={list.name}
                                    contactStatus={list.description}
                                    contactDateAdded={list.totalContacts} />
                                    ))}

                                    </div>
                            
                            </section>
                        </section>
                        <a onClick={()=>this.openModal()}  className="button button-primary button-big mt15" >
                                    <i className="sg-icon sg-icon-segment"></i>
                                    Create List
                                </a>
                    </div>
                </section>
            </article>
        </div>
    </div>
  {/* MODAL */}
                <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.createListVisible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    
                    <div class="header-top-template" >Create List</div>
                    
                        <h4 style={{"textAlign": "left", "marginTop": "30px", "marginLeft":"20px"}}>
                        List Name
                    </h4>
                    <form>
                    <input value={this.state.newList.name} onChange={this.handleChange1} required className="name ml10" type="text" />
                    <h4 style={{"textAlign": "left", "marginTop": "30px", "marginLeft":"20px"}}>
                        List Description
                    </h4>
                    <input value={this.state.newList.description} onChange={this.handleChange2} required className="description ml10" type="text" />
                    <div style={{"width":"100%"}}>
                                <a onClick={()=>this.saveNewList()} icon="segment" type="submit" className="btn-save btn-create-segment" >
                                    Create
                                </a>

                                <a icon="segment" className="btn-cancel btn-create-segment" onClick={()=>this.closeModal()}>
                                    Cancel
                                </a>
                    </div>
                    
                    </form>
                </Modal>
    
{/* END MODAAL */}
    </div>
      );
  }
  

  getAllListContact=()=>{
    axios.get("http://192.168.100.106:8080/api/groupContacts",{
    })
    .then(res => {
      const listContacts = res.data;
      console.log(listContacts);
      this.setState({groupContacts:listContacts})
    })
  }

  saveNewList(){
console.log(this.state.newList);
    axios.post("http://192.168.100.106:8080/api/groupContact/create", this.state.newList)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
