import React, {Component} from 'react';
import SideBar from './../../components/SideBar';
import Automations from './Automations';
import Lists from './Lists';
import Campaigns from './Campaigns';
import Reports from './Reports';
import SubDashboard from './SubDashboard';


import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Templates from './Templates';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }



	
  render(){
     return (
       <div className="">

          <SideBar /> 
       <div className="dashboard-component">
       
           <Switch >
             <Route path="/dashboard" exact component={SubDashboard} />
             <Route path="/dashboard/campaigns" exact component={Campaigns} />
             <Route path="/dashboard/lists" component={Lists} />
             <Route path="/dashboard/reports" component={Reports} />
              <Route path="/dashboard/templates" component={Templates} />
             <Route path="/dashboard/automations" component={Automations} />
           </Switch>
           </div>
 
  </div>

      );
  }

}
export default DashBoard;
