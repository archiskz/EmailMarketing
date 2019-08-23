import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";


class RatingBar extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
        }     
      
        };

        componentDidMount(){

        }
 
        
    render(){
        
        var point = parseInt(this.props.type, 10)
        console.log(this.props.type)
        return(
            <div style={{"display":"flex"}}>
                <p className={`rating-bar bar1 ${point < 1 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar2 ${point < 2 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar3 ${point < 3 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar4 ${point < 4 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar5 ${point < 5 ? 'inactiveBar' : ''}`}></p>
                 </div>
                     );
    }

}
export default withRouter(RatingBar);
