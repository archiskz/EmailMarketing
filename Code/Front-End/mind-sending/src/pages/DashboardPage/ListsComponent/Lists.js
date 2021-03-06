import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ListRow from './../../../components/row/ListRow';
import Pagination from './../../../components/row/Pagination';
import Modal from 'react-awesome-modal';
import * as Config from './../../../constants/Config';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { timeout } from 'q';


class Lists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newList: {
                name: "",
                description: ""
            },
            createListVisible: false,
            groupContacts: [{}],
            groupContactsFilter: [{id:"",name:"",description:""}],
            visible: true,
            dropdown_visible: false,
            existedGroup: "",
            auth_token: "",
            allCountries: [{}],
            currentCountries: [],
            currentPage: null,
            totalPages: null

        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({displayMenu: false}, () => {
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
            dismiss: {duration: 2000},
            dismissable: {click: true}
        });
    }

    onToggleDropdown = () => {
        this.setState({
            dropdown_visible: !this.state.dropdown_visible
        })
    }

    componentDidMount() {
        const appState = JSON.parse(sessionStorage.getItem('appState'));
        this.setState({
            auth_token: appState.user.auth_token
        },()=> this.getAllListContact() )
       
    }
    handleSearch = (event) => {
        var searchValue = event.target.value;
        var groupContactsList = this.state.groupContactsFilter
        if(searchValue !== ""){
             groupContactsList = groupContactsList.filter(item => item.name.toLowerCase().includes(searchValue));
             if(groupContactsList.length > 0){
                this.setState({
                    allCountries: groupContactsList,
                    currentCountries: groupContactsList.slice(0, 8)
                 });
             }else {
                this.setState({
                    allCountries: [{}],
                    currentCountries: this.state.groupContactsFilter.slice(0,0)
                 }); 
             }
             
        } else {
            this.setState({
                allCountries: this.state.groupContactsFilter,
                currentCountries: this.state.groupContactsFilter.slice(0,8)
             });
        }
       
    }

    render() {
        var lists = this.state.groupContacts; 
        var {
            allCountries,
            currentCountries,
            currentPage,
            totalPages
          } = this.state;
          var totalCountries = allCountries.length;
          if(totalCountries == 0){
            totalCountries = 1
          }
            if (totalCountries === 0) return null
          else return (
            <div className="">
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
                        
                            <header className="row">
                                <div className="col-md-6">
                                    <span>
                                    <h1 className="">
                                        <span className="pageTitle-css__title-heading___3H2vL">Group Lists
                                            <span>&nbsp;</span>
                                        </span>
                                    </h1>
                                    </span>
                                </div>
                                <div style={{"float":"right"}}>
                                                    <Link to="/dashboard/segmentation" style={{"marginLeft":"0px !important"}} className="ml0 btn_create_contact ">
                                                        <i className="sg-icon sg-icon-segment"></i>
                                                        Create Segment
                                                    </Link>
                                                    <a style={{"marginLeft":"0px !important"}} onClick={() => this.openModal()} className="ml0 btn_create_contact ">
                                                        <i className="sg-icon sg-icon-segment"></i>
                                                        Create Group
                                                    </a>
                                                   
                                                    </div>
                                {/* <div className="col-md-6">
                            
                                    <ul  className={"dropdown-menus " + (this.state.dropdown_visible ? "dropdown-active" : "")} data-dropdown-menu="true" data-role="bulk-actions-menu">
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts-file" className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-csv"></i>
                                            <span>Upload CSV</span>
                                        </Link>
                                        <Link data-role="dropdown-link" to="/dashboard/add-contacts"
                                              className="dropdown-link dropdown-link-with-icon">
                                            <i className="sg-icon sg-icon-contacts-alt"></i>
                                            <span>Manual Add</span>
                                        </Link>
                                    </ul>
                                </div> */}
                            </header>
                            <section className="row">
                                <div className="col-md-3">
                                    <section>
                                        <div className="wrap">
                                            <form class="subscribe-box" id="newsletter-form">
                                                {/* <div class="input-field input-field-medium sticky-button">
                                                    <label for="newsletter-email">
                                                        <input id="newsletter-email" onChange={this.handleSearch} type="email" name="email"
                                                               placeholder="Search list"/>
                                                    </label>
                                                    <button class="button button-primary button-big"
                                                            id="subscribe-button-footer" type="submit"><i
                                                        class="btn_searching fa fa-search"></i></button>
                                                </div> */}
                                                <div class="form-group has-search">
                                                    <span class="fa fa-search form-control-feedback"></span>
                                                    <input onChange={this.handleSearch} type="text" class="form-control" placeholder="Search Group"/>
                                                </div>
                                                <div class="error-label"></div>
                                                
                                            </form>
                                        </div>

                                    </section>
                                </div>
                            </section>
                            <section>
                                <div className="infinitelyScrollable-css__container___pDiPC"
                                     data-infinitely-scrollable="true">
                                    <section>
                                        <div className="md_tablet1">
                                            <div className="md_tablet2">
                                                <div className="md_tablet3">
                                                    <div style={{"width":"50%", "float":"left"}}>
                                                        <h4 className="md_tablet_h4">Groups List</h4>
                                                        <p className="md_tablet_p">Here is the list of your Groups: {totalCountries} Groups </p>
                                                    </div>
                                                   
                                                </div>
                                                <div className="md_tablet4">
                                                    <div className="md_tablet5">
                                                        <table className="table1 table-striped table-hover">
                                                        {/* {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )} */}
                                                            <thead className=" ">
                                                           
                                                            <tr className=" ">
                                                                {/* <th className="md_tablet6_th" scope="col"></th> */}
                                                                <th className=" " scope="col">Group's Name
                                                                </th>
                                                                <th className=" " scope="col">Description
                                                                </th>
                                                                <th className=" " scope="col">Contacts</th>
                                                                <th className=" " role="presentation">

                                                                    <div className=" "
                                                                         onClick={this.showDropdownMenu} tabindex="0"
                                                                         type="text('Action')"
                                                                         data-dropdown-toggle="true"
                                                                         data-role="bulk-actions-toggle2">

                                                                        Action
                                                                       
                                                                    </div>
                                                                   

                                                                </th>
                                                            </tr>

                                                            </thead>
                                                            <tbody>
                                                            {/* {lists.map(list => (
                                                                <ListRow
                                                                    update={this.getAllListContact}
                                                                    key={list.index}
                                                                    contactId={list.id}
                                                                    contactEmail={list.name}
                                                                    contactStatus={list.description}
                                                                    contactDateAdded={list.totalContacts}/>
                                                            ))} */}
                                                            {
                                                                this.renderGroupList(currentCountries) 
                                                                
                                                            }

                                                            </tbody>
                                                            <Pagination
                totalRecords={totalCountries}
                pageLimit={8}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </section>


                                </div>
                            </section>
                       
                    </div>
     
                    

             
                        
                    </div>
              
                   
            
        
    
  {/* MODAL */}
                <Modal style={{"paddingLeft": "10px","paddingRight": "10px"}} visible={this.state.createListVisible} width="410" height="360" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <form class="contact1-form validate-form">
				<span class="contact1-form-title">
					Create New Group
				</span>

                        <div className="wrap-input1 validate-input">
                            <input value={this.state.newList.name} onChange={this.handleChange1} className="name input1"
                                   type="text" name="name" placeholder="New Name"/>
                            
                        </div>
                        <div style={{"width":"100%","textAlign":"center"}}>
                        <p style={{"color":"red","textAlign":"center"}} class="">{this.state.existedGroup}</p>
                        </div>
                        
                        <div class="wrap-input1 validate-input">
                            <input value={this.state.newList.description} onChange={this.handleChange2}
                                   className="description input1" type="text" name="email"
                                   placeholder="New Description"/>
                            <span class="shadow-input1"></span>
                        </div>

                        {/* <div class="container-contact1-form-btn">
                            <a style={{"marginLeft":"30px","width":"150px", "float":"left", "color":"white"}} disabled={!this.state.newList.name} onClick={() => this.saveNewList()} className={`btn_begin_create_campaign ${this.state.newList.name ? "" : "disabled"}`}>
						<span>
							Create
						</span>
                            </a>
                            <a style={{"marginLeft":"30px","width":"150px", "float":"left", "color":"white"}} onClick={() => this.closeModal()} class="btn_begin_create_campaign">
						<span>
                            Cancel
						</span>
                            </a>
                        </div> */}
                        <div class="modal-footer">
                    <button type="button" onClick={()=>this.closeModal()} class="btn btn-info">Cancel</button>
                    <button type="button" onClick={() => this.saveNewList()}  className={`btn btn-danger ${this.state.newList.name ? "" : "disabled"}`} >Create</button>
                    
                  </div>
                    </form>
                </Modal>

                {/* END MODAAL */}
            </div>
        );
    }
