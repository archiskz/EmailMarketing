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
        console.log(this.props.score)
        return(
            <div style={{"display":"flex"}}>
                <p className={`rating-bar bar1 ${this.props.score < 1 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar2 ${this.props.score < 2 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar3 ${this.props.score < 3 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar4 ${this.props.score < 4 ? 'inactiveBar' : ''}`}></p>
                <p className={`rating-bar bar5 ${this.props.score < 5 ? 'inactiveBar' : ''}`}></p>
                 </div>
                     );
    }

}
export default withRouter(RatingBar);
