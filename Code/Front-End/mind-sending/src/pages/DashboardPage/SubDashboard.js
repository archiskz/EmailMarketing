import React, { Component } from 'react';

class SubDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };
    }




    render() {
        return (
            <div>    
  <div className="header-main-dashboard fixed">
    <div className="logo-w3-agile">
    <h1><a href="home.js">HOME</a></h1>
      </div>
  <div className="w3layouts-left">
    
    <div className="w3-search-box">
      <form action="#" method="post">
        <input type="text" placeholder="Search your campaign here" required />  
        <input type="submit" defaultValue />                    
      </form>
    </div>
    <div className="clearfix"> </div>
  </div>
  <div className="w3layouts-right">
    <div className="profile_details_left">
      <ul className="nofitications-dropdown">
        <li className="dropdown head-dpdn">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-envelope" /><span className="badge">3</span></a>
          <ul className="dropdown-menu">
            <li>
              <div className="notification_header">
                <h3>You have 3 new messages</h3>
              </div>
            </li>
            <li><a href="#">
                <div className="user_img"><img src="images/son.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Thắng đẹp trai quá</p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li><a href="#">
                <div className="user_img"><img src="images/son.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Lorem ipsum dolor </p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li><a href="#">
                <div className="user_img"><img src="images/in9.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Lorem ipsum dolor</p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li>
              <div className="notification_bottom">
                <a href="#">See all messages</a>
              </div> 
            </li>
          </ul>
        </li>
        <li className="dropdown head-dpdn">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-bell" /><span className="badge blue">3</span></a>
          <ul className="dropdown-menu">
            <li>
              <div className="notification_header">
                <h3>You have 3 new notification</h3>
              </div>
            </li>
            <li><a href="#">
                <div className="user_img"><img src="images/son.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Thắng đẹp trai quá</p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li><a href="#">
                <div className="user_img"><img src="images/son.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Lorem ipsum dolor</p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li><a href="#">
                <div className="user_img"><img src="images/in7.jpg" alt /></div>
                <div className="notification_desc">
                  <p>Lorem ipsum dolor</p>
                  <p><span>1 hour ago</span></p>
                </div>
                <div className="clearfix" />    
              </a></li>
            <li>
              <div className="notification_bottom">
                <a href="#">See all notifications</a>
              </div> 
            </li>
          </ul>
        </li>   
        <li className="dropdown head-dpdn">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-tasks" /><span className="badge blue111">9</span></a>
          <ul className="dropdown-menu">
            <li>
              <div className="notification_header">
                <h3>Campaign summarize</h3>
              </div>
            </li>
            <li><a href="#">
                <div className="task-info">
                  <span className="task-desc">Draft campaign</span><span className="percentage">80%</span>
                  <div className="clearfix" />  
                </div>
                <div className="progress progress-striped active">
                  <div className="bar yellow" style={{width: '40%'}} />
                </div>
              </a></li>
            <li><a href="#">
                <div className="task-info">
                  <span className="task-desc">On-going campaign</span><span className="percentage">30%</span>
                  <div className="clearfix" />  
                </div>
                <div className="progress progress-striped active">
                  <div className="bar green" style={{width: '90%'}} />
                </div>
              </a></li>
            <li><a href="#">
                <div className="task-info">
                  <span className="task-desc">Completed campaign</span><span className="percentage">33%</span>
                  <div className="clearfix" />  
                </div>
                <div className="progress progress-striped active">
                  <div className="bar blue" style={{width: '33%'}} />
                </div>
              </a></li>
            <li>
              <div className="notification_bottom">
                <a href="#">See all campaigns</a>
              </div> 
            </li>
          </ul>
        </li>   
        <div className="clearfix"> </div>
      </ul>
      <div className="clearfix"> </div>
    </div>
    {/*notification menu end */}
    <div className="clearfix"> </div>               
  </div>
  <div className="profile_details w3l">     
    <ul>
      <li className="dropdown profile_details_drop">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <div className="profile_img"> 
            <span className="prfil-img"><img src="images/son.jpg" alt /> </span> 
            <div className="user-name">
              <p>Thắng Nguyễn</p>
              <span>Administrator</span>
            </div>
            <i className="fa fa-angle-down" />
            <i className="fa fa-angle-up" />
            <div className="clearfix" />    
          </div>    
        </a>
        <ul className="dropdown-menu drp-mnu">
          <li> <a href="#"><i className="fa fa-cog" /> Settings</a> </li> 
          <li> <a href="#"><i className="fa fa-user" /> Profile</a> </li> 
          <li> <a href="#"><i className="fa fa-sign-out" /> Logout</a> </li>
        </ul>
      </li>
    </ul>
  </div>
  <div className="clearfix"> </div> 
</div>
</div>
        );
    }

}
export default SubDashboard;