import React, {Component} from 'react';
class Base64Image extends React.Component{
    render() {
       return <img
         src={require('../assets/img/out.png')}
       />
    }
  }
  export default Base64Image;