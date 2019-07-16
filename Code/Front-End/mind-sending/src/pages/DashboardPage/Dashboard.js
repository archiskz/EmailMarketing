import React, {Component} from 'react';
import SideBar from './../../components/SideBar';
import Automations from './Automations';
import Lists from './ListsComponent/Lists';
import Campaigns from './CampaignsComponent/Campaigns';
import Reports from './Reports';
import SubDashboard from './SubDashboard';
import AddContact from './ListsComponent/AddContacts';
import CreateList from './ListsComponent/CreateList';
import CreateContact from './ContactComponent/CreateContact';
import ViewUserProfile from './UserComponent/ViewUserProfile';
import EmbededForm from './EmbededFormComponent/EmbededForm';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Templates from './TemplatesComponent/Templates';
import AddContactsFile from './ListsComponent/AddContactsFile';
import CreateCampaign from './CampaignsComponent/CreateCampaigns';
import Profile from './UserComponent/ViewUserProfile';
import InviteMails from './InviteComponent/InviteMails';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }



	
  render(){
     return (
       <div className="dashboard-main">

          <SideBar /> 
       <div className="dashboard-component">
       
           <Switch >
             <Route path="/dashboard" exact component={SubDashboard} />
             {/* <Route path="/dashboard/view-user-profile" exact component={ViewUserProfile} /> */}
             <Route path="/dashboard/campaigns"  component={Campaigns} />
             <Route path="/dashboard/add-contacts"  component={AddContact} />
             <Route path="/dashboard/add-contacts-file"  component={AddContactsFile} />
             <Route path="/dashboard/lists" component={Lists} />
              <Route path="/dashboard/embededform" component={EmbededForm} />
             <Route path="/dashboard/reports" component={Reports} />
              <Route path="/dashboard/templates" component={Templates} />
             <Route path="/dashboard/automations" component={Automations} />
             <Route path="/dashboard/create-list" component={CreateList} />
             <Route path="/dashboard/contacts" render={()=> (<CreateContact title='All Contacts'/>)} />
             <Route path="/dashboard/contacts/:id" component={CreateContact} />
             <Route path="/dashboard/profile" component={Profile} />
             <Route path="/dashboard/invite-mail" component={InviteMails} />
             {/* <Route path="/dashboard/lists/:id" render={()=> (</>)} /> */}
           </Switch>
           </div>
          
           
 
  </div>
 
      );
  }

}
export default DashBoard;
