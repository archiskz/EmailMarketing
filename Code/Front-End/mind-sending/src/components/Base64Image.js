import React, {Component} from 'react';
class Base64Image extends React.Component{
    render() {
       return <img
         src={"data:image/jpeg;base64, " + 
           this.props.imageBase64String} 
       />
    }
  }
  export default Base64Image;