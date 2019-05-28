import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import demo from './demo';
import { connect } from 'react-redux';


class App extends Component {
    render(){
        console.log(this.props.accounts);
  return (
    <Router>
        <div>

            {/*<Menu className= "bar" /> */}
            <Switch>
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

const mapStateToProps = (state) => {
return {
    accounts: state.accounts
}
} ;

export default connect(mapStateToProps, null)(App);
