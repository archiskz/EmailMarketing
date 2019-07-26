import React, {Component} from 'react';

class ValidateField extends Component {
  constructor(props) {
    super(props);
  }
  render(){
      return (
        <div 
        className={"wrap-input100 validate-input " + (this.props.isError != null ? "active" : "inactive")}
         style={{"textAlign":"center","borderBottom":"none"}}>
        <i style={{"color":"red","textAlign":"center","fontSize":"12px", "fontFamily":"Arial", "fontWeight":"300"}} 
        className=""
         >{this.props.isError}</i> 
        </div>
    );

  }
}

export default ValidateField;
