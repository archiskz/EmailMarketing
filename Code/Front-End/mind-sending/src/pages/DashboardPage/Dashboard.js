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

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }



	
  render(){
     return (
       < div >
      <body data-spy = "scroll" data-target = ".fixed-menu"
    data-offset = "50" >
        <header id="s-header" className="s-header s-header-black"> 
          <MenuDashboard /> 
        </header>
        
       </body>
 
  <Switch >
    <Route path="/" exact component={DashBoard} />
        <Route path="/lists" component={Lists} />
        <Route path="/campaigns" component={Campaigns} />
        <Route path="/reports" component={Reports} />
        <Route path="/automations" component={Automations} />
        </Switch>
  </div>

      );
  }

}
export default DashBoard;
