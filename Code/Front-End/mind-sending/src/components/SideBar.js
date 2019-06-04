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
    <div className="wrapper">
    
    <nav  className= { this.state.condition ? "sidebar active" : "sidebar" }>
        <div className="sidebar-header">
            <h3>Menu</h3>
        </div>

        <ul className="list-unstyled components">
            <p>Heading</p>
            <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
    <div id="content">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button type="button" id="sidebarCollapse" onClick={this.openSideBar} className="menubutton">
                            
                <span className="focus-input100" data-placeholder="&#xf197;"></span>
                        </button>
            

        </div>
    </nav>
</div>

</div>
  );
  }

   openSideBar = () =>{
   
   this.setState({
      condition: !this.state.condition
    });
    
   }
}



export default Sidebar;
