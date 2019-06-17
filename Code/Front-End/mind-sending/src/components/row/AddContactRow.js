import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class AddContactRow extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
     
    
    }

      render(){
          return( 
            <div key={this.props.key} className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                        <input value={this.props.name} type="text" className="inputContact" placeholder="Name"/>                                       
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                      <div className="search">
                          <input value={this.props.email} type="text" className="inputContact" placeholder="Email"/>                                       
                      </div>
                      
                    </div>
                  </div>
          );
      }

      handleCheck=()=> {
        this.setState({checked: !this.state.checked});
      }

      onSelectedRow =()=>{
        this.setState({
            isSelected: !this.state.isSelected
        })
    }
}



export default AddContactRow;



