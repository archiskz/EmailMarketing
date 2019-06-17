import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
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
            case 4:
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
        <header className="logo1">
            <a href="#" className="sidebar-icon"> <span className="fa fa-bars" />MindSending </a> 
        </header>
        <div style={{borderTop: '1px ridge rgba(255, 255, 255, 0.15)'}} />
        <div className="menuside">
            <ul id="menuside">
            
            {/* DASHBOARD */}
                <li>
                    <a href="/dashboard">
                        <i className="fa fa-tachometer" /> 
                        <span style={{position: 'relative'}}>Dashboard</span>
                        <div className="clearfix" />
                    </a>

                </li>
            {/* DASHBOARD */}
                <li>
                    <a href="/dashboard/view-user-profile">
                        <i className="fa fa-tachometer" /> 
                        <span style={{position: 'relative'}}>User Profile</span>
                        <div className="clearfix" />
                    </a>

                </li>
            {/* LIST */}
            <li id="menu-academico" className={this.state.activeClasses0 ? "opend" : "closed"} >
                <Link to = "/dashboard/lists" >
                <i className="fa fa-users nav_icon" />
                    <span style={{position: 'relative'}}>Lists</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* END LIST */}

            {/* TEMPLATE */}
            <li className={this.state.activeClasses1? "opend" : "closed"}>
                <a onClick={() => this.addActiveClass(1)}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <span style={{position: 'relative'}}>Templates</span>
                    <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} />
                    <div className="clearfix" />
                </a>
                <Link to="/dashboard/templates">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>Gallery</span>
                    <div className="clearfix" />
                </Link>
                <Link to="">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>Landing Page</span>
                    <div className="clearfix" />
                </Link>
            </li>
            {/* END TEMPLATE */}

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
                <Link to="">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>View</span>
                    <div className="clearfix" />
                </Link>
            </li>

            {/* END CAMPAIGNS */}
            <li id="menu-academico" className={this.state.activeClasses3 ? "opend" : "closed"} >
               <a  onClick={() => this.addActiveClass(3)}>
                    <i className="fa fa-users nav_icon" />
                    <span style={{position: 'relative'}}>Contact</span>
                    <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} />
                    <div className="clearfix" />
                    </a>
                <Link to="/dashboard/contacts">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>View Contacts</span>
                    <div className="clearfix" />
                </Link>
                {/* <Link to="">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>Manage Contacts</span>
                    <div className="clearfix" />
                </Link>
                <Link to="">
                    <i className="fa " /> 
                    <span style={{position: 'relative'}}>View Contacts</span>
                    <div className="clearfix" />
                </Link> */}
            </li>
            {/* END CONTACT */}
        </ul>
        </div>
        <div className="sidebar-menu2">
        </div>
</div>
    );
    
   }
}





export default Sidebar;