renderGroupList(currentCountries){
    if(this.state.currentCountries.length ==0){
        return <div style={{"width":"100%","textAlign":"center","fontSize":"17px","position":"absolute","color":"red"}}>No Records Found</div>
        
    }
    console.log(this.state.currentCountries)
     return (
        this.state.currentCountries.map((list,index) => (
            <ListRow
                update={this.getAllListContact}
                key={index}
                contactId={list.id}
                contactEmail={list.name}
                contactStatus={list.description}
                contactDateAdded={list.totalContacts}/>
        ))
    )
}
    
    onPageChanged = data => {
        const { allCountries } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        console.log("current page" + totalPages)
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentCountries, totalPages });
      };
    

    getAllListContact = () => {
        console.log(this.state.auth_token);
        axios.get(`${Config.API_URL}groupContacts`,{ 'headers': { 'Authorization': `${this.state.auth_token}` } })
            .then(res => {
                // console.log(res.data)
                // const listContacts = [{}];
                // const listContacts = res.data;
                // console.log(listContacts);
                this.setState({allCountries : res.data,
                    groupContactsFilter: res.data,
                    currentCountries: res.data.slice(0,8)
                })
            }).catch(function (error) {
            console.log(error);
        });
    }

    saveNewList() {
      var self = this;

        axios.post(`${Config.API_URL}groupContact/create`, this.state.newList, { 'headers': { 'Authorization': `${this.state.auth_token}` } })
            .then(res => {
                console.log(res.data)
                this.getAllListContact();
                this.closeModal();
                this.addNotification()
                this.setState({
                    newList: {
                        name: "",
                        description: ""
                    }
                })
            })
            .catch((error) => {
                console.log(error.response.data);
                self.setState({
                    existedGroup: "This group name is existed"
                })
            })
    }


    handleChange1 = (event) => {
        var name = event.target.value;
        this.setState({
            newList: {
                name: name,
                description: this.state.newList.description
            }
        });
    }
    handleChange2 = (event) => {
        var desc = event.target.value
        this.setState({
            newList: {
                name: this.state.newList.name,
                description: desc
            }
        });
    }

    openModal() {
        this.setState({
            createListVisible: true
        });
    }

    closeModal() {
        this.setState({
            createListVisible: false
        });
    }

}

export default Lists;
