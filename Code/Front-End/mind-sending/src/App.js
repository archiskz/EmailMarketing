import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './components/routes';

class App extends Component {
    render(){
  return (
    <Router>
        <div>

            {/*<Menu className= "bar" /> */}
            <Switch>
                {/*<Route path ="/" exact component={Home} />
                <Route path = "/login" exact component={Login} />
                <Route path = "/make-campaign" exact component={MakeCampaign} />*/}
                {this.showContent(routes)}
            </Switch> 
        </div>
    </Router>
    
    );
    }

    showContent= (routes) => {
        var result = null;
        if(routes.length > 0 ){
            result = routes.map((route, index) => {
                return (
                    <Route key = {index} path = {route.path} exact={route.exact} component={route.main} />
                    );
            })
        }
        return result;
    }
}

export default App;
