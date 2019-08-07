import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class SubDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };
    }




    render() {
        return (
            <div className = "" >
   <div className="flash_notice">
        </div>
        <div className="container" data-role="main-app-container">
          
          <div className="sub_dashboard">
          <div>
           <h1>
                Hello Thắng Nguyễn!
            Here's your recent statistic.
            </h1>
            

            </div>    
          </div>    
                
                <ul className="sub_dashboard_panels stats">
                
                  <li className="sub_dashboard_request sub_dashboard_request" role="requests">
                  <h2>REQUESTS</h2>
                  <div className="sub_dashboard_single">0</div>
                  </li>
                  <li className="sub_dashboard_delivered deliver" role="delivered">
                  <h2>DELIVERED</h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>
                  <li className="sub_dashboard_opened open" role="Opened">
                  <h2>OPENED</h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>
                  
                  <li className="sub_dashboard_clicked clicked" role="clicked">
                  <h2>CLICKED</h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>
                  <li className="sub_dashboard_spam spam" role="spam">
                  <h2>SPAM </h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>s
                  <li className="sub_dashboard_Unsubcribes unsubcribes" role="unsubcribes">
                  <h2>Bounces</h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>
                  </ul>
                  <div role="emailStatsGraph" class="sub_dashboard_graph_container2"> 
                  <div className="dashboard_panel__title">
            <h5 className="dashboard_bold_text2">Campaign name: <span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            Alibaba
            </span>
            </h5>
            <h5 className="dashboard_bold_text2">Date created: <span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            03/08/2019
            </span>
            </h5>
            </div>
                  </div>
        <div className="dashboard_row">
        <div className="col-12 col-md-12 col-lg-5 col-xl-4 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="dashboard_panel__title">
            <h5 className="dashboard_bold-text">List contact by type<span className="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
            <h5 className="dashboard_subhead">Sort by all current contacts of user</h5>
            </div>
            <div className="collapse show">
            <div className="panel_content">
            <div className= "dashboard_table_responsive">
              <table className="dashboard_table">
              <thead>
              <tr>
              <th>Contact type</th>
             
              <th>Number of contact</th>
                </tr>
                  </thead>
              <tbody>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc">Beginner Contacts</p>
              </td>
              
              <td>9</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc2">Intermediate Contacts</p>
              </td>
             
              <td>7</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc3">Advanced Contacts</p>
              </td>
              
              <td>1</td>
              </tr>
              </tbody>    
              </table>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        
       <div className="col-12 col-md-12 col-lg-7 col-xl-8 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="dashboard_panel__title">
            <h5 className="dashboard_bold-text">LIST OF GROUPS HAVE BEEN RECENTLY CREATED<span class="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
            <h5 className="dashboard_subhead">Sort by all current groups of user</h5>
          </div>
          <div className="collapse show">
            <div className="panel_content">
            <div className= "dashboard_table_responsive">
              <table className="dashboard_table">
              <thead>
              <tr>
              <th>Group name</th>
              <th>Date created</th>
              <th>Number of contact in group</th>
                </tr>
                  </thead>
              <tbody>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc4">Beginner Contacts</p>
              </td>
              
              <td>02/08/2019</td>
              <td>20</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc5">Intermediate Contacts</p>
              </td>
             
              <td>02/08/2019</td>
              <td>10</td>
              </tr>
              <tr>
              <td>
              <p className="dashboard_bold_text dashboard__btc6">Advanced Contacts</p>
              </td>
              
              <td>02/08/2019</td>
              <td>25</td>
              </tr>
              </tbody>    
              </table>
            </div>
            </div>
            </div>
          </div>
          </div>
        </div>
        <div className="col-lg-12 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <div className="dashboard_card_body dashboard_panel__body">
          <div className="dashboard_panel__title">
            <h5 className="dashboard_bold-text2">List of contacts have been recently added<span class="dashboard_panel__label dashboard_badge dashboard_badge_secondary">
            </span>
            </h5>
              <div className="collapse show">
            <div className="panel_content">
            <div className= "dashboard_table_responsive">
              <table className="dashboard_table2">
              <thead>
              <tr>
              <th>#</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
                </tr>
                  </thead>
              <tbody>
              <tr>
              <td>
              1
              </td>
              <td>thangnguyen15297@gmail.com</td>
               <td>Thắng</td>
                <td>Nguyễn</td>
              </tr>
              <tr>
              <td>
              2
              </td>           
              <td>sonnguyen050797@gmail.com</td>
               <td>Sơn</td>
                <td>Nguyễn</td>
              </tr>
              <tr>
              <td>
              3
              </td>
              <td>tanminh111197@gmail.com</td>
               <td>Tấn</td>
                <td>Minh</td>
              </tr>
              <tr>
              <td>
              4
              </td>
              <td>archist@gmail.com</td>
               <td>Archist</td>
                <td>Nguyễn</td>
              </tr>
              <tr>
              <td>
              5
              </td>
              <td>Angelababy@gmail.com</td>
               <td>Angela</td>
                <td>Baby</td>
              </tr>
              </tbody>    
              </table>
            </div>
            </div>
            </div>
          </div>
          
          </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-5 col-xl-4 dashboar_top5">
        <div className="dashboard_panel dashboard_card">
        <h2 className="dashboard_admin">Admin User Details</h2>
  <hr/>
  <dl className="dashboard_admin">
    <dt>Username</dt>
    <dd>Thắng Nguyễn</dd>
    <dt>Email Address</dt>
    <dd>thangnguyen15297@gmail.com</dd>
    <dt>Account IP Address</dt>
    <dd role="ips">
    
    </dd>
  </dl>
</div>
</div>





<div className="col-12 col-md-12 col-lg-7 col-xl-8 dashboar_top5">
<div className="dashboard_panel dashboard_card">
  <h2 className="dashboard_admin">Groups</h2>
  <hr/>
    <div role="noGroups">
      <p className="dashboard_admin">Use groups to give your recipients control over the types of emails they want to receive.
      </p>
      <p className="dashboard_admin">
        Allowing recipients to select from groups of emails they want to receive and opt out from others helps to increase recipient engagement, decrease spam reports, and improve sender reputation.
      </p>
      <p className="dashboard_admin"> 
        <Link class="sd_graph_admin_btn sd_graph_admin_btn_small primary "to="/dashboard/lists">Create Your Groups</Link>
      </p>
    </div>
</div>
</div>
        </div>         
       
       </div>
       
       </div>
       

           

           
            

        );
    }

}
export default SubDashboard;