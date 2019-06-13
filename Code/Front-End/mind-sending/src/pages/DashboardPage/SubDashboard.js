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
            Here's your recent email activity.
            </h1>
            <div className="sub_dashboard_btn_group sub_dashboard_time-range">
            <div className="sub_dashboard_btn sub_dashboard_btn_group_item sub_dashboard_is_active" role="week">
              Wk
            </div>
            <div className="sub_dashboard_btn sub_dashboard_btn_group_item" role="month">
              Mo
              </div>
          </div>

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
                  </li>
                  <li className="sub_dashboard_Unsubcribes unsubcribes" role="unsubcribes">
                  <h2>unsubcribes</h2>
                  <div className="primary">N/A</div>
                  <div className="secondary">0</div>
                  </li>
                  </ul>
                 
        <div role="emailStatsGraph" className="sub_dashboard_graph_container">
        <div className="sub_dashboard_graph">
        <div role="graph">
        <svg viewBox="0 0 1085 390" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(50, 10)">
        <g transform="translate(1015, 0)" className="y-axis">
        <path className="domain" d="M-1015,0H0V340H-1015">
        </path>
        </g>
        <g transform="translate(0, 340)" className="x-axis">
        <g className="tick" transform="translate(0,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Mon</text>
        </g>
        <g className="tick" transform="translate(169.16666666666666,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Tue</text>
        </g>
        <g className="tick" transform="translate(338.3333333333333,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Wed</text>
        </g>
        <g className="tick" transform="translate(507.5,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Thu</text>
        </g>
        <g className="tick" transform="translate(676.6666666666666,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Fri</text>
        </g>
        <g className="tick" transform="translate(845.8333333333334,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Sat</text>
        </g>
        <g className="tick" transform="translate(1015,0)" styles="opacity: 1;">
        <line y2="5" x2="0">
        </line>
        <text dy=".71em" y="8" x="0" styles="text-anchor: middle;">Sun</text>
        </g>
        <path className="domain" d="M0,5V0H1015V5">
        </path>
        </g>
        <g transform="translate(0,350)" className="x-axis-2">
        <path className="domain" d="M0,6V0H1015V6">
        </path>
        </g>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_blocks">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_bounce_drops">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_bounces">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_clicks">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340"
         className="sd_graph_delivered">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_invalid_emails">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_opens">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_requests">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_spam_report_drops">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_spam_reports">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_unique_clicks">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_unique_opens">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_unsubscribe_drops">
        </path>
        <path d="M0,340L169.16666666666666,340L338.3333333333333,340L507.5,340L676.6666666666666,340L845.8333333333334,340L1015,340" 
        className="sd_graph_unsubscribes">
        </path>
        <rect className="sd_graph_overlay" width="1015" height="340">
        </rect>
        </g>
        </svg>
        </div>
<div role="focus" className="sub_dashboard_graph_focus" styles="opacity: 0; height: 379px; overflow: hidden; left: 392.333px; border-right-color: rgb(238, 238, 238); border-left-color: rgb(47, 47, 47);"> 
<h3>06-14-2019</h3>

<dl>
    <dt>Requests</dt>
    <dd class="sd_graph_requests">0</dd>
    <dt>Delivered</dt>
    <dd class="sd_graph_delivered">0</dd>
    <dt>Opened</dt>
    <dd class="sd_graph_opens">0</dd>
    <dt>Clicks</dt>
    <dd class="sd_graph_clicks">0</dd>
    <dt>Unsubscribes</dt>
    <dd class="sd_graph_unsubscribes">0</dd>
    <dt>Spam Reports</dt>
    <dd class="sd_graph_spam_reports">0</dd>
</dl>
</div>
<div role="rangeLabel" class="sd_graph_rangeLabel">
    </div>
  </div>
</div>



        <div role="infoPanels">
        <ul class="sd_graph_big_panels">

        <li role="left">      
        <div class="sd_graph_panel sd_graph_admin">
        <h2>Admin User Details</h2>
  <hr/>
  <dl>
    <dt>Username</dt>
    <dd>Thắng Nguyễn</dd>
    <dt>Email Address</dt>
    <dd>thangnguyen15297@gmail.com</dd>
    <dt>Account IP Address</dt>
    <dd role="ips">
    
    </dd>
  </dl>
</div>
</li>


<li role="center">

<div class="sd_graph_panel sd_graph_asm">
  <h2>Unsubscribe Groups</h2>
  <hr/>
    <div role="noGroups">
      <p>Use unsubcribe groups to give your recipients control over the types of emails they want to receive.
      </p>
      <p>
        Allowing recipients to select from groups of emails they want to receive and opt out from others helps to increase recipient engagement, decrease spam reports, and improve sender reputation.
      </p>
      <p>
        <Link class="sd_graph_admin_btn sd_graph_admin_btn_small primary "to="/dashboard/create-list">Create Your Groups</Link>
      </p>
    </div>
</div>
</li>


<li role="right">
<div class="sd_graph_panel sd_graph_help">
  <h2>Help Links</h2>
  <hr/>
  <table>
    <tbody>
    <tr>
      <td class="sd_graph_help_setup_guide">
        <a class="sd_graph_panel_link" target="_blank" href="#guide">
          <img src="/images/setup.png"/>
          <span>Setup Guide</span>
        </a>
      </td>
      <td class="sd_graph_help_support">
        <a class="panel-link" target="_blank" href="http://support.sendgrid.com/hc/en-us">
          <img src="/images/help.png"/>
          
          <span>Support</span>
        </a>
      </td>
    </tr>
  </tbody>
  </table>
</div>
</li>
</ul>

        
       </div>
       </div>
       </div>
       

           

           
            

        );
    }

}
export default SubDashboard;