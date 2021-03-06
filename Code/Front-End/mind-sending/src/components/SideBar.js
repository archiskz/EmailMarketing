import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import logo from './../assets/img/logo.png'
import Modal from 'react-awesome-modal';
class Sidebar extends Component {
constructor(props) {

    super(props);
    this.state = {
        activeClasses0: false,
        activeClasses1: false,
        activeClasses2: false,
        activeClasses3: false,
        activeClasses4: false,
        role: "",
        auth_token:"",
        username:"",
        modalLogout:false
    };
     this.addActiveClass = this.addActiveClass.bind(this);

}

addActiveClass = (index) => {
    switch (index) {
        case 0: 
            this.setState({
                activeClasses0: !this.state.activeClasses0
            })
            return ;
        case 1:
            this.setState({
                activeClasses1: !this.state.activeClasses1
                })
            return;
        case 2:
            this.setState({
                activeClasses2: !this.state.activeClasses2
                })
                return;
            case 3:
            this.setState({
                activeClasses3: !this.state.activeClasses3
                })
                return;
            case 4:
            this.setState({
                activeClasses4: !this.state.activeClasses4
                })
                return;
            case 5:
            this.setState({
                activeClasses4: !this.state.activeClasses4
                })
                return;
            default: return;
        
    }
}
componentDidMount(){
        const appState = JSON.parse(sessionStorage.getItem('appState'));
        this.setState({
            auth_token: appState.user.auth_token,
            role: appState.user.role,
            username: appState.user.username
        })

       
    } 
    openModalLogout=()=>{
        this.setState({
            modalLogout: true
        })
    }

    closeModalLogout=()=>{
        this.setState({
            modalLogout: false
        })
    }
    onLogOut=()=>{
        console.log("Log out")
      sessionStorage.clear();
      window.location.reload();
    }


