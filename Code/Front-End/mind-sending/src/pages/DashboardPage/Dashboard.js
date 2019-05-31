import React, {Component} from 'react';
import MenuDashboard from '../../components/MenuDashboard';
import Automations from './Automations';
import Lists from './Lists';
import Campaigns from './Campaigns';
import Reports from './Reports';
import Home from './../HomePage/Home';

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
       < div >
      <div data-spy = "scroll" data-target = ".fixed-menu"
    data-offset = "50" >
        <header id="s-header" className="s-header s-header-black"> 
          <MenuDashboard /> 
        </header>
        <div className="dashboard-component">
        DashBoard
           <Switch >
             {/* <Route path="/" exact component={DashBoard} /> */}
             <Route path="/dashboard" exact component={Campaigns} />
             <Route path="/dashboard/lists" component={Lists} />
             <Route path="/dashboard/reports" component={Reports} />
              <Route path="/dashboard/templates" component={Templates} />
             <Route path="/dashboard/automations" component={Automations} />
           </Switch>
           </div>
       </div>
 
  
  </div>

      );
  }

}
export default DashBoard;
