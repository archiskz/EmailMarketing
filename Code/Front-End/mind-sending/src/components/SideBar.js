import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import logo from './../assets/img/logo.png'
class Sidebar extends Component {
constructor(props) {

    super(props);
    this.state = {
        activeClasses0: false,
        activeClasses1: false,
        activeClasses2: false,
        activeClasses3: false,
        activeClasses4: false,
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


  render(){
     return (
    <div className="sidebar-menu">
        <header className="logo1" style={{"textAlign":"center"}}>
        
            <Link to ="/" className="sidebar-icon"> <img src={logo} style={{"width":"100px", "height":"100px"}} /> </Link> 
        </header>
        <div style={{borderTop: '1px ridge rgba(255, 255, 255, 0.15)'}} />
        <div className="menuside">
            <ul id="menuside">
            
            {/* DASHBOARD */}
                <li id="menu-academico">
                    <a href="/dashboard">
                        <i className="fa fa-chart-line" /> 
                        <span style={{position: 'relative'}}>Dashboard</span>
                        <div className="clearfix" />
                    </a>

                </li>
            {/* DASHBOARD */}
             {/* CAMPAIGNS */}
             <li id="menu-academico" className={this.state.activeClasses2? "opend" : "closed"}>
                <a onClick={() => this.addActiveClass(2)}>
                    <i className="fa fa-bullhorn" />
                    <span style={{position: 'relative'}}>Campaigns</span>
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
                    <span style={{position: 'relative'}}>Automation Campaigns</span>
                    <div className="clearfix" />
                </Link>
               
            </li>

            {/* END CAMPAIGNS */}
            {/* Invite */}
            <li  className={this.state.activeClasses5 ? "opend" : "closed"} >
                <Link to = "/dashboard/invite-mail" >
                <i className="fa fa-wpforms" />
                    <span style={{position: 'relative'}}>Appointment</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* Invite */}
            {/* Embeded Form */}
            <li  className={this.state.activeClasses5 ? "opend" : "closed"} >
                <Link to="/dashboard/forms" >
                <i className="fa fa-wpforms" />
                    <span style={{position: 'relative'}}>Embeded Form</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* Embeded Form */}
             {/* LIST */}
             <li id="menu-academico" className={this.state.activeClasses0 ? "opend" : "closed"} >
                <Link to = "/dashboard/lists" >
                <i className="fa fa-list-alt" />
                    <span style={{position: 'relative'}}>Group</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* END LIST */}
            
            
            

            <li id="menu-academico" className={this.state.activeClasses3 ? "opend" : "closed"} >
              
                    <Link to="/dashboard/contacts">
                    <i className="fa fa-users nav_icon" />
                    <span style={{position: 'relative'}}>Contact</span>
                    
                    <div className="clearfix" />
                    
                    </Link>
                
            </li>
            {/* END CONTACT */}

            {/* TEMPLATE */}
            <li className={this.state.activeClasses1? "opend" : "closed"}>
                <Link to="/dashboard/templates">
                    <i className="fa fa-image" aria-hidden="true" />
                    <span style={{position: 'relative'}}>Templates</span>
                    
                    <div className="clearfix" />
                </Link>
                
            </li>
            {/* END TEMPLATE */}

            

            {/* USERPROFILE */}
                <li>
                    <Link to="/dashboard/profile">
                        <i className="fa fa-address-card" /> 
                        <span style={{position: 'relative'}}>User Profile</span>
                        <div className="clearfix" />
                    </Link>

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