  render(){
     return (
    <div className="sidebar-menu">
        <header className="logo1" style={{padding:"10px"}}>
        
            <Link to ="/" className="sidebar-icon"> <img src={logo} style={{"width":"100px", "height":"100px"}} /> </Link> 
            {/* <p style={{"color":"white", "z-index":"100"}}>Hello, {this.state.username}</p> */}
        </header>
        
        <div style={{borderTop: '1px ridge rgba(255, 255, 255, 0.15)'}} />
        <div className="menuside">
            <ul id="menuside">
            {/* <li id="menu-academico" >
                    <a href="/">
                        <i className="fa fa-home" /> 
                        <span style={{position: 'relative'}}>Home</span>
                        <div className="clearfix" />
                    </a>

                </li> */}
            {/* DASHBOARD */}
                <li id="menu-academico" className={this.state.role == "Admin" ? "activeText" : ""}>
                    <a href="/dashboard">
                        <i className="fa fa-chart-line" /> 
                        <span style={{position: 'relative'}}>Dashboard</span>
                        <div className="clearfix" />
                    </a>

                </li>
            {/* DASHBOARD */}
             {/* CAMPAIGNS */}
             <li id="menu-academico" className={`${this.state.role == "Admin" ? " activeText" : ""} ${this.state.activeClasses2? " opend" : " closed"} `}>
                <a onClick={() => this.addActiveClass(2)}>
                    <i className="fa fa-bullhorn" />
                    <span style={{position: 'relative'}}>Email Marketing</span>
                    <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} />
                    <div className="clearfix" />
                </a>
                <Link to="/dashboard/campaigns">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>Regular Campaign</span>
                    <div className="clearfix" />
                </Link>
              
                <Link to="/dashboard/automations">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>Workflow</span>
                    <div className="clearfix" />
                </Link>
                <Link to = "/dashboard/invite-mail" >
                <i className="fa" />
                    <span style={{position: 'relative'}}>Appointment</span>
                    <div className="clearfix" />
                </Link>
            </li>

            {/* END CAMPAIGNS */}
            <li id="menu-academico" className={`${this.state.role == "Admin" ? " activeText" : ""} ${this.state.activeClasses3? " opend" : " closed"} `} >
              
                    <Link to="/dashboard/contacts">
                    <i className="fa fa-user nav_icon" />
                    <span style={{position: 'relative'}}>Contact</span>
                    
                    <div className="clearfix" />
                    
                    </Link>
                
            </li>

            <li id="menu-academico" className={`${this.state.role == "Admin" ? " activeText" : ""} ${this.state.activeClasses3? " opend" : " closed"} `}>
                {/* <a onClick={() => this.addActiveClass(3)}>
                    <i className="fa fa-users nav_icon" />
                    <span style={{position: 'relative'}}>Group Contact</span>
                    <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} />
                    <div className="clearfix" />
                </a> */}
                <Link to="/dashboard/lists">
                    <i className="fa fa-users nav_icon" />
                    <span style={{position: 'relative'}}>Group Contact</span>
                    
                    <div className="clearfix" />
                    
                    </Link>
                {/* <Link to = "/dashboard/lists" >
                <i className="fa " />
                    <span style={{position: 'relative'}}>Group</span>
                    <div className="clearfix" />
                </Link>
                <Link to = "/dashboard/segmentation" >
                <i className="fa" />
                    <span style={{position: 'relative'}}>Segment</span>
                    <div className="clearfix" />
                </Link> */}
            </li>
            
            {/* Embeded Form */}
            <li  className={`${this.state.role == "Admin" ? " activeText" : ""} ${this.state.activeClasses3? " opend" : " closed"} `} >
                <Link to="/dashboard/forms" >
                <i className="fa fa-wpforms" />
                    <span style={{position: 'relative'}}>Embeded Form</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* Embeded Form */}
             {/* LIST */}
             {/* <li id="menu-academico" className={this.state.activeClasses0 ? "opend" : "closed"} >
                <Link to = "/dashboard/lists" >
                <i className="fa fa-list-alt" />
                    <span style={{position: 'relative'}}>Group</span>
                    <div className="clearfix" />
                </Link>
            </li> */}
            {/* END LIST */}
             {/* LIST */}
             {/* <li id="menu-academico" className={this.state.activeClasses0 ? "opend" : "closed"} >
                <Link to = "/dashboard/segmentation" >
                <i className="fa fa-list-alt" />
                    <span style={{position: 'relative'}}>Segment</span>
                    <div className="clearfix" />
                </Link>
            </li> */}
            {/* END LIST */}
            
            
            

            
            {/* END CONTACT */}

            {/* TEMPLATE */}
            <li className={` ${this.state.activeClasses1? " opend" : " closed"} `}>
                <Link to="/dashboard/templates">
                    <i className="fa fa-image" aria-hidden="true" />
                    <span style={{position: 'relative'}}>Template</span>
                    
                    <div className="clearfix" />
                </Link>
                
            </li>
            {/* END TEMPLATE */}

            

            {/* USERPROFILE */}
                <li className={` ${this.state.activeClasses3? " opend" : " closed"} `}>
                <a onClick={() => this.addActiveClass(3)}>
                    <i className="fa fa-user" />
                    <span style={{position: 'relative'}}>User</span>
                    <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} />
                    <div className="clearfix" />
                </a>
                    <Link to="/dashboard/profile">
                        <i className="fa " /> 
                        <span style={{position: 'relative'}}>User Profile</span>
                        <div className="clearfix" />
                    </Link>
                    <a onClick={this.onLogOut}>
                        <i className="fa " /> 
                        <span style={{position: 'relative'}}>Log out</span>
                        <div className="clearfix" />
                    </a>

                </li>
            {/* USERPROFILE */}
           
           
           
        </ul>
        
        </div>
        <div className="sidebar-menu2">
       
        </div>
</div>
    );
    
   }
}





export default Sidebar;
