import React, {Component} from 'react';
class Sidebar extends Component {
constructor (props) {
  super(props);
    this.state = {
     condition: true
    };
  }


  render(){
     return (
    <div className="sidebar-menu">
  <header className="logo1">
    <a href="#" className="sidebar-icon"> <span className="fa fa-bars" /> </a> 
  </header>
  <div style={{borderTop: '1px ridge rgba(255, 255, 255, 0.15)'}} />
  <div className="menuside">
    <ul id="menuside">
      <li><a href="index.html"><i className="fa fa-tachometer" /> <span style={{position: 'relative'}}>Dashboard</span><div className="clearfix" /></a></li>
      <li id="menu-academico"><a href="inbox.html"><i className="fa fa-envelope nav_icon" /><span style={{position: 'relative'}}>Inbox</span><div className="clearfix" /></a></li>
      <li><a href="gallery.html"><i className="fa fa-picture-o" aria-hidden="true" /><span style={{position: 'relative'}}>Gallery</span><div className="clearfix" /></a></li>
      <li id="menu-academico"><a href="charts.html"><i className="fa fa-bar-chart" /><span style={{position: 'relative'}}>Charts</span><div className="clearfix" /></a></li>
      <li id="menu-academico"><a href="#"><i className="fa fa-list-ul" aria-hidden="true" /><span style={{position: 'relative'}}> Short Codes</span> <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} /><div className="clearfix" /></a>
        <ul id="menu-academico-sub">
          <li id="menu-academico-avaliacoes"><a href="icons.html">Icons</a></li>
          <li id="menu-academico-avaliacoes"><a href="typography.html">Typography</a></li>
          <li id="menu-academico-avaliacoes"><a href="faq.html">Faq</a></li>
        </ul>
      </li>
      <li id="menu-academico"><a href="errorpage.html"><i className="fa fa-exclamation-triangle" aria-hidden="true" /><span style={{position: 'relative'}}>Error Page</span><div className="clearfix" /></a></li>
      <li id="menu-academico"><a href="#"><i className="fa fa-cogs" aria-hidden="true" /><span style={{position: 'relative'}}> UI Components</span> <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} /><div className="clearfix" /></a>
        <ul id="menu-academico-sub">
          <li id="menu-academico-avaliacoes"><a href="button.html">Buttons</a></li>
          <li id="menu-academico-avaliacoes"><a href="grid.html">Grids</a></li>
        </ul>
      </li>
      <li><a href="tabels.html"><i className="fa fa-table" />  <span style={{position: 'relative'}}>Tables</span><div className="clearfix" /></a></li>
      <li><a href="maps.html"><i className="fa fa-map-marker" aria-hidden="true" />  <span style={{position: 'relative'}}>Maps</span><div className="clearfix" /></a></li>
      <li id="menu-academico"><a href="#"><i className="fa fa-file-text-o" />  <span style={{position: 'relative'}}>Pages</span> <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} /><div className="clearfix" /></a>
        <ul id="menu-academico-sub">
          <li id="menu-academico-boletim"><a href="calendar.html">Calendar</a></li>
          <li id="menu-academico-avaliacoes"><a href="signin.html">Sign In</a></li>
          <li id="menu-academico-avaliacoes"><a href="signup.html">Sign Up</a></li>
        </ul>
      </li>
      <li><a href="#"><i className="fa fa-check-square-o nav_icon" /><span style={{position: 'relative'}}>Forms</span> <span className="fa fa-angle-right" style={{float: 'right', position: 'relative'}} /><div className="clearfix" /></a>
        <ul>
          <li><a href="input.html"> Input</a></li>
          <li><a href="validation.html">Validation</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
    );
    
   }
}



export default Sidebar;
