import React, {
    Component
} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import routes from './routes';
import {
    connect
} from 'react-redux';
import axios from 'axios';
import callApi from './utils/apiCaller';



class App extends Component {
constructor(props){
    super(props);
    this.state = {
        accounts : [{
            id: 0,
            username: "",
            fullname: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            address: "",
            roleId: 0,
            createdTime: "",
            updatedTime: ""
        }]
    };
}

// componentDidMount(){
//     //gọi sau khi component render lần đầu
// callApi('accounts', 'GET', null).then(res => {
//     this.setState({
//         accounts : this.refs.data
//     })
// })
// }

componentDidMount() {
    axios.get(`http://192.168.0.122:8080/api/accounts`)
        .then(res => {
            const accounts = res.data;
            this.setState({
                accounts
            });
            console.log(this.state.accounts)
        });
}


    render() {
        var {accounts} = this.state;
        // console.log(this.props.accounts);
        return ( <Router >
            <div>

            {
                /*<Menu className= "bar" /> */ } 
                <Switch > {
                this.showContent(routes)
            } </Switch>  </div> </Router>
        );
    }

    showContent = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return ( <
                    Route key = {
                        index
                    }
                    path = {
                        route.path
                    }
                    exact = {
                        route.exact
                    }
                    component = {
                        route.main
                    }
                    />
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
};

export default connect(mapStateToProps, null)(App);